'use client';

import { getProductBySlug } from '@/lib/products';
import { notFound, useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense, useEffect, useState } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import Script from 'next/script';
import { APP_NAME } from '@/lib/constants';
import type { AppProduct } from '@/lib/products';
import Loading from './loading';

export const runtime = 'edge';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<AppProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        document.title = `${foundProduct.name} | ${APP_NAME}`;
      } else {
        notFound();
      }
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return notFound();
  }

  const isOutOfStock = !product.inStock;
  const availability = isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0].url,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      url: `https://www.${APP_NAME}/products/${product.slug}`,
      priceCurrency: 'PKR',
      price: product.price.toFixed(2),
      availability: availability,
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
