
'use client';

import { type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { useState } from 'react';
import { QuickView } from './quick-view';

type ClientOnlyRelatedProductsProps = {
  products: AppProduct[];
};

export function ClientOnlyRelatedProducts({ products }: ClientOnlyRelatedProductsProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);

  const handleQuickView = (product: AppProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
        ))}
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

