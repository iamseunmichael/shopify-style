"use client"

import { useAuth } from "@/lib/contexts/AuthContext";

export default function ProfilePage(){
    const {user, logout} = useAuth()

    if(!user){
        return <p>Not logged in</p>
    }

    return(
        <div className="p-10 space-y-6">

            <h1 className="text-3xl font-bold"> Profile </h1>

            <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    )
}