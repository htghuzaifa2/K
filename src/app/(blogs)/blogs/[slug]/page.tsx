
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import { BlogPostClientPage } from './client-page';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostClientPage post={post} />
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientOnlyRelatedProducts />
        </Suspense>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: `This page could not be found on ${APP_NAME}.`,
    };
  }

  const url = `https://www.${APP_NAME}/blogs/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
    },
  };
}
