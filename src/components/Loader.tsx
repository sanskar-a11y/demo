'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/lib/constants';

export default function Loader() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let currentProgress = 0;
    let isPageLoaded = document.readyState === 'complete';

    const handleLoad = () => {
      isPageLoaded = true;
    };

    if (!isPageLoaded) {
      window.addEventListener('load', handleLoad);
    }

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;

      // Animate up to 90% over 2 seconds, wait for load, then finish.
      const targetProgress = isPageLoaded ? 100 : Math.min((elapsed / 2000) * 90, 90);
      
      // Smooth interpolation
      currentProgress += (targetProgress - currentProgress) * 0.1;
      
      setCount(Math.min(Math.round(currentProgress), 100));

      if (currentProgress < 99.5) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => setLoading(false), 400); 
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-between bg-midnight text-pearl overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            opacity: 0, 
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
          }}
        >
          {/* Cinematic Background Glow */}
          <div className="absolute inset-0 glow-berry rounded-full blur-[120px] opacity-20 mix-blend-screen scale-150 -z-10" />

          {/* Spacer for flex distribution */}
          <div className="flex-1" />

          {/* Central Cursive Typography and Percentage */}
          <div className="flex-none flex flex-col items-center justify-center gap-8 relative z-10">
            {/* The Animated Text */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-logo text-6xl md:text-8xl lg:text-9xl m-0 p-0 font-normal tracking-wide text-pearl drop-shadow-[0_0_20px_rgba(255,79,135,0.4)]"
            >
              Demo
            </motion.h1>

            {/* The Animated Percentage & Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-baseline gap-1 font-heading font-medium tracking-tighter">
                <span className="text-3xl md:text-4xl leading-none text-pearl/90">{count}</span>
                <span className="text-xl md:text-2xl text-rose leading-none mb-1">%</span>
              </div>
              
              {/* Minimal Line Progress Bar */}
              <div className="w-[120px] md:w-[160px] h-[1px] bg-white/10 overflow-hidden relative rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-rose shadow-[0_0_10px_rgba(255,79,135,0.5)] transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${count}%` }}
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Spacer */}
          <div className="flex-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
