'use client';

import { useState, useEffect } from 'react';
import { Store, House } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/lib/contexts/AuthContext";

const SLIDES = [
  {
    image: 'https://plus.unsplash.com/premium_photo-1772553898718-229e445a0028?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4OXx8fGVufDB8fHx8fA%3D%3D',
    title: 'Be the next store they line up for',
    desc: 'Dream big, build fast, and grow far on Shopify.',
  },
  {
    image: 'https://images.unsplash.com/photo-1713947506242-8fcae733d158?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww',
    title: 'Bring your ideas to life',
    desc: 'The world’s most customizable commerce platform.',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Sell everywhere you are',
    desc: 'One platform that lets you sell wherever your customers are.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { user } = useAuth();

  // Auto-scroll logic: changes slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center px-8 lg:px-20 overflow-hidden bg-black text-white">
      
      {/* Background Carousel Container */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent z-10" />
            
            <Image 
              src={slide.image}
              alt={slide.title || "Hero background"} 
              fill 
              unoptimized
              priority={index === 0}
              className={`object-cover transition-transform duration-5000m ease-linear ${
                index === current ? 'scale-110' : 'scale-100'
              }`}
            />
            
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl pt-20">
        <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-medium leading-[1.1] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {SLIDES[current].title}
            </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-10 max-w-lg font-light opacity-90 transition-all duration-700">
          {SLIDES[current].desc}
        </p>
        
        <div className="flex flex-wrap gap-4">
          
            <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-colors group">
              <span className="bg-gray-200 rounded-full p-1.5 group-hover:scale-110 transition-transform">
                <House size={18} fill="white" className="text-black" />
              </span>
              <Link href={user?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                Dashboard
              </Link>
            </button>
          
          <button className="flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-colors group">
            <span className="bg-gray-200 rounded-full p-1.5 group-hover:scale-110 transition-transform">
              <Store size={18} fill="white" className="text-black" />
            </span>
            <Link href="/market">Visit Market</Link>
          </button>
        </div>
      </div>

      {/* Progress Indicators (Bottom Center) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative h-1 w-12 bg-white/20 overflow-hidden rounded-full"
          >
            {/* The "filling" animation for the active slide */}
            <div 
                className={`absolute inset-0 bg-white transition-all duration-5000m ease-linear ${
                    i === current ? 'translate-x-0' : '-translate-x-full'
                }`}
            />
          </button>
        ))}
      </div>

    </section>
  );
}