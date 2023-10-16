import Chats from "./Chats"
import Navbar from "./Navbar"
import Search from "./Search"

const Sidebar = () => {
    return (
        <div className="w-1/3 bg-slate-800 rounded-l-xl overflow-hidden">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar