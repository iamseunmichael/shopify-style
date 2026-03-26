import Link from "next/link"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-950 text-white flex flex-col shadow-xl">
                
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-zinc-800">
                    <h2 className="text-lg font-bold tracking-tight"> Enterprise Admin </h2>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
                    >
                        Products
                    </Link>
                    <Link
                        href="/market"
                        className="block px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
                    >
                        Go to market
                    </Link>
                    
                </nav>
            </aside>

            {/* Main Area */}
            <div className="ml-64 flex flex-col min-h-screen">

                {/* Top Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-20">
                    <h1 className="text-lg font-semibold text-gray-800"> Admin Panel </h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                {children}
                </main>

            </div>

            </div>
    )
}