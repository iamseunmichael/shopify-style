"use client";

import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Helper to keep the JSX clean
  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive 
        ? "bg-zinc-900 text-white" // Active styles
        : "text-zinc-400 hover:bg-zinc-900 hover:text-white" // Inactive styles
    }`;
  };

  return (

    <aside className="w-64 bg-zinc-950 text-white min-h-screen flex flex-col shadow-2xl">
      {/* Branding */}
      <div className="w-64 h-16 flex items-center gap-3 mb-10 px-2 bg-gray-700">
        {user?.role === "ADMIN" && (
          <h2 className="text-xl font-bold tracking-tight">Admin</h2>
        )}
        <h2 className="text-xl font-bold tracking-tight">Platform</h2>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 m-6 mt-1">
        <Link href="/dashboard" className={getLinkClassName("/dashboard")}>Dashboard</Link>
        <Link href="/dashboard/cart" className={getLinkClassName("/dashboard/cart")}>My Carts</Link>
        <Link href="/dashboard/order" className={getLinkClassName("/dashboard/order")}>My Orders</Link>

        {user?.role === "ADMIN" && (
          <>
            <Link href="/dashboard/products" className={getLinkClassName("/dashboard/products")}>Products</Link> 
            <Link href="/dashboard/analytics" className={getLinkClassName("/dashboard/analytics")}>Analytics</Link>
            <Link href="/dashboard/settings" className={getLinkClassName("/dashboard/settings")}>Admin Settings</Link>
          </>
        )}
        <Link href="/market" className={getLinkClassName("/market")}>Go to market</Link>
      </nav>
    </aside> 
  );
}