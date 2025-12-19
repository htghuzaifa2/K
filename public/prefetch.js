// public/prefetch.js
(function () {
  // 1. Feature Check & Data Saver Check
  if (
    typeof window === 'undefined' ||
    !window.requestIdleCallback ||
    navigator.connection?.saveData ||
    navigator.connection?.effectiveType?.includes('2g')
  ) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          prefetch(entry.target.href);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50%' } // Start prefetching when link is 50% screen away
  );

  const prefetched = new Set();
  const queue = [];
  let active = 0;
  // Dynamic concurrency limit based on connection
  const limit = navigator.connection?.effectiveType === '3g' ? 2 : 6;

  function processQueue() {
    if (active >= limit || queue.length === 0) return;
    const url = queue.shift();
    active++;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.onload = link.onerror = () => {
      active--;
      processQueue();
    };
    document.head.appendChild(link);
  }

  function prefetch(url, priority = false) {
    if (!url || prefetched.has(url) || url.startsWith(location.origin) || url.startsWith('/')) return;
    
    prefetched.add(url);
    priority ? queue.unshift(url) : queue.push(url);
    requestIdleCallback(processQueue);
  }

  // 2. Scan & Attach Listeners
  function scan() {
    requestIdleCallback(() => {
      document.querySelectorAll('a[href^="http"]').forEach((a) => {
        if (prefetched.has(a.href) || a.href.startsWith(location.origin)) return;
        
        // A. Viewport Trigger
        observer.observe(a);
        
        // B. Hover Trigger (Instant Priority)
        a.addEventListener('mouseenter', () => prefetch(a.href, true), { once: true });
      });
    });
  }

  // 3. Lifecycle Hooks (SPA Support)
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  scan();
})();
