import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { ProductDetailsClient } from '@/components/product/product-details-client';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';


type ProductPageProps = {
  params: {
    slug: string;
  };
};

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
        <Suspense fallback={<p>Loading related products...</p>}>
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Not Found',
      description: `This product could not be found on ${APP_NAME}.`,
    };
  }

  const url = `https://www.${APP_NAME}/products/${product.slug}`;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: url,
      type: 'article',
      images: [
        {
          url: product.images[0].url,
          width: 800,
          height: 600,
          alt: product.images[0].altText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0].url],
    },
  };
}
