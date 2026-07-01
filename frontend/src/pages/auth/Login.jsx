import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login, user } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await login(email, password);

            if (user?.role === "government") {

                navigate("/dashboard");

            } else {

                navigate("/");

            }

        }

        catch (err) {

            console.error(err);

            setError(

                err?.response?.data?.detail ||

                "Invalid email or password."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-800 to-cyan-600 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-slate-800">

                        Welcome Back

                    </h1>

                    <p className="text-slate-500 mt-3">

                        Sign in to CivicPulse

                    </p>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="mt-8 space-y-5"

                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            required

                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <div className="relative">

                            <input

                                type={showPassword ? "text" : "password"}

                                value={password}

                                onChange={(e) =>

                                    setPassword(e.target.value)

                                }

                                required

                                className="w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    setShowPassword(

                                        !showPassword

                                    )

                                }

                                className="absolute right-4 top-3"

                            >

                                {

                                    showPassword ?

                                    <EyeOff size={20}/> :

                                    <Eye size={20}/>

                                }

                            </button>

                        </div>

                    </div>

                    {

                        error &&

                        <div className="bg-red-100 text-red-700 rounded-xl p-3">

                            {error}

                        </div>

                    }

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold"

                    >

                        {

                            loading ?

                            "Signing In..." :

                            "Sign In"

                        }

                    </button>

                </form>

                <p className="text-center mt-8 text-slate-500">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-blue-600 font-semibold ml-2"

                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;