
'use client';

import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="w-full bg-secondary/50">
      <div className="container mx-auto px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl md:text-6xl text-primary">
          Style Redefined
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Discover the latest trends and timeless classics.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
  );
}
