'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function NavbarMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Hamburger/X Button */}
      <button onClick={toggleMenu} className="z-[1100] relative">
        {showMenu ? (
          <X className="cursor-pointer w-5 h-5 text-black transition" />
        ) : (
          <Menu className="cursor-pointer w-4 h-4 transition" />
        )}
      </button>

      {/* Overlay */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-black/30 z-[100] transition-opacity duration-300 ${
          showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        {/* Slide-in menu */}
        <div
          className={`w-90 bg-[#fdfdfd] h-full p-7 transition-transform duration-300 ease-in-out ${
            showMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Main navigation */}
          <nav className="flex flex-col gap-8 mt-8 p-10">
            {/* Shop Categories */}
            <div>
              <h3 className="uppercase font-mono text-xs text-gray-700 mb-3 tracking-wide">
                Shop
              </h3>
              <ul className="flex flex-col gap-2 text-sm font-sans text-gray-800">
                <li><Link href="/collections/bags" className="hover:underline hover:text-black transition">Bags</Link></li>
                <li><Link href="/collections/wallets" className="hover:underline hover:text-black transition">Wallets</Link></li>
                <li><Link href="/collections/belts" className="hover:underline hover:text-black transition">Belts</Link></li>
                <li><Link href="/collections/accessories" className="hover:underline hover:text-black transition">Accessories</Link></li>
                <li><Link href="/collections/new-arrivals" className="hover:underline hover:text-black transition">New Arrivals</Link></li>
                <li><Link href="/collections/sale" className="hover:underline hover:text-black transition">Sale</Link></li>
              </ul>
            </div>

            {/* About / Brand */}
            <div>
              <h3 className="uppercase font-mono text-xs text-gray-700 mb-3 tracking-wide">
                Brand
              </h3>
              <ul className="flex flex-col gap-2 text-sm font-sans text-gray-800">
                <li><Link href="/about" className="hover:underline hover:text-black transition">About Us</Link></li>
                <li><Link href="/craftsmanship" className="hover:underline hover:text-black transition">Craftsmanship</Link></li>
                <li><Link href="/sustainability" className="hover:underline hover:text-black transition">Sustainability</Link></li>
                <li><Link href="/contact" className="hover:underline hover:text-black transition">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Help */}
            <div>
              <h3 className="uppercase font-mono text-xs text-gray-700 mb-3 tracking-wide">
                Help
              </h3>
              <ul className="flex flex-col gap-2 text-sm font-sans text-gray-800">
                <li><Link href="/shipping" className="hover:underline hover:text-black transition">Shipping</Link></li>
                <li><Link href="/returns" className="hover:underline hover:text-black transition">Returns</Link></li>
                <li><Link href="/care" className="hover:underline hover:text-black transition">Leather Care</Link></li>
                <li><Link href="/faq" className="hover:underline hover:text-black transition">FAQ</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
