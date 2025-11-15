
'use client';

import { getToolBySlug } from '@/lib/tool-data';
import { notFound } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { ClientOnlyRelatedProducts } from '@/components/product/client-only-related-products';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Separator } from '@/components/ui/separator';
import { PkrCurrencyConverter } from '../components/PkrCurrencyConverter';
import { APP_NAME } from '@/lib/constants';

export const runtime = 'edge';

export default function ToolPage() {
  const tool = getToolBySlug('pkr-currency-converter');

  useEffect(() => {
    if (tool) {
      document.title = `${tool.title} | ${APP_NAME}`;
    }
  }, [tool]);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-full max-w-2xl">
              <PkrCurrencyConverter />
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
