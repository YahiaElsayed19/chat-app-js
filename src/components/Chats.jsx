import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";
import { ChatContext } from "../store/ChatContext";

const Chats = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "usersChats", currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );
            return () => {
                unsub();
            };
        };
        if (currentUser.uid) getChats();
    }, [currentUser.uid]);
    const handleSelect = (userInfo) => {
        dispatch({ type: "CHANGE_USER", payload: userInfo });
    };
    return (
        <div className="overflow-y-scroll h-full max-h-[370px] hide-scrollbar ">
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                        className="flex gap-2 items-center p-3 hover:bg-slate-900 cursor-pointer"
                    >
                        <img
                            src={chat[1].userInfo.photoURL}
                            alt="pic"
                            className="w-9 h-9 rounded-full"
                        />
                        <div className="w-[80%]">
                            <p className="font-bold text-white">
                                {chat[1].userInfo.displayName}
                            </p>
                            <p className="text-gray-300 text-sm truncate">
                                {chat[1].lastMessage?.text}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Chats;
