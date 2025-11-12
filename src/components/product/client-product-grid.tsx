
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';

export function ClientProductGrid({ initialProducts }: { initialProducts: AppProduct[] }) {
    const [products, setProducts] = useState<AppProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request to demonstrate client-side fetching
        // In a real app, this might be an API call.
        // For now, we use the initialProducts passed as props after a delay.
        const timer = setTimeout(() => {
            setProducts(initialProducts);
            setIsLoading(false);
        }, 50); // A small delay to ensure skeleton shows

        return () => clearTimeout(timer);
    }, [initialProducts]);

    if (isLoading) {
        return <ProductGridSkeleton />;
    }
    
    if (products.length === 0) {
        return <div className="text-center py-16">No products found.</div>;
    }

    return <ProductGrid products={products} />;
}
