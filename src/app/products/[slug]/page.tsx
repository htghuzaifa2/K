
import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const description = product.description || `Buy ${product.name} at the best price in Pakistan on ${APP_NAME}.`;
  const url = `https://www.${APP_NAME}/products/${product.slug}`;

  return {
    title: product.name,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description: description,
      url: url,
      images: [
        {
          url: product.images[0].url,
          width: 800,
          height: 800,
          alt: product.images[0].altText,
        },
      ],
      type: 'website',
    },
     twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: description,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
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

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}
