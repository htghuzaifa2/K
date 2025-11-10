'use client';

import { type AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { useState, useEffect } from 'react';
import { fetchProductsSummary } from '@/app/actions';

type ClientOnlyRelatedProductsProps = {
  currentProductId?: string;
};

const RECOMMENDATION_COUNT = 4;

export function ClientOnlyRelatedProducts({ currentProductId }: ClientOnlyRelatedProductsProps) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const relatedProducts = await fetchProductsSummary(currentProductId, RECOMMENDATION_COUNT);
        setProducts(relatedProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        // Silently fail to not show a broken section
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentProductId]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return null; // Don't render the section if there are no products or if fetching failed
  }

  return <ProductGrid products={products} />;
}
