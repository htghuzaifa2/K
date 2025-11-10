
'use client';

import { type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { useEffect, useState } from 'react';
import { QuickView } from './quick-view';
import { fetchRandomProducts } from '@/app/actions';
import { ProductGridSkeleton } from './product-grid-skeleton';

type RelatedProductsProps = {
  currentProductId: string;
};

const RECOMMENDATION_COUNT = 10;

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [relatedProductsList, setRelatedProductsList] = useState<AppProduct[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      setIsLoading(true);
      try {
        const related = await fetchRandomProducts(currentProductId, RECOMMENDATION_COUNT);
        setRelatedProductsList(related);
      } catch (error) {
        console.error('Failed to get related products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelated();
  }, [currentProductId]);

  const handleQuickView = (product: AppProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  if (isLoading) {
    return (
        <div>
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
            <ProductGridSkeleton />
        </div>
    );
  }

  if (relatedProductsList.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProductsList.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
          ))}
        </div>
      </div>
      <QuickView
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeQuickView();
          }
        }}
      />
    </>
  );
}
