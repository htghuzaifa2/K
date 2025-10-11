
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
import { getProducts } from '@/lib/products';
import type { AppProduct } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

function SearchResultImage({ product }: { product: AppProduct }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        className={cn('object-contain transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint="product image"
        onLoad={() => setIsLoading(false)}
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
      getProducts().then(setAllProducts);
    }
  }, [isOpen, allProducts.length]);

  const filteredProducts = useMemo(() => {
    if (searchQuery.length === 0) {
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

    // Tier B: Any-word
    if (results.length === 0) {
      const queryWords = lowerCaseQuery.split(/[\s,.-_]+/);
      results = allProducts.filter(p => {
        const titleWords = p.name.toLowerCase().split(/[\s,.-_]+/);
        return queryWords.some(qw => titleWords.includes(qw));
      });
    }

    // Tier C: Fuzzy search
    if (results.length === 0) {
      results = allProducts.filter(p => 
        levenshtein(p.name.toLowerCase(), lowerCaseQuery) <= 2
      );
    }
    
    return results;

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
                    <p className="text-sm text-muted-foreground">PKR {product.price}</p>
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
