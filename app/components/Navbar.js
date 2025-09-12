import React from "react";
import { Search, ShoppingCart, Menu } from "lucide-react";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[1000] bg-[#fdfdfd]">
      <div className="h-12 flex justify-between items-center px-15 font-mono tracking-tighter relative">
        
        {/* Left side */}
        <div className="flex gap-4 text-sm items-center">
          <Menu className="cursor-pointer w-4 h-4" />
          <button className="hover:underline transition cursor-pointer">Shop</button>
          <button className="hover:underline transition cursor-pointer">Collections</button>
        </div>

        {/* Center (brand/logo) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl ">
          LEATHER SPOT
        </div>

        {/* Right side */}
        <div className="flex gap-6 items-center text-sm">
          <button className="hover:underline transition cursor-pointer">Contact Us</button>
          <Search className="cursor-pointer w-4 h-4" />
          <ShoppingCart className="cursor-pointer w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
