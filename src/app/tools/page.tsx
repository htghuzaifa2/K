
'use client';

import { useState, Suspense } from 'react';
import { getTools } from '@/lib/tool-data';
import ToolSearch from './components/ToolSearch';

const ITEMS_PER_PAGE = 20;


function ToolsList() {
  const [allTools] = useState(() => getTools());

  return (
    <ToolSearch allTools={allTools} itemsPerPage={ITEMS_PER_PAGE} />
  );
}

function ToolsPageSkeleton() {
    return (
        <div className="space-y-8">
            <p>Loading...</p>
        </div>
    );
}

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center py-16 border-b">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">The Modern Toolkit</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A curated suite of utilities designed to accelerate your creative workflow.</p>
      </header>
      <main className="py-8">
         <Suspense fallback={<ToolsPageSkeleton />}>
            <ToolsList />
         </Suspense>
      </main>
    </div>
  );
}
