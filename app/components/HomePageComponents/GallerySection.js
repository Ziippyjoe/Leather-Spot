import React from 'react'

function GallerySection() {
  return (
    <div className='flex flex-col gap-20 px-35 justify-center items-center w-full'>
        <div className='flex w-full gap-20 justify-center'>
            <div className='h-80 w-100 bg-black/80'></div>
            <div className='h-160 w-120 bg-black'>
                <img src="/g2.jpg" alt="featured editorial" className="w-full h-full object-cover object-top" />
            </div>
        </div>
        
        <div className='flex w-full gap-20'>
            <div className='h-100 w-full bg-black'></div>
            <div className='h-100 w-full bg-black/10'></div>
        </div>
    </div>
  )
}

export default GallerySection