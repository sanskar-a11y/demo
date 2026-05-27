'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollFrameCanvas from './ScrollFrameCanvas';
import { BRAND } from '@/lib/constants';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // ── Layer 1: Dominant Brand Title (visible 0–30%, smoothly fades out)
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const layer1Y = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
  const layer1Scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);


  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative bg-midnight"
      style={{ height: '400vh' }}
    >
      <ScrollFrameCanvas>
        {/* Cinematic Ambient Glow (Stays alive) */}
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] bg-berry/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-rose/5 rounded-full blur-[100px]" />
        </div>

        {/* ━━━ Layer 1: Dominant Composition ━━━ */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 pt-32 md:pt-48"
          style={{ opacity: layer1Opacity, y: layer1Y, scale: layer1Scale }}
        >
          {/* Main Dominant Headline */}
          <motion.h1
            className="font-heading font-semibold uppercase leading-[0.8] tracking-[-0.02em] text-[20vw] md:text-[14rem] lg:text-[18rem] m-0 p-0 gradient-text-pearl drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {BRAND.name}
          </motion.h1>

          {/* Supporting Tagline */}
          <motion.p
            className="mt-8 md:mt-12 text-sm md:text-xl lg:text-2xl text-dust font-body font-light tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          >
            {BRAND.tagline}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator for Layer 1 */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
          style={{ opacity: layer1Opacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-dust/50 font-body mb-4">
              Enter
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-rose/0 via-rose/30 to-rose/0 relative overflow-hidden">
              <motion.div 
                className="w-[2px] h-8 bg-pearl absolute top-0 -left-[0.5px]"
                animate={{ y: [-32, 48] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>


      </ScrollFrameCanvas>
    </section>
  );
}
