'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleField from '@/components/ParticleField';
import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import MarqueeTape from '@/components/MarqueeTape';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent font-body text-pearl overflow-x-clip selection:bg-raspberry/40 selection:text-white">
      {/* Ambient background particle field removed per request */}

      {/* Glassmorphism navigation bar removed from here as it's in layout.tsx */}

      {/* Smooth scroll wrapper for all sections */}
      <SmoothScroll>
        <main className="relative flex flex-col w-full">
          {/* Cinematic hero with scroll-driven frame animation */}
          <HeroSection />

          {/* Luxury masonry gallery */}
          <GallerySection />

          {/* Immersive details/about section */}
          <AboutSection />

          {/* Infinite scrolling ribbons divider */}
          <MarqueeTape />

          {/* Premium futuristic contact form */}
          <ContactSection />

          {/* Luxury footer removed from here as it's in layout.tsx */}
        </main>
      </SmoothScroll>
    </div>
  );
}

