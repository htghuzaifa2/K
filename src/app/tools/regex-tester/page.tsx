
import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Suspense } from 'react';
import { RelatedProducts } from '@/components/product/related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('regex-tester');

  if (!tool) {
    return {
      title: `Not Found - ${APP_NAME}`,
    };
  }

  return {
    title: `${tool.title} - ${APP_NAME}`,
    description: `Use the ${tool.title} tool.`,
    openGraph: {
        title: tool.title,
        description: `Use the ${tool.title} tool.`,
        type: 'website',
    }
  };
}

export default function ToolPage() {
  const tool = getToolBySlug('regex-tester');

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-3xl font-bold font-headline mb-4">{tool.title}</h1>
            <p className="text-muted-foreground mb-8">This tool is coming soon!</p>
             <Link href="/tools" className="text-primary hover:underline">&larr; Back to Tools</Link>
          </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Suspense fallback={<ProductGridSkeleton />}>
          <RelatedProducts currentProductId={''} />
        </Suspense>
      </div>
    </>
  );
}
