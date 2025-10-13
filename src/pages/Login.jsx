import { useState } from "react";
import { BsClipboard2Check } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signIn } from "../features/authSlice";

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(input))
    }

    return (
        <div className="bg-login">
            <div className="w-full max-w-lg relative z-10  rounded-lg shadow-lg p-8">

                {/* App Branding */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold flex items-center justify-center text-primary"><BsClipboard2Check />  <span>To-Do Login</span></h1>
                    <p className="text-gray-500 mt-1">Stay productive. Log in to manage your tasks.</p>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-950 transition duration-200"
                    >
                        Log In
                    </button>
                </form>

                {/* Sign up prompt */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
