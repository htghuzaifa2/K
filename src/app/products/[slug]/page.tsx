'use client';
import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense, useEffect, useState } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { AppProduct } from '@/lib/products';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const [product, setProduct] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const p = await getProductBySlug(slug);
        if (!p) {
          notFound();
        } else {
          setProduct(p);
        }
      } catch (error) {
        console.error("Failed to load product", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductGridSkeleton />
      </div>
    );
  }

  if (!product) {
    // This case should be handled by notFound(), but as a fallback:
    return null;
  }

  return (
    <>
      <ProductDetailsClient product={product} />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts currentProductId={product.id} />
        </Suspense>
      </div>
    </>
  );
}