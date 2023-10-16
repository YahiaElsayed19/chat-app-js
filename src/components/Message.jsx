import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { ChatContext } from "../store/ChatContext";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const timestamp = message.date.seconds * 1000
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Intl.DateTimeFormat('en-US', options).format(timestamp);

  const ref = useRef()
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }, [message])
  return (
    <div ref={ref} className={currentUser.uid == message.senderId ? "group owner" : ""}>
      <div className="flex gap-5 px-2 my-2 group-[.owner]:flex-row-reverse">
        <div className="flex flex-col gap-2 ">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="pic"
            className="w-9 h-9 rounded-full"
          />
          <p className="text-xs font-thin max-w-[50px]">{date}</p>
        </div>
        <div className="max-w-[250px]">
          {message.text && <p className=" bg-white p-2 mb-2 rounded-lg break-words group-[.owner]:bg-slate-600 group-[.owner]:text-white ">
            {message.text}
          </p>}
          {message.img && <img src={message.img} alt="pic" className="w-full h-[200px]" />}
        </div>
      </div>
    </div>

  );
};

export default Message;
