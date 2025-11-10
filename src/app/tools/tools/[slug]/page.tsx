

import { getToolBySlug, getTools, getDummyToolContent } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

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

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  // Prevent implemented tools from showing placeholder
  if (tool.slug !== 'lorem-ipsum-generator') {
    const toolContent = getDummyToolContent(tool.title);
    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <article className="prose dark:prose-invert mx-auto max-w-4xl">
                    <Link href="/tools" className="mb-8 inline-block text-primary no-underline hover:underline">&larr; Back to Tools</Link>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{tool.title}</h1>
                    <div 
                        dangerouslySetInnerHTML={{ __html: toolContent }} 
                    />
                    <div className="mt-8 p-8 border-2 border-dashed border-border rounded-xl text-center text-muted-foreground">
                        <p>Tool implementation for &quot;{tool.title}&quot; goes here.</p>
                    </div>
                </article>
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

  // This return is specifically for non-implemented tools to avoid trying to render them.
  // The actual implemented tool pages will have their own page.tsx
  // This is a failsafe.
  notFound();
}

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
