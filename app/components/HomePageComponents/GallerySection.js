import React from 'react'

function GallerySection() {
  const galleryItem =
    "relative overflow-hidden cursor-pointer group flex flex-col gap-2 justify-center";

  // start zoomed in, scale back to normal on hover
  const imageBase =
    "w-full h-full object-cover object-center transform scale-107 transition-transform duration-500 ease-in-out group-hover:scale-100";

  return (
    <div className="flex flex-col px-35 justify-center items-center w-full font-mono uppercase mb-20 py-20">
      <h2 className="text-2xl md:text-2xl font-mono uppercase mb-12 tracking-tight">
        Gallery
      </h2>

      {/* Top row */}
      <div className="grid grid-cols-3 w-full gap-15 justify-center mb-20 h-160">
        <div className={`${galleryItem} h-full w-full`}>
          <div className="relative h-full w-full overflow-hidden">
            <img src="/g1.jpg" alt="Women in Leather" className={imageBase} />
          </div>
          <p>Women of Lambskin</p>
        </div>

        <div className={`${galleryItem} h-full w-full`}>
          <div className="relative h-full w-full overflow-hidden">
            <img src="/b2m.jpg" alt="Boys To Men" className={imageBase} />
          </div>
          <p>Boys-To-Men — Levelling up</p>
        </div>

        <div className={`${galleryItem} h-full w-full`}>
          <div className="relative h-full w-full overflow-hidden">
            <img src="/g2.jpg" alt="The Raw Edge" className={imageBase} />
          </div>
          <p>Raw Edge</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex w-full gap-15 h-140">
        <div className={`${galleryItem} w-full`}>
          <div className="relative h-full w-full overflow-hidden">
            <img src="/g3.jpg" alt="Nightly Rituals" className={imageBase} />
          </div>
          <p>Nightly Rituals</p>
        </div>

        <div className={`${galleryItem} w-full`}>
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/g4.jpg"
              alt="Special Set Presentation"
              className={imageBase}
            />
          </div>
          <p>Special Set Presentation</p>
        </div>
      </div>
    </div>
  )
}

export default GallerySection
