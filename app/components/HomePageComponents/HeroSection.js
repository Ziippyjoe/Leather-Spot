'use client';
import React from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  const parentDuration = 0.65; // parent scale duration
  const tagDelayStep = 0.12; // small stagger between tags
  const lastTagDelay = parentDuration + tagDelayStep * 3; // delay of the last tag

  return (
    <section className="relative h-screen w-full flex overflow-hidden bg-black">
      {/* Animated parent: scales from slightly larger -> normal on load */}
      <motion.div
        className="flex w-full h-full"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: parentDuration, ease: 'easeOut' }}
      >
        {/* Image columns */}
        <div className="w-1/4 h-full relative">
          <img
            src="/hero1.jpeg"
            alt="Leather editorial left"
            className="w-full h-full object-cover object-top opacity-45"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 0, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-28 right-10 bg-[#1b1b1b]/70 text-white/70 px-4 py-2 text-[9px] uppercase tracking-wider"
            style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
          >
            Bags
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img
            src="/hero2.jpeg"
            alt="Leather editorial"
            className="w-full h-full object-cover object-top opacity-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 1, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-60 right-10 bg-[#1b1b1b]/70 text-white/70 px-4 py-2 text-[9px] uppercase tracking-wider"
            style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
          >
            Jackets
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img
            src="/hero3.jpg"
            alt="Leather editorial"
            className="w-full h-full object-cover object-top opacity-45"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 2, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-32 left-14 bg-[#1b1b1b]/70 text-white/70 px-4 py-2 text-[9px] uppercase tracking-wider"
            style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
          >
            Tops & Bottoms
          </motion.div>
        </div>

        <div className="w-1/4 h-full relative">
          <img
            src="/hero4.jpeg"
            alt="Leather editorial"
            className="w-full h-full object-cover object-top opacity-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parentDuration + tagDelayStep * 3, duration: 0.45, ease: 'easeOut' }}
            className="absolute top-60 right-18 bg-[#1b1b1b]/70 text-white/70 px-4 py-2 text-[9px] uppercase tracking-wider"
            style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.4)' }}
          >
            Boots
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay content skewed bottom-left (animated) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lastTagDelay + 0.14, duration: 0.55, ease: 'easeOut' }}
        className="absolute bottom-16 left-12 z-10"
      >
        <div className="bg-black/50 backdrop-blur-sm px-6 py-4 max-w-sm text-left text-[#fdfdfdef] shadow-lg">
          <h1 className="text-xl md:text-3xl font-sans tracking-tighter flex gap-2 italic">
            Objective:
            <span>Leather</span>
          </h1>
          <p className="mt-3 text-xs md:text-xs text-gray-300 font-sans">
            Jackets, bags, boots... a catalogue for the aesthetically edgy male and female in Leather finesse.
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-black text-sm font-sans tracking-wide hover:bg-gray-200 transition">
            View Collections
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
