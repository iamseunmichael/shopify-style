"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  role
}: {
  children: React.ReactNode
  role?:string
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return //wait for auth check
    
    if(!user) {
      router.replace("/login"); //replace prevents history flicker
      return;
    }

    if(role && user?.role !== role) {
      router.replace("/dashboard");
    }
    
  }, [user, loading, role, router]);

  if (loading || !user) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          {/* Animated Spinner */}
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
            <div className="absolute h-8 w-8 animate-pulse rounded-full bg-indigo-100"></div>
          </div>

          {/* Text Content */}
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Securing your session</h2>
            <p className="mt-1 text-sm text-gray-500 animate-pulse">Verifying credentials...</p>
          </div>
        </div>
      );
  }
  return <>{children}</>;
}