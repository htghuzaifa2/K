
import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import { Metadata, ResolvingMetadata } from 'next';
import { APP_NAME } from '@/lib/constants';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product not found`,
      description: "The product you are looking for does not exist.",
    }
  }

  let description = '';
  if (product.description && product.description.length >= 10) {
    description = product.description;
  } else if (product.longDescription) {
    // Strip HTML and line breaks
    const cleanedDescription = product.longDescription.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, ' ');
    if (cleanedDescription.length > 160) {
      description = cleanedDescription.substring(0, 157) + '...';
    } else {
      description = cleanedDescription;
    }
  }

  const metadata: Metadata = {
    title: product.name,
  };

  if (description) {
    metadata.description = description;
  }

  return metadata;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
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

// This helps Next.js to statically generate all product pages at build time.
export async function generateStaticParams() {
  const products = await getProducts();
 
  return products.map((product) => ({
    slug: product.slug,
  }));
}
