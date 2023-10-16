import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const user = userCredential.user;
                setError(false)
                navigate('/')
            })
            .catch((error) => {
                setError(true)
                console.log(error);
            });
    }
    return (
        <section className="py-[50px] bg-[#f6f6f6]">
            <div className="container max-w-5xl h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4 mx-auto">
                <form onSubmit={submitHandler} className="flex flex-col w-72 sm:w-96 py-5 px-4 sm:px-10 bg-white rounded-xl">
                    <h1 className="text-3xl text-center font-bold text-primary my-2">
                        Chat App
                    </h1>
                    <p className="text-center text-gray-600">Login</p>
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
                    <button
                        type="submit"
                        className="bg-primary text-white py-3 px-4 rounded-full hover:bg-secondry duration-300"
                    >
                        Login
                    </button>
                    {error && (
                        <p className="text-center my-2 text-red-600">
                            something went wrong
                        </p>
                    )}
                    <p className="text-center my-2">
                        You do not have an account?
                        <Link to="/register" className="text-primary ">
                            register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
