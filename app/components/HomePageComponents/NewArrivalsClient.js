'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function NewArrivalsClient({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector('.product-card')?.clientWidth || 320;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="pb-24 mx-auto relative">
      <h2 className="text-2xl font-mono uppercase mb-8 text-center">
        New Arrivals
      </h2>

      {/* Scroll Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('left')}
        className="absolute left-6 top-2/5 -translate-y-1/2 z-20 bg-white/85 p-2 shadow hover:bg-white transition"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scroll('right')}
        className="absolute right-6 top-2/5 -translate-y-1/2 z-20 bg-white/85 p-2 shadow hover:bg-white transition"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </motion.button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-18 custom-scrollbar"
        style={{ scrollPadding: '80px' }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/new-arrival/${product.slug}`}
            className="product-card group w-[20.5rem] flex-shrink-0 snap-start mb-10"
          >
            <div className="w-full h-[28rem] bg-black/5 overflow-hidden">
              <img
                src={product.images[0]?.url || '/images/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-2 flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase">{product.name}</h3>
              <p className="text-gray-700 text-xs">
                ${(product.priceCents / 100).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}