
'use client';

import type { AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { useState } from 'react';
import { QuickView } from '@/components/quick-view';

type ProductGridProps = {
  products: AppProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);

  const handleQuickView = (product: AppProduct) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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

    