import { useState, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../store/AuthContext";
import { ChatContext } from "../store/ChatContext";
import img from "../assets/img.png";
import { db, storage } from "../firebase";
import { v4 as uuidv4, } from "uuid";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async (e) => {
    e.preventDefault()
    const msgText = text
    setText("")
    if (image) {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text: msgText,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text: msgText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setImage(null)
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: msgText,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    await updateDoc(doc(db, "usersChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: msgText,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
  };
  return (
    <form className="flex bg-white">
      <input
        type="text"
        placeholder="write a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-2 py-3 focus:outline-none"
      />
      <div className="flex gap-2 items-center">
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
          onClick={(e) => e.target.value = null}
        />
        <label htmlFor="file">
          <img src={img} alt="image" className="cursor-pointer" />
        </label>
        <button
          type="submit"
          onClick={handleSend}
          className="bg-slate-800 text-white w-20 h-full"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
