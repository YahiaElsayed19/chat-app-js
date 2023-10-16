import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"

const Home = () => {

    return (
        <section className="h-screen py-[50px] flex justify-center items-center bg-[#f6f6f6] shadow">
            <div className="container h-[80%] flex max-w-6xl px-5 mx-auto">
                <Sidebar />
                <Chat />
            </div>
        </section>
    )
}

export default Home