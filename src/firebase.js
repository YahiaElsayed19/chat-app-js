import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA_1hyLQ--_gIsVkv7qYVvjOW3cI6FWvDY",
    authDomain: "real-time-chat-8d3a5.firebaseapp.com",
    databaseURL: "https://real-time-chat-8d3a5-default-rtdb.firebaseio.com",
    projectId: "real-time-chat-8d3a5",
    storageBucket: "real-time-chat-8d3a5.appspot.com",
    messagingSenderId: "516663754869",
    appId: "1:516663754869:web:1b860e71f676835f57783c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app);