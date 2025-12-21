
'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const images = PlaceHolderImages.slice(0, 20); // Use first 20 images

type ImageState = {
  id: string;
  src: string;
  alt: string;
  left: number;
  top: number;
  zIndex: number;
  status: 'inactive' | 'active';
  ref: React.RefObject<HTMLImageElement>;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnBlobRef = useRef<HTMLDivElement>(null);

  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const globalIndex = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setImageStates(
      images.map((img) => ({
        id: img.id,
        src: img.imageUrl,
        alt: img.description,
        left: 0,
        top: 0,
        zIndex: 0,
        status: 'inactive',
        ref: React.createRef<HTMLImageElement>(),
      }))
    );
  }, []);

  const clearAllImages = useCallback(() => {
    setImageStates(prevStates => 
      prevStates.map(img => ({ ...img, status: 'inactive' }))
    );
  }, []);

  const activateImage = useCallback((x: number, y: number) => {
    const index = globalIndex.current % images.length;
    
    setImageStates((prevStates) => {
      const newStates = [...prevStates];
      const imageState = newStates[index];
      if (imageState) {
        newStates[index] = {
          ...imageState,
          left: x,
          top: y,
          zIndex: globalIndex.current,
          status: "active",
        };
        
        if (imageState.ref.current) {
            gsap.fromTo(imageState.ref.current, 
                { x: 0, y: 0, opacity: 1, scale: 0.8, rotation: Math.random() * 20 - 10 }, 
                { 
                    x: (Math.random() - 0.5) * 300, 
                    y: (Math.random() - 0.5) * 300,
                    opacity: 0,
                    scale: 0.2,
                    rotation: (Math.random() - 0.5) * 60,
                    duration: 2,
                    ease: "power3.out",
                    onComplete: () => {
                        setImageStates(prev => {
                            const states = [...prev];
                            const currentImage = states[index];
                            if (currentImage) {
                                states[index] = {...currentImage, status: 'inactive'};
                            }
                            return states;
                        });
                    }
                }
            );
        }
      }
      return newStates;
    });

    lastPosition.current = { x, y };
    globalIndex.current += 1;

  }, []);

  const handleInteraction = useCallback((e: MouseEvent | TouchEvent) => {
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const distanceFromLast = Math.hypot(
        clientX - lastPosition.current.x,
        clientY - lastPosition.current.y
      );

      const isClick = e.type === 'click' || e.type === 'touchstart';

      if (isClick || distanceFromLast > (window.innerWidth / 150)) {
        activateImage(clientX, clientY);
      }

      idleTimeout.current = setTimeout(clearAllImages, 500);

    }, [activateImage, clearAllImages]);

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
    container.addEventListener("mousemove", handleInteraction);
    container.addEventListener("touchmove", handleInteraction, { passive: true });
    container.addEventListener("click", handleInteraction);
    container.addEventListener("touchstart", handleInteraction, { passive: true });
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener("mousemove", handleInteraction);
      container.removeEventListener("touchmove", handleInteraction);
      container.removeEventListener("click", handleInteraction);
      container.removeEventListener("touchstart", handleInteraction);
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
    };
  }, [handleInteraction]);

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
      className="relative flex h-[40vh] min-h-[350px] flex-col items-center justify-center overflow-hidden bg-black text-white md:h-[50vh] md:min-h-[400px]"
    >
      <div className="absolute inset-0 bg-grid-white-500/10" />
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full bg-gradient-to-tr from-primary/50 via-accent/50 to-primary/50 opacity-20 blur-3xl"
      />
       {imageStates.map((img) => (
        <Image
          key={img.id}
          ref={img.ref}
          src={img.src}
          alt={img.alt}
          width={150}
          height={225}
          className={`
            absolute rounded-lg object-cover pointer-events-none shadow-2xl shadow-black/50
            ${
              img.status === "active" ? "opacity-100" : "opacity-0"
            }
          `}
          style={{
            left: `${img.left}px`,
            top: `${img.top}px`,
            zIndex: img.zIndex,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <div className="relative z-10 text-center p-4">
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
