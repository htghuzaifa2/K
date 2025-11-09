
'use client';

import { useState, useEffect, useRef } from 'react';
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
import { cn } from '@/lib/utils';

const slides = [
  {
    title: "Explore Our Full Collection",
    description: "Discover everything from cutting-edge tech gadgets to essential lifestyle accessories, all in one place.",
    buttonText: "Shop All Products",
    href: "/products",
    background: "bg-primary/10",
  },
  {
    title: "Shop by Category",
    description: "Browse our curated collections, thoughtfully organized to help you find exactly what you need.",
    buttonText: "Explore Categories",
    href: "/categories",
    background: "bg-accent/10",
  },
  {
    title: "Insights & Ideas",
    description: "Your source for the latest tech trends, expert tutorials, and insightful articles.",
    buttonText: "Read Our Blog",
    href: "/blogs",
    background: "bg-primary/10",
  },
  {
    title: "The Modern Toolkit",
    description: "A suite of handy online utilities designed to accelerate your creative and development workflow.",
    buttonText: "Discover Tools",
    href: "/tools",
    background: "bg-accent/10",
  }
];

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }
    
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };

    const onInteraction = () => {
      if (plugin.current.options.stopOnInteraction === false) {
        plugin.current.reset();
      }
    };
    
    api.on('select', onSelect);
    api.on('pointerDown', onInteraction);

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', onInteraction);
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
    if (plugin.current.options.stopOnInteraction === false) {
        plugin.current.reset();
    }
  };

  return (
    <div className="w-full relative">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
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
                    <div className="relative z-10 text-center">
                       <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-foreground/80">
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
                current === index ? 'w-4 bg-primary' : 'bg-primary/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
}
