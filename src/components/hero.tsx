
'use client';

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <div className="w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
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
                  <CardContent className={`relative flex items-center justify-center p-6 h-[40vh] min-h-[300px] ${slide.background || ''}`}>
                    {slide.image && (
                      <>
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt || "Hero image"}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </>
                    )}
                    <div className="relative z-10 text-center text-white">
                      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl">
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
    </div>
  );
}
