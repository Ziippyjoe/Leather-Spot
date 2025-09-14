'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';



export default function NavbarMenu() {
    const [showMenu, setShowMenu] = useState(false)

    function handleShowMenu(){
        if(showMenu == true){
            setShowMenu(false)
        }
        else{
            setShowMenu(true)
        }
        
    }

    if(showMenu){
        return(
          <div className='w-full h-screen bg-black/20 fixed top-0 left-0' onClick={handleShowMenu}>
            <div className='w-120 bg-[#fdfdfd] h-full p-7 transition-transform duration-400'>
                
            </div>
          </div>
        )
    }

  return (
    <div className='flex items-center z-600'>
        <button onClick={handleShowMenu}>
            {!showMenu&&<Menu className="cursor-pointer w-5 h-5 text-gray-800 hover:text-black transition" />}
            
        </button>

    </div>
  )
}
