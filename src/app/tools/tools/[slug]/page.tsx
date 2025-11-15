'use client';

import { getToolBySlug } from '@/lib/tool-data';
import { notFound, useParams }from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Tool } from '@/lib/tool-data';
import Loading from './loading';

export const runtime = 'edge';

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundTool = getToolBySlug(slug);
      if (foundTool) {
        setTool(foundTool);
         document.title = `${foundTool.title} | ${APP_NAME}`;
      } else {
        notFound();
      }
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
      return <Loading />;
  }

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
      notFound();
  }

  return (
      <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <article className="prose dark:prose-invert mx-auto max-w-4xl">
                  <Link href="/tools" className="mb-8 inline-block text-primary no-underline hover:underline">&larr; Back to Tools</Link>
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{tool.title}</h1>
                  <p>This tool is under construction and will be available soon!</p>
              </article>
          </div>
      </>
    );
}
