import { useState } from "react";
import { auth, storage, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import img from "../assets/img.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const image = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(res);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "usersChats", res.user.uid), {});
                        navigate("/")
                    });
                }
            );
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };
    return (
        <section className="py-[50px] bg-[#f6f6f6]">
            <div className="container max-w-5xl h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4 mx-auto">
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col w-72 sm:w-96 py-5 px-4 sm:px-10 bg-white rounded-xl"
                >
                    <h1 className="text-3xl text-center font-bold text-primary my-2">
                        Chat App
                    </h1>
                    <p className="text-center text-gray-600">Register</p>
                    <input
                        type="text"
                        id="name"
                        placeholder="enter your name"
                        className="form-input"
                    />
                    <input
                        type="text"
                        id="email"
                        placeholder="enter your email"
                        className="form-input"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="enter your password"
                        className="form-input"
                    />
                    <div>
                        <input type="file" id="file" className="hidden" />
                        <label htmlFor="file" className="flex gap-2 my-2 cursor-pointer">
                            <img src={img} alt="img" className="w-7 h-7 " />
                            <p className="text-gray-400">add an avatar</p>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white py-3 px-4 rounded-full hover:bg-secondry duration-300"
                    >
                        Register
                    </button>
                    {error && (
                        <p className="text-center my-2 text-red-600">
                            something went wrong
                        </p>
                    )}
                    <p className="text-center my-2">
                        You do have an account?
                        <Link to="/login" className="text-primary ">
                            login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;
