import { useContext, useState, useEffect } from 'react'
import { ChatContext } from "../store/ChatContext"
import Message from "./Message"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuidv4, } from "uuid";
const Messages = () => {
    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => {
            unSub()
        }
    }, [data.chatId])

    return (
        <div className="h-[calc(100%-112px)] overflow-y-scroll hide-scrollbar">
            {messages.length > 0 && messages.map((message) => <Message key={uuidv4()} message={message} />)}
        </div>
    )
}

export default Messages