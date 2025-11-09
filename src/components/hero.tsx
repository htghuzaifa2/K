
'use client';

import { useState, useEffect } from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const slides = [
  {
    title: "Explore Our Full Collection",
    description: "Find everything you need, all in one place.",
    buttonText: "Shop All Products",
    href: "/products",
    background: "bg-primary/10",
  },
  {
    title: "Discover Your Perfect Category",
    description: "Browse curated collections tailored for you.",
    buttonText: "Shop by Category",
    href: "/categories",
    background: "bg-accent/10",
  },
  {
    title: "Premium Wireless Keyboards",
    description: "Elevate your typing experience with our sleek and silent keyboards.",
    buttonText: "Shop Keyboards",
    href: "/products/category/keyboards",
    image: "https://i.postimg.cc/KzNsv0Ws/Wireless-keyboard-KB036-for-laptop-and-mobile-smooth-silent-keys-available-in-Pakistan.png",
    imageAlt: "Wireless keyboard",
  }
];

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full relative">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: true,
          }),
        ]}
        opts={{
            loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-0">
                <Card className="border-0 rounded-none shadow-none">
                  <CardContent className={cn("relative flex items-center justify-center p-6 h-[40vh] min-h-[300px]", slide.background)}>
                    {slide.image && (
                      <>
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt || "Hero image"}
                          fill
                          className="object-contain"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </>
                    )}
                    <div className="relative z-10 text-center">
                       <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/90">
                        {slide.description}
                      </p>
                      <Button asChild size="lg" className="mt-8">
                        <Link href={slide.href}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                current === index ? 'w-4 bg-white' : 'bg-white/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
}
