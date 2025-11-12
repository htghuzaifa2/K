
'use client';

import { useState, useEffect } from 'react';
import { fetchProducts } from '@/app/actions';
import type { AppProduct } from '@/lib/products';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { ProductGrid } from './product-grid';

interface ClientProductListProps {
  category?: string;
  limit?: number;
  shuffle?: boolean;
}

export function ClientProductList({ category, limit, shuffle }: ClientProductListProps) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const result = await fetchProducts({ category, limit, shuffle });
        setProducts(result.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [category, limit, shuffle]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }
  
  if (products.length === 0) {
    return <div className="text-center py-16">No products found.</div>;
  }

  return <ProductGrid products={products} />;
}
