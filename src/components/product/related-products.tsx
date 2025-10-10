
'use client';

import { getProductsByCategory, getProducts, type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { useEffect, useState } from 'react';
import { QuickView } from './quick-view';

type RelatedProductsProps = {
  currentProduct: AppProduct;
};

const RECOMMENDATION_COUNT = 10;

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [relatedProductsList, setRelatedProductsList] = useState<AppProduct[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);

  useEffect(() => {
    async function fetchRelatedProducts() {
      let related: AppProduct[] = [];
      try {
        const categoryProducts = await getProductsByCategory(currentProduct.category);
        related = categoryProducts.filter(p => p.id !== currentProduct.id);

        if (related.length < RECOMMENDATION_COUNT) {
          const allProducts = await getProducts();
          const otherProducts = allProducts.filter(p =>
            p.category.toLowerCase() !== currentProduct.category.toLowerCase() &&
            p.id !== currentProduct.id
          );

          const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());

          const needed = RECOMMENDATION_COUNT - related.length;
          related.push(...shuffledOthers.slice(0, needed));
        }
        setRelatedProductsList(related.slice(0, RECOMMENDATION_COUNT));
      } catch (error) {
        console.error('Failed to get related products:', error);
      }
    }

    fetchRelatedProducts();
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
