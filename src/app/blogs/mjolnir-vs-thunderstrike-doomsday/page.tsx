
'use client';

import { getBlogPostBySlug } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import { BlogPostClientPage } from '../[slug]/client-page';
import { Separator } from '@/components/ui/separator';
import { Suspense, useEffect, useState } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import type { BlogPostWithContent } from '@/lib/blog-data';
import Loading from '../[slug]/loading';

export const runtime = 'edge';

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPostWithContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const slug = 'mjolnir-vs-thunderstrike-doomsday';

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        document.title = foundPost.title;
      } else {
        notFound();
      }
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return <Loading />;
  }

  if (!post) {
    return notFound();
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
