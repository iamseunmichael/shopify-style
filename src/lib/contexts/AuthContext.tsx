"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    userId: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children
}: {children: React.ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        const res = await fetch("/api/auth/me", {credentials: "include"});
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function login() {
        await fetchUser();
    }

    async function logout() {
        await fetch("/api/auth/logout", {method: "POST"});
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {throw new Error("AuthContext is missing")}
    return context;
} 

    