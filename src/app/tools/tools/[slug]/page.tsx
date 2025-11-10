

import { getToolBySlug, getTools } from '@/lib/tool-data';
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

  const implementedSlugs = [
      'lorem-ipsum-generator',
      'text-difference-checker',
      'hashtag-generator',
      'random-string-generator',
      'text-statistics-tool',
      'number-to-words-converter',
      'regex-tester',
      'text-scrambler',
      'base-converter',
      'json-prettify-compress-toggle',
  ];
  if (implementedSlugs.includes(tool.slug)) {
      // This is a failsafe. We should not hit this for implemented tools
      // as they should have their own page.tsx.
      // Redirecting or showing a specific component would be better,
      // but for now we just prevent the placeholder from showing.
      notFound();
  }

  // This will now only render for tools that are NOT in the implemented list.
  return (
      <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <article className="prose dark:prose-invert mx-auto max-w-4xl">
                  <Link href="/tools" className="mb-8 inline-block text-primary no-underline hover:underline">&larr; Back to Tools</Link>
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{tool.title}</h1>
                  <p>This tool is under construction and will be available soon!</p>
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

export async function generateStaticParams() {
  const tools = getTools();
  // We only generate static params for tools that DON'T have a dedicated page.tsx
  const unimplementedTools = tools.filter(tool => ![
      'lorem-ipsum-generator',
      'text-difference-checker',
      'hashtag-generator',
      'random-string-generator',
      'text-statistics-tool',
      'number-to-words-converter',
      'regex-tester',
      'text-scrambler',
      'base-converter',
      'json-prettify-compress-toggle',
  ].includes(tool.slug));
  
  return unimplementedTools.map((tool) => ({
    slug: tool.slug,
  }));
}
