import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import NavbarMenu from './Menu';

export default function Navbar() {
  
  return (
    <nav className="fixed top-0 left-0 w-full z-[1000]  text-white">
      {/* Top Tier */}
      <div className="h-16 w-full flex justify-between items-center px-4 md:px-8 font-sans tracking-tighter">
        {/* Left Side: Menu and Main Links */}
        <div className="font-mono flex gap-2 z-[1200px]">
          
          <NavbarMenu/>
          <Link href='/'>
            Leather Spot 
          </Link>
        </div>
        

        {/* Right Side: Contact, Search, Cart */}
        <div className="flex gap-4 md:gap-6 items-center text-sm">
          <Link href="/collections" className="hover:underline transition">
            Collections
          </Link>
          <Link href="/contact" className="hover:underline transition">
            Contact Us
          </Link>
          <Search className="cursor-pointer w-4 h-4 hover:text-black transition" />
          <Link href="/cart">
            <ShoppingCart className="cursor-pointer w-4 h-4 hover:text-black transition" />
          </Link>
        </div>
      </div>

      {/* Bottom Tier: Category Links */}
      {/* <div className="bg-[#f8f8f8] h-12 flex justify-center items-center border-t border-gray-200">
        <div className="flex gap-4 md:gap-8 text-sm font-sans text-gray-600">
          <Link href="/collections/bags" className="hover:underline hover:text-black transition">
            Bags
          </Link>
          <Link href="/collections/wallets" className="hover:underline hover:text-black transition">
            Wallets
          </Link>
          <Link href="/collections/accessories" className="hover:underline hover:text-black transition">
            Accessories
          </Link>
          <Link href="/collections/new-arrivals" className="hover:underline hover:text-black transition">
            New Arrivals
          </Link>
          <Link href="/collections/sale" className="hover:underline hover:text-black transition">
            Sale
          </Link>
        </div>
      </div> */}
    </nav>
  );
}
