'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const bespokeFeatures = [
  {
    title: 'Artisan Pizzas',
    description: 'Hand-stretched sourdough pizzas baked in our custom wood-fired oven. Fermented for 72 hours for an impossibly airy, charred crust.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Specialty Coffee',
    description: 'Single-origin microlots ethically sourced and micro-roasted. Served with absolute precision to highlight terroir-driven tasting notes.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Signature Drinks',
    description: 'Bespoke botanical mixology combining house-infused elixirs, rare spirits, and culinary techniques for an avant-garde experience.',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
  },
];

function FeatureBlock({ feature, index }: { feature: typeof bespokeFeatures[0]; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div 
      ref={blockRef} 
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 lg:py-32 border-b border-white/5 last:border-0"
    >
      <motion.div style={{ opacity, y }} className="flex flex-col w-full max-w-xl mx-auto will-change-transform">
        <div className="w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden mb-12 relative group glass-card">
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
          <motion.div 
            className="absolute inset-[-15%] w-[130%] h-[130%] will-change-transform"
            style={{ y: imgY }}
          >
            <Image 
              src={feature.img} 
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
        
        <div className="flex items-center gap-6 mb-6">
          <span className="font-heading font-light text-rose text-2xl lg:text-3xl tracking-widest opacity-80">
            0{index + 1}
          </span>
          <h3 className="font-heading text-4xl lg:text-5xl uppercase tracking-tighter text-pearl m-0">
            {feature.title}
          </h3>
        </div>
        <p className="font-body text-lg lg:text-xl text-dust leading-relaxed pl-12 md:pl-[4.5rem]">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.7, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} id="about" className="relative bg-midnight text-pearl w-full">
      <div className="flex flex-col lg:flex-row w-full h-full">
        
        {/* Sticky Left / Background Side */}
        <div className="lg:w-1/2 w-full h-[60vh] lg:h-screen sticky top-0 flex flex-col justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 bg-obsidian z-0">
          
          <motion.div 
            className="absolute inset-[-15%] z-0 w-[130%] h-[130%] will-change-transform"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: backgroundY,
            }}
          />
          <div className="absolute inset-0 z-0 bg-obsidian/30" />
          <motion.div 
            className="absolute inset-0 z-0 bg-gradient-to-t lg:bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent"
            style={{ opacity: overlayOpacity }}
          />

          <motion.div 
            style={{ y: textY }}
            className="relative z-10 px-6 md:px-16 lg:px-24"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-body font-bold uppercase tracking-[0.2em] text-rose mb-6 block text-sm lg:text-base"
            >
              Our Philosophy
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-heading text-4xl md:text-7xl lg:text-[7rem] uppercase leading-[0.85] tracking-tighter mb-8"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-pearl to-dust">Unleash</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-pearl to-dust/70">Your Inner</span>
              <span className="block text-rose drop-shadow-[0_0_20px_rgba(255,79,135,0.3)]">Rebel</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-body text-lg lg:text-2xl max-w-md text-dust leading-relaxed"
            >
              At DEMO, we throw out the rulebook. We blend raw European sophistication with pure, unadulterated energy to create an unforgettable experience.
            </motion.p>
          </motion.div>
        </div>

        {/* Scrolling Right Side */}
        <div className="lg:w-1/2 w-full flex flex-col relative z-10 bg-midnight lg:bg-transparent">
          {bespokeFeatures.map((feature, idx) => (
            <FeatureBlock key={feature.title} feature={feature} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
