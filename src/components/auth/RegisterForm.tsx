"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterForm(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    setSuccess("") //Clear success state

    //check if password is less than 6 character
    if(password.length < 6){
      setError("Password must be at least 6 characters")
      return
    }
    setLoading(true)

    const res = await fetch("/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials: "include",
      body:JSON.stringify({email,password})
    })

    const data = await res.json()

    if(!res.ok){
      setError(data.error || "Something went wrong")
      setLoading(false)
      return
    }
    setSuccess("Account created successfully! Redirecting...")

    setLoading(false)
    router.push("/dashboard")
  }

  return(
    <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
           {success && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 mb-4 animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center">
                    <svg className="h-5 w-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-emerald-700 font-medium">{success}</p>
                    </div>
                </div>
           )}
            <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Create Account</h1>
                <p className="text-sm text-gray-500 mt-2">Join us today and get started</p>
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                        type="role"
                        placeholder="CUSTOMER"
                        className="w-full black px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200 outline-none placeholder-gray"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
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
                    Creating...
                </span>
                ) : "Register"}
            </button>

            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-black hover:underline">
                Login
                </Link>
            </p>
            </form>
        </div>
    </div>

  )
}