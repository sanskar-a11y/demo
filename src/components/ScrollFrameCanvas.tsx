'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadFrames } from '@/lib/frameLoader';
import { FRAME_COUNT } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFrameCanvas({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Only resize the canvas buffer when the display size actually changes
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear and draw with cover-fit scaling
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider – fit by height, crop sides
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Image is taller – fit by width, crop top/bottom
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  const handleResize = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      drawFrame(currentFrameRef.current);
    });
  }, [drawFrame]);

  // Preload frames
  useEffect(() => {
    let cancelled = false;

    preloadFrames((loaded, total) => {
      if (!cancelled) {
        setLoadProgress(Math.round((loaded / total) * 100));
      }
    }).then((images) => {
      if (!cancelled) {
        imagesRef.current = images;
        setIsLoaded(true);
        drawFrame(0);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // ScrollTrigger + resize
  useEffect(() => {
    if (!isLoaded) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Draw first frame immediately
    drawFrame(0);

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (FRAME_COUNT - 1)),
          FRAME_COUNT - 1
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    window.addEventListener('resize', handleResize);

    return () => {
      scrollTriggerInstance.kill();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, drawFrame, handleResize]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Sticky canvas viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ willChange: 'transform' }}
        />
        {children}

        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight z-10">
            {/* Outer ring */}
            <div className="relative w-20 h-20 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="url(#loadGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 35}
                  strokeDashoffset={2 * Math.PI * 35 * (1 - loadProgress / 100)}
                  style={{
                    transition: 'stroke-dashoffset 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <defs>
                  <linearGradient id="loadGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DC143C" />
                    <stop offset="100%" stopColor="#B76E79" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Percentage */}
            <span
              className="font-heading text-sm tracking-[0.25em] uppercase"
              style={{
                background: 'linear-gradient(135deg, #DC143C, #B76E79)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {loadProgress}%
            </span>

            {/* Subtle label */}
            <span className="mt-2 text-[0.65rem] tracking-[0.3em] uppercase text-white/20 font-heading">
              Loading Experience
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
