"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import Link from "next/link"

export default function LoginForm() {
    const router = useRouter()
    const {login} = useAuth()

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault()

        if(!email || !password) {
            setError("Email and Password required")
            return
        }
        setLoading(true)

        try{
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body:JSON.stringify({email,password})
            })
            const data = await res.json()

            if(!res.ok) {
                setError(data.error)
                setLoading(false)
                return;
            }
            await login();
            router.push("/dashboard")
        } catch(err) {
            setError("Login failed")
        }
        setLoading(false)
    }

    return(
        <div className="min-h-screen flex items-center justify-center p-4 ">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">Log In</h1>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        className="w-full black px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 outline-none placeholder-gray"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 outline-none placeholder-gray"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                </div>

                <button
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        {/* Simple Spinner Icon */}
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        login...
                    </span>
                    ) : "Login"}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account? {' '}
                    <Link href="/register" className="font-semibold text-black hover:underline"> Register </Link>
                </p>
                </form>
            </div>
        </div> 
    )
}