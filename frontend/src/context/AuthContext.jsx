import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    async function checkAuth() {

        try {

            const res = await api.get("/auth/me");

            setUser(res.data);

        }

        catch {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        checkAuth();

    }, []);

    async function login(email, password) {

        await api.post("/auth/login", {

            email,

            password

        });

        await checkAuth();

    }

    async function register(data) {

        await api.post("/auth/register", data);

        await login(data.email, data.password);

    }

    function logout() {

        setUser(null);

        window.location.href = "/login";

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                checkAuth

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}