import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
    currentUser: { photoURL: " ", displayName: "", uid: "" },
});

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ photoURL: " ", displayName: "", uid: "" });
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsub();
        };
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
