'use client';

import { type AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { useState, useEffect } from 'react';
import productsSummaryData from '@/lib/products-summary.json';

const RECOMMENDATION_COUNT = 4;

function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function ClientOnlyRelatedProducts() {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      setIsLoading(true);
      try {
        const shuffled = shuffle([...productsSummaryData]);
        const summaryList = shuffled.slice(0, RECOMMENDATION_COUNT);

        const relatedProducts = summaryList.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            images: [p.image],
            description: '',
            category: [],
        }));

        setProducts(relatedProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (products.length === 0) {
    return null; 
  }

  return (
    <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ProductGrid products={products} />
    </div>
  );
}
