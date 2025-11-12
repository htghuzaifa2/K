
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
  currentProductId?: string;
}

export function ClientProductList({ category, limit, shuffle, currentProductId }: ClientProductListProps) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        // fetchProducts is a server action, safe to call on client
        const result = await fetchProducts({ category, limit, shuffle });
        let finalProducts = result.products;
        
        if (currentProductId) {
            finalProducts = finalProducts.filter(p => p.id !== currentProductId);
        }
        if (limit) {
            finalProducts = finalProducts.slice(0, limit);
        }
        setProducts(finalProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, [category, limit, shuffle, currentProductId]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }
  
  if (products.length === 0) {
    return <div className="text-center py-16">No products found.</div>;
  }

  return <ProductGrid products={products} />;
}
