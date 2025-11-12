
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';

type FetchOptions = {
  limit?: number;
  category?: string;
  shuffle?: boolean;
};

export function useProducts(options: FetchOptions) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadInitialProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts({ page: 1, ...options });
      setProducts(data.products);
      setHasMore(data.hasMore);
      setPage(1);
    } catch (error) {
      console.error("Failed to fetch initial products:", error);
      setProducts([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [options.category, options.limit, options.shuffle]);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;
    try {
      const { products: newProducts, hasMore: newHasMore } = await fetchProducts({
        page: nextPage,
        ...options,
      });
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newHasMore);
      setPage(nextPage);
    } catch (error) {
        console.error("Failed to load more products:", error);
        setHasMore(false);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, hasMore, page, options]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  return { products, hasMore, isLoading, loadMoreProducts, loadInitialProducts };
}
