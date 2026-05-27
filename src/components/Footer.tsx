'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <footer ref={footerRef} className="relative bg-surface text-pearl pt-24 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24 font-bold"
        >
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="font-heading font-black text-5xl md:text-7xl tracking-tight uppercase text-rose">
              DEMO
            </h2>
            <p className="text-pearl/70 text-lg md:text-xl max-w-sm font-body font-light tracking-wide leading-relaxed">
              Shatter Boredom. Fuel Up.<br/>
              Protein + Caffeine in every drop.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xl uppercase tracking-widest text-rose font-semibold font-heading">Explore</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  className="text-pearl/70 hover:text-rose text-lg transition-colors w-fit uppercase tracking-wider font-light"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xl uppercase tracking-widest text-rose font-semibold font-heading">Social</h4>
            <div className="flex flex-col gap-4">
              {['Instagram', 'TikTok', 'Twitter', 'Spotify'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-pearl/70 hover:text-rose text-lg transition-colors w-fit uppercase tracking-wider flex items-center gap-2 group font-light"
                >
                  <span>{item}</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-rose">↗</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/10 gap-6 font-medium"
        >
          <p className="text-sm text-pearl/50 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} DEMO. All Rights Reserved.
          </p>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-pearl/50 hover:text-rose uppercase tracking-widest transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-pearl/50 hover:text-rose uppercase tracking-widest transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Huge Background Typography for 'DEMO' Vibe */}
      <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden leading-none pb-0 mt-12 opacity-5">
        <h1 className="font-heading font-black text-[25vw] leading-[0.75] whitespace-nowrap text-pearl transform translate-y-10">
          DEMO
        </h1>
      </div>
    </footer>
  );
}
