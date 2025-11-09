
'use client';

import { type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { useEffect, useState } from 'react';
import { QuickView } from './quick-view';
import { fetchRelatedProductsData } from '@/app/actions';

type RelatedProductsProps = {
  currentProduct: AppProduct;
};

const RECOMMENDATION_COUNT = 10;

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [relatedProductsList, setRelatedProductsList] = useState<AppProduct[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const related = await fetchRelatedProductsData(currentProduct.category, currentProduct.id, RECOMMENDATION_COUNT);
        setRelatedProductsList(related);
      } catch (error) {
        console.error('Failed to get related products:', error);
      }
    }

    fetchRelated();
  }, [currentProduct]);


  const handleQuickView = (product: AppProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

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
