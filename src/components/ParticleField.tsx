'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  baseSpeedX: number;
  color: string;
  phase: number;
}

const PARTICLE_COUNT = 15;
const COLORS = ['rgba(255, 255, 255,', 'rgba(220, 20, 60,'];

function createParticle(canvasWidth: number, canvasHeight: number, randomY = false): Particle {
  const colorBase = COLORS[Math.random() > 0.6 ? 1 : 0];
  return {
    x: Math.random() * canvasWidth,
    y: randomY ? Math.random() * canvasHeight : canvasHeight + Math.random() * 50,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.2,
    speedY: -(0.1 + Math.random() * 0.2),
    speedX: -0.1 + Math.random() * 0.2,
    baseSpeedX: -0.1 + Math.random() * 0.2,
    color: colorBase,
    phase: Math.random() * Math.PI * 2,
  };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(width, height, true)
      );
    }
  }, []);

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 3
      );
      gradient.addColorStop(0, `${particle.color} ${particle.opacity})`);
      gradient.addColorStop(0.5, `${particle.color} ${particle.opacity * 0.4})`);
      gradient.addColorStop(1, `${particle.color} 0)`);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color} ${particle.opacity})`;
      ctx.fill();
    },
    []
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);
    timeRef.current += 0.01;

    particlesRef.current.forEach((particle, index) => {
      particle.y += particle.speedY;
      particle.x += particle.baseSpeedX + Math.sin(timeRef.current + particle.phase) * 0.15;

      if (particle.y < -20) {
        particlesRef.current[index] = createParticle(width, height, false);
      }

      if (particle.x < -20) {
        particle.x = width + 10;
      } else if (particle.x > width + 20) {
        particle.x = -10;
      }

      drawParticle(ctx, particle);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawParticle]);

  useEffect(() => {
    setupCanvas();

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [setupCanvas, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
