
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type ScrollRestorerProps = {
  sessionKey: string;
};

export function ScrollRestorer({ sessionKey }: ScrollRestorerProps) {
  const pathname = usePathname();
  const scrollY = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';

    if (isReload) {
      sessionStorage.removeItem(sessionKey);
    } else {
      const storedScrollY = sessionStorage.getItem(sessionKey);
      if (storedScrollY) {
        // Use requestAnimationFrame to ensure the scroll happens after render
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(storedScrollY, 10));
        });
      }
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY;
      if (timeoutRef.current) {
        cancelIdleCallback(timeoutRef.current as unknown as number);
      }
      timeoutRef.current = requestIdleCallback(() => {
        if (pathname === '/') { 
           sessionStorage.setItem(sessionKey, String(scrollY.current));
        }
      }) as unknown as NodeJS.Timeout;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
       if (timeoutRef.current) {
        cancelIdleCallback(timeoutRef.current as unknown as number);
      }
    };
  }, [pathname, sessionKey]);

  return null;
}
