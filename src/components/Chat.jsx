import { useContext } from 'react'
import { ChatContext } from "../store/ChatContext"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="w-2/3 bg-slate-200 rounded-r-xl overflow-hidden">
            <h1 className="bg-slate-800 text-white px-2 h-[64px] font-bold flex items-center">{data.user.displayName}</h1>
            {data.user.uid ? (
                <>
                    <Messages />
                    <MessageInput />
                </>
            ) : (
                <p className='flex justify-center items-center h-2/3 text-center text-gray-500  '>Select chat to start</p>
            )
            }
        </div>
    )
}

export default Chat