import React from 'react'
import { MessageCircle } from 'lucide-react'

function FloatingCircle() {
  return (
    <div className="fixed bottom-10 right-7 z-[1000]">
      <div
        className="h-16 w-16 bg-white rounded-full flex items-center justify-center"
        style={{
          boxShadow: "0px 1px 5px grey",
        }}
      >
        <MessageCircle size={22} color="black" fill='black' strokeWidth={2} />
      </div>
    </div>
  )
}

export default FloatingCircle
