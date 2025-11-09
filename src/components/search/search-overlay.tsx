
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchAllProductsForSearch } from '@/app/actions';
import type { AppProduct } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { BLUR_DATA_URL } from '@/lib/constants';

function SearchResultImage({ product }: { product: AppProduct }) {
  return (
    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
      <Image
        src={product.images[0].url}
        alt={product.images[0].altText}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint="product image"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </div>
  )
}

// Levenshtein distance function for fuzzy search
const levenshtein = (s1: string, s2: string): number => {
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  return track[s2.length][s1.length];
};

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<AppProduct[]>([]);

  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      fetchAllProductsForSearch().then(setAllProducts);
    }
  }, [isOpen, allProducts.length]);

  const filteredProducts = useMemo(() => {
    if (searchQuery.length < 2) {
      return [];
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    // Rule 1: ID Search
    if (/^\d+$/.test(searchQuery)) {
      const productById = allProducts.find(p => p.id === searchQuery);
      return productById ? [productById] : [];
    }

    // Rule 2: Title Search
    // Tier A: Starts-with
    let results = allProducts.filter(p => 
      p.name.toLowerCase().startsWith(lowerCaseQuery)
    );

    // Tier B: Includes
    if (results.length === 0) {
        results = allProducts.filter(p => p.name.toLowerCase().includes(lowerCaseQuery));
    }
    
    // Tier C: Fuzzy search
    if (results.length < 5) {
      const fuzzyResults = allProducts
        .map(p => ({
          product: p,
          distance: levenshtein(p.name.toLowerCase(), lowerCaseQuery)
        }))
        .filter(p => p.distance <= 3 && p.distance > 0)
        .sort((a, b) => a.distance - b.distance)
        .map(p => p.product);
      
      const combined = [...results];
      fuzzyResults.forEach(fr => {
        if (!combined.some(r => r.id === fr.id)) {
          combined.push(fr);
        }
      });
      results = combined;
    }
    
    return results.slice(0, 10);

  }, [searchQuery, allProducts]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search products</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90vh] w-full max-w-2xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-headline text-2xl">Search for Products</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-0">
          <Input
            placeholder="Search by product name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-lg"
          />
        </div>
        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="p-6 pt-0">
            {searchQuery.length > 1 && filteredProducts.length === 0 && (
              <p className="text-center text-muted-foreground">No products found for &quot;{searchQuery}&quot;</p>
            )}
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-4 rounded-md p-2 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <SearchResultImage product={product} />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-primary">PKR {product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
