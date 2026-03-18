"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white p-4 border-b">
      <h1 className="font-semibold text-black">Welcome <span className="text-gray-400">{user?.email}</span></h1>
      

      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}