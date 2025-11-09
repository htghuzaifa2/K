
'use client';

import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense, useState, useEffect } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import type { AppProduct } from '@/lib/products';
import { Skeleton } from '@/components/ui/skeleton';


type ProductPageProps = {
  params: {
    slug: string;
  };
};

function ProductDetailsSkeleton() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="mt-4 flex justify-center gap-2">
                        <Skeleton className="h-2 w-8 rounded-full" />
                        <Skeleton className="h-2 w-2 rounded-full" />
                        <Skeleton className="h-2 w-2 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    );
}


export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const [product, setProduct] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const fetchedProduct = await getProductBySlug(slug);
        if (!fetchedProduct) {
          notFound();
        } else {
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    // This will be handled by notFound in useEffect, but as a fallback
    return null;
  }

  return (
    <>
      <ProductDetailsClient product={product} />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<p className="text-center">Loading recommendations...</p>}>
          <RelatedProducts currentProduct={product} />
        </Suspense>
      </div>
    </>
  );
}
