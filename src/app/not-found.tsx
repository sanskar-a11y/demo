'use client';

import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-midnight text-pearl flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden font-body">
      {/* Background Glowing Ambient Orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{
          background:
            'radial-gradient(circle, rgba(220, 20, 60, 0.8) 0%, rgba(139, 10, 30, 0.2) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-md w-full flex flex-col items-center z-10 relative">
        {/* Monogram Monicker */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full flex items-center justify-center border border-rose/30 bg-obsidian mb-8 relative shadow-lg"
        >
          <span className="font-heading text-2xl font-semibold tracking-wider text-rose">J</span>
        </motion.div>

        {/* 404 Tag */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-body tracking-[0.4em] uppercase text-rose font-bold mb-4"
        >
          Error 404
        </motion.p>

        {/* Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl md:text-5xl text-pearl font-light tracking-wide mb-4 leading-tight"
        >
          Shattered Glass
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm text-white/45 leading-relaxed mb-10"
        >
          This corridor is currently private or does not exist in the House. Permit us to lead you back to your table.
        </motion.p>

        {/* Return Button */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="btn-premium px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-pearl border-mint/30 hover:border-mint cursor-pointer shadow-lg shadow-mint/10"
        >
          Return to Sanctuary
        </motion.a>
      </div>

      {/* Decorative luxury overlay line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-rose/15 to-transparent" />
    </div>
  );
}
