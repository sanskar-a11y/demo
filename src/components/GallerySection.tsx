'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import GalleryModal from './GalleryModal';

const PRODUCTS = [
  { id: 1, src: '/gallery/drink_1.png', title: 'Midnight Elixir', description: 'Cold-drip extraction. Pure velvet.' },
  { id: 2, src: '/gallery/drink_2.png', title: 'Velvet Reserve', description: 'Double-caffeinated precision.' },
  { id: 3, src: '/gallery/drink_3.png', title: 'Crimson Drop', description: 'Botanical infusion. Zero compromise.' },
  { id: 4, src: '/gallery/drink_4.png', title: 'Noir Essence', description: 'Smoked glass & shadow profiles.' },
  { id: 5, src: '/gallery/drink_5.png', title: 'The Architect', description: 'Structured energy. Perfect balance.' },
  { id: 6, src: '/gallery/drink_1.png', title: 'Obsidian Flow', description: 'Liquid midnight in every pour.' },
];

export default function GallerySection() {
  const targetRef = useRef<HTMLElement>(null);
  
  // Track scroll progress for the tall container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Convert scroll progress into a horizontal translation.
  // We use a custom string to bypass Framer Motion's strict interpolator 
  // and perfectly align the end of the track to the end of the viewport.
  const xPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x = useTransform(xPercent, p => `calc(-${p}% + ${p}vw)`);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardClick = useCallback((index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <>
      {/* 400vh gives us plenty of scrolling length to complete the horizontal slide */}
      <section ref={targetRef} id="gallery" className="relative h-[400vh] bg-midnight text-pearl mt-12 md:mt-20">
        <div className="sticky top-0 pt-20 md:pt-24 flex h-screen items-center overflow-hidden">
          
          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-berry/10 via-midnight/90 to-midnight -z-10 pointer-events-none" />
          
          {/* Huge typography fixed in the background of the sticky section */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full px-6 lg:px-12 -z-10 pointer-events-none flex justify-between opacity-30 mix-blend-overlay">
            <h2 className="font-heading text-[15vw] uppercase tracking-tighter leading-none text-pearl/20 drop-shadow-2xl whitespace-nowrap select-none">
              Explore
            </h2>
            <h2 className="font-heading text-[15vw] uppercase tracking-tighter leading-none text-pearl/20 drop-shadow-2xl whitespace-nowrap select-none">
              Spaces
            </h2>
          </div>

          {/* The sliding track */}
          <motion.div style={{ x }} className="flex gap-8 md:gap-16 lg:gap-32 px-6 md:px-12 lg:px-32 w-max items-center will-change-transform">
            {PRODUCTS.map((item, index) => {
              // Creating varied presentation with vertical rhythm
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={item.id}
                  className="group relative flex-shrink-0 cursor-pointer w-[56vw] md:w-[28vw] lg:w-[18vw] transition-transform duration-700 hover:scale-105 hover:z-50"
                  onClick={() => handleCardClick(index)}
                >
                  {/* Premium Glass Backdrop */}
                  <div className="absolute -inset-8 bg-surface glass-card rounded-[2rem] transform transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 border border-white/5 -z-10 shadow-2xl" />

                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 border border-white/10 bg-obsidian transform transition-transform duration-700 group-hover:-rotate-[25deg]">
                    {/* Hover Reflections */}
                    <div className="absolute inset-0 bg-gradient-to-t from-rose/30 to-transparent mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pearl/20 to-transparent bg-[length:200%_200%] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] z-10 mix-blend-overlay" />
                    
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      fill
                      sizes="(max-width: 768px) 56vw, (max-width: 1200px) 28vw, 18vw"
                      className="object-cover transform transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />

                    {/* Elegant Number Indicator */}
                    <div className="absolute bottom-8 left-8 z-20 text-pearl/50 font-heading font-light text-2xl tracking-[0.2em] mix-blend-difference">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-4 z-10 flex flex-col gap-2 md:gap-3">
                    <h3 className="font-heading text-xl md:text-4xl uppercase tracking-tighter group-hover:text-rose transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] text-pearl drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="font-body font-light text-pearl/50 tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm uppercase">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image={PRODUCTS[currentIndex] || null}
        images={PRODUCTS}
        onNavigate={handleNavigate}
        currentIndex={currentIndex}
      />
    </>
  );
}
