import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../store/AuthContext";
const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="flex justify-between items-center bg-slate-900 text-white px-2 py-4">
            <div className="flex gap-2 items-center">
                <img
                    src={currentUser.photoURL}
                    alt="pic"
                    className="w-7 h-7 rounded-full"
                />
                <p className="font-bold">{currentUser.displayName}</p>
            </div>
            <button
                type="button"
                onClick={() => signOut(auth)}
                className="bg-slate-800 rounded-xl py-1 px-3 text-center"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
