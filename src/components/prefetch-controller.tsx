
'use client';

import { useEffect } from 'react';

export function PrefetchController() {
  useEffect(() => {
    // This effect ensures the prefetch script is imported and runs only on the client-side.
    // The import is structured this way to be compatible with Next.js App Router.
    if (typeof window !== 'undefined') {
      import('../lib/prefetch.js');
    }
  }, []);

  return null; // This component does not render anything.
}
