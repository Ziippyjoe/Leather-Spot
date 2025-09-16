'use client';
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import NavbarMenu from './Menu';

export default function Navbar() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      setAtTop(window.scrollY === 0); // only true if literally at 0
    };

    // run immediately on mount to catch reloads mid-scroll
    checkScroll();

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-300 ease-in-out h-12
        ${atTop ? 'bg-transparent' : 'bg-[#fdfdfd] '}`}
    >
      <div className="h-full w-full flex justify-between items-center px-4 md:px-8 font-sans">
        {/* Left Side: Menu and Main Links */}
        <div className="font-mono flex gap-4 items-center">
          <NavbarMenu />
          <Link href="/" className="font-semibold uppercase text-xl">
            Leather Spot
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex gap-4 md:gap-6 items-center text-sm">
          <Link href="/collections" className="hover:underline transition">
            Collections
          </Link>
          <Link href="/contact" className="hover:underline transition">
            Contact Us
          </Link>
          <Search className="cursor-pointer w-4 h-4 transition" />
          <Link href="/cart">
            <ShoppingCart className="cursor-pointer w-4 h-4 transition" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
