'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnBlobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const blob = blobRef.current;
      if (blob) {
        blob.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          { duration: 3000, fill: 'forwards' }
        );
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    
    const handleBtnMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const btnBlob = btnBlobRef.current;
        const { top, left } = btn.getBoundingClientRect();
        if (btnBlob) {
            btnBlob.animate({
                left: `${clientX - left}px`,
                top: `${clientY - top}px`,
            }, { duration: 400, fill: "forwards" });
        }
    }
    
    btn.addEventListener('mousemove', handleBtnMouseMove);
    
    return () => {
       btn.removeEventListener('mousemove', handleBtnMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60vh] min-h-[400px] flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 bg-grid-white-500/10" />
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full bg-gradient-to-tr from-primary/70 via-accent/70 to-primary/70 opacity-30 blur-3xl"
      />
      <div className="relative z-10 text-center">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Discover What's Next.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Explore curated tech, insightful articles, and developer tools designed to inspire your next big idea.
        </p>
        <div className="mt-10">
          <Button asChild ref={btnRef} className="fancy-btn" size="lg">
            <Link href="/products">
              <span className="text">Shop Now</span>
              <span ref={btnBlobRef} className="blob"></span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
