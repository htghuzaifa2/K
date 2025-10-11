
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type ScrollRestorerProps = {
  sessionKey: string;
};

export function ScrollRestorer({ sessionKey }: ScrollRestorerProps) {
  const pathname = usePathname();
  const scrollY = useRef<number>(0);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if navigation was a reload
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';

    if (isReload) {
      sessionStorage.removeItem(sessionKey);
    } else if (pathname === '/') {
      const storedScrollY = sessionStorage.getItem(sessionKey);
      if (storedScrollY) {
        window.scrollTo(0, parseInt(storedScrollY, 10));
      }
    }

    const handleScroll = () => {
      // Only save scroll position for the homepage
      if (pathname === '/') {
        scrollY.current = window.scrollY;
        sessionStorage.setItem(sessionKey, String(scrollY.current));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, sessionKey]);

  return null;
}
