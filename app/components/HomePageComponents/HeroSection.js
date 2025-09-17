'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function HeroSection() {
  const parentDuration = 0.7;
  const tagDelayStep = 0.12;
  const lastTagDelay = parentDuration + tagDelayStep * 3;

  // hook into scroll
  const { scrollY } = useScroll();
  // create a small parallax range
  const yParallax = useTransform(scrollY, [0, 400], [0, 90]); // adjust 30px as strength
  const oParallax = useTransform(scrollY, [0, 400], [0, 60]); // adjust 30px as strength

  return (
    <section className="relative h-[100vh] w-full flex overflow-hidden bg-black">
      <motion.div
        className="flex w-full h-full"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: parentDuration, ease: 'easeOut' }}
      >
        {/* Image columns + parallax tags */}
        <div className="w-1/4 h-full relative">
          <img src="/hero1.jpeg" alt="Leather editorial left" className="w-full h-full object-cover object-top " />
          <motion.div
            style={{ y: yParallax, boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 0, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-102 right-5 bg-[#1b1b1b]/70 text-white/90 px-4 py-2 text-[9px] uppercase tracking-wider backdrop-blur-xl"
          >
            Bags & accessories
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img src="/hero2.jpeg" alt="Leather editorial" className="w-full h-full object-cover object-top" />
          <motion.div
            style={{ y: yParallax, boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 1, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-80 right-10 bg-[#1b1b1b]/70 text-white/90 px-4 py-2 text-[9px] uppercase tracking-wider backdrop-blur-xl"
          >
            Coats & Jackets
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img src="/hero3.jpg" alt="Leather editorial" className="w-full h-full object-cover object-top" />
          <motion.div
            style={{ y: yParallax, boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 2, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-130 left-7 bg-[#1b1b1b]/70 text-white/90 px-4 py-2 text-[9px] uppercase tracking-wider backdrop-blur-xl"
          >
            Tops & Bottoms
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img src="/hero4.jpeg" alt="Leather editorial" className="w-full h-full object-cover object-top" />
          <motion.div
            style={{ y: yParallax, boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 3, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-83 right-10 bg-[#1b1b1b]/70 text-white/90 px-4 py-2 text-[9px] uppercase tracking-wider backdrop-blur-xl"
          >
            Shoes & Boots
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay (unchanged) */}
      <motion.div
        style={{ y: oParallax, boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lastTagDelay + 0.14, duration: 0.55, ease: 'easeOut' }}
        className="absolute bottom-26 left-8 z-20 bg-[#1b1b1b]/70 backdrop-blur-2xl px-6 py-4 max-w-sm text-left text-[#fdfdfde2]"
      >
        <h1 className="text-xl md:text-xl tracking-tighter flex gap-2 italic">
          Objective: Leather
        </h1>
        <p className="mt-3 text-xs md:text-sm italic">
          A store for the aesthetically edgy male and female in true leather finesse.
        </p>
        <button className="mt-6 py-2 text-xs font-sans tracking-wide transition underline">
          View Collections
        </button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
