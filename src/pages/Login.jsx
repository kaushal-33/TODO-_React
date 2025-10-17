import { useState } from "react";
import { BsClipboard2Check } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signIn, signUp, signWithGoogle } from "../features/authSlice";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isSignup, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.email.trim() === "" || input.password.trim() === "") {
            toast.error("Enter Email or Password...!", { position: "top-left" });
            return;
        }

        if (isSignup) {
            if (input.password.trim() !== input.confirmPassword.trim()) {
                toast.error("Confirm Password doesn't matches...!", { position: "top-left" });
                return;
            }
            dispatch(signUp(input))
            setIsSignUp(false)
        } else {
            dispatch(signIn(input))
        }
    }

    return (
        <div className="bg-login overflow-hidden">
            <div className={`w-full max-w-lg ${!isSignup && "bg-form"} relative p-8`}>
                {/* App Branding */}
                <div className="text-center mb-6 relative z-10">
                    <h1 className="text-3xl font-bold flex items-center justify-center text-primary"><BsClipboard2Check />  <span>To-Do {isSignup ? "SignUp" : "LogIn"}</span></h1>
                    <p className="text-gray-500 mt-1">Stay productive. Log in to manage your tasks.</p>
                </div>

                {/* Login Form */}
                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                        />
                    </div>
                    {/* confirm password */}
                    {isSignup && <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            placeholder="••••••••"
                            value={input.confirmPassword}
                            onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                        />
                    </div>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-950 transition-all duration-200"
                    >
                        {isSignup ? "SignIn" : "LogIn"}
                    </button>

                    {!isSignup && <button
                        type="button"
                        onClick={() => dispatch(signWithGoogle())}
                        className="mx-auto flex items-center justify-center border border-primary font-bold gap-2 text-primary py-2 px-4 rounded-md hover:border-blue-950 transition-all duration-200">
                        Sign in with <FcGoogle className="text-2xl" />
                    </button>}
                    {/* Sign up prompt */}
                    <p className="flex justify-center gap-2 text-sm text-gray-600">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}
                        <span onClick={() => setIsSignUp(!isSignup)} className="text-blue-500 hover:underline cursor-pointer">{isSignup ? "SignIn" : "SignUp"}</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
