
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Suspense } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { OgTagPreviewer } from '../components/OgTagPreviewer';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('og-tag-previewer');

  if (!tool) {
    return {
      title: `Not Found`,
    };
  }

  return {
    title: tool.title,
    description: 'A free tool to preview how your website will look on social media. Generate and test Open Graph (OG) tags and Twitter Cards in real-time.',
    openGraph: {
        title: tool.title,
        description: `Use the ${tool.title} to simulate social media link previews.`,
        type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('og-tag-previewer');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-6xl">
              <OgTagPreviewer />
          </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientOnlyRelatedProducts />
        </Suspense>
      </div>
    </>
  );
}
