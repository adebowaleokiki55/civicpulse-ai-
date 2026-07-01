import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [form, setForm] = useState({

        full_name: "",

        email: "",

        password: "",

        confirmPassword: ""

    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);

            await register({

                full_name: form.full_name,

                email: form.email,

                password: form.password

            });

            navigate("/");

        }

        catch (err) {

            console.error(err);

            setError(

                err?.response?.data?.detail ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-cyan-600 to-slate-900 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-slate-800">

                        CivicPulse

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Create your citizen account

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="full_name"

                            value={form.full_name}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

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

                                name="password"

                                value={form.password}

                                onChange={handleChange}

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

                    <div>

                        <label className="block mb-2 font-medium">

                            Confirm Password

                        </label>

                        <input

                            type={showPassword ? "text" : "password"}

                            name="confirmPassword"

                            value={form.confirmPassword}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    {

                        error &&

                        <div className="bg-red-100 text-red-700 rounded-xl p-3">

                            {error}

                        </div>

                    }

                    <button

                        disabled={loading}

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition"

                    >

                        {

                            loading ?

                            "Creating Account..." :

                            "Create Account"

                        }

                    </button>

                </form>

                <p className="text-center mt-8 text-slate-500">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-600 font-semibold ml-2"

                    >

                        Sign In

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;