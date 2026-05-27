'use client';

import { motion } from 'framer-motion';

interface GlowOrbProps {
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

export default function GlowOrb({
  color = '#DC143C',
  size = 400,
  className = '',
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    />
  );
}
