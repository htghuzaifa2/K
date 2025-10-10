'use client';

import { useState, useEffect } from 'react';
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

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<AppProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AppProduct[]>([]);

  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      getProducts().then(setAllProducts);
    }
  }, [isOpen, allProducts.length]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
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
            placeholder="e.g. Urban Hoodie"
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
                  prefetch={false}
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint="product image"
                    />
                  </div>
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
