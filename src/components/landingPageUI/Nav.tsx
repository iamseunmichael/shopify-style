import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5 text-white bg-transparent backdrop-blur-sm">
      <div className="flex items-center space-x-10">
        <div className="text-3xl font-bold tracking-tighter">shopify</div>
        <div className="hidden lg:flex space-x-6 text-sm font-medium">
          <Link href="#" className="flex items-center hover:opacity-70">Solutions <ChevronDown size={14} className="ml-1" /></Link>
          <Link href="#" className="hover:opacity-70">Pricing</Link>
          <Link href="#" className="flex items-center hover:opacity-70">Resources <ChevronDown size={14} className="ml-1" /></Link>
          <Link href="#" className="hover:opacity-70">Enterprise</Link>
          <Link href="#" className="flex items-center hover:opacity-70">What's new <ChevronDown size={14} className="ml-1" /></Link>
        </div>
      </div>
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/login" className="hover:opacity-70">Log in</Link>
        <Link href="/register" className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
          Start for free
        </Link>
      </div>
    </nav>
  );
}