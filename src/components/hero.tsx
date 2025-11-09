
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from './ui/button';
import Link from 'next/link';

const heroSlides = [
  {
    image: 'https://picsum.photos/seed/hero1/1920/1080',
    hint: 'fashion model',
    headline: 'Style Redefined',
    subheadline: 'Discover the latest trends and timeless classics.',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    image: 'https://picsum.photos/seed/hero2/1920/1080',
    hint: 'modern clothing',
    headline: 'New Arrivals',
    subheadline: "This season's must-have pieces have landed.",
    cta: 'Explore Collection',
    link: '/products',
  },
  {
    image: 'https://picsum.photos/seed/hero3/1920/1080',
    hint: 'urban fashion',
    headline: 'Urban Essentials',
    subheadline: 'Crafted for the city, designed for life.',
    cta: 'View Lookbook',
    link: '/products',
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight } = heroRef.current;
    const x = (clientX / offsetWidth - 0.5) * 2;
    const y = (clientY / offsetHeight - 0.5) * 2;
    heroRef.current.style.setProperty('--x', `${x * 5}px`);
    heroRef.current.style.setProperty('--y', `${y * 5}px`);
  }, []);

  useEffect(() => {
    const currentRef = heroRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  return (
    <div ref={heroRef} className="relative w-full overflow-hidden" style={{'--x': '0px', '--y': '0px'} as React.CSSProperties}>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[60vh] min-h-[400px] w-full md:h-[80vh]">
                <div className="absolute inset-0 z-0 transform transition-transform duration-300 ease-out" style={{ transform: `translate(var(--x), var(--y))` }}>
                  <Image
                    src={slide.image}
                    alt={slide.headline}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    data-ai-hint={slide.hint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                  <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.headline}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg sm:text-xl md:text-2xl">
                    {slide.subheadline}
                  </p>
                  <Button asChild size="lg" className="mt-8">
                    <Link href={slide.link}>{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
      </Carousel>
    </div>
  );
}
