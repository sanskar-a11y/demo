'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const maxDisplacement = 15;
    const distanceX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX * 0.3));
    const distanceY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY * 0.3));

    setOffset({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`btn-premium px-8 py-4 font-heading tracking-wider text-white ${className}`}
      animate={{ x: offset.x, y: offset.y }}
      transition={springTransition}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.span
        className="relative z-10 block"
        animate={{ x: offset.x * 0.5, y: offset.y * 0.5 }}
        transition={springTransition}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
