import { useState, useContext } from "react";
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";
import { ChatContext } from "../store/ChatContext";
const Search = () => {
    const { dispatch } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [user, setUser] = useState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState(false);
    const usersRef = collection(db, "users");
    const handleSearch = async (e) => {
        e.preventDefault();
        const q = query(usersRef, where("displayName", "==", username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setUser(doc.data());
            });
            setError(false);
        } catch (error) {
            setError(true);
        }
    };
    const hadnleSelect = async () => {
        const combinedId = (currentUser.uid > user.uid) ? (currentUser.uid + user.uid) : (user.uid + currentUser.uid)
        const res = await getDoc(doc(db, "chats", combinedId))
        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), { messages: [] })
            await updateDoc(doc(db, "usersChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp()
            })
            await updateDoc(doc(db, "usersChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp()
            })
        }
        dispatch({
            type: "CHANGE_USER", payload: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }
        })
    };
    return (
        <div>
            <form
                className="bg-transparent border-b border-gray-400"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    placeholder="find user"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="w-full text-white focus:outline-none bg-transparent p-2"
                />
            </form>
            {user && (
                <div
                    className="flex gap-2 items-center p-3 hover:bg-slate-900 cursor-pointer border-b"
                    onClick={hadnleSelect}
                >
                    <img src={user.photoURL} alt="pic" className="w-7 h-7 rounded-full" />
                    <p className="font-bold text-white">{user.displayName}</p>
                </div>
            )}
        </div>
    );
};

export default Search;
