
'use client';

// Simple, framework-agnostic runtime link prefetcher.
//
// MIT License
// Copyright (c) 2024 Google Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function () {
  'use strict';

  const OBSERVER_ROOT_MARGIN = '50%';
  const MUTATION_THROTTLE_MS = 500;

  const prefetched = new Set();
  const stats = { total: 0, queued: 0, saved: 0 };
  window.__prefetchStats = stats;

  let mutationTimeout;
  let maxParallelPrefetches = 6; // Default for 4g/wifi

  function updateMaxParallelPrefetches() {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        maxParallelPrefetches = 0; // Disable prefetching
        return;
      }
      switch (conn.effectiveType) {
        case '2g':
          maxParallelPrefetches = 2;
          break;
        case '3g':
          maxParallelPrefetches = 4;
          break;
        case '4g':
        default:
          maxParallelPrefetches = 6;
          break;
      }
    }
  }

  function prefetchUrl(url, el) {
    if (prefetched.has(url.href) || stats.queued >= maxParallelPrefetches) {
      return;
    }
    if (navigator.connection && navigator.connection.saveData) {
      stats.saved++;
      return;
    }
    
    prefetched.add(url.href);
    stats.queued++;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url.href;
    link.as = 'document';

    link.onload = () => {
        stats.total++;
        stats.queued--;
        requestIdleCallback(() => document.head.removeChild(link));
    };

    link.onerror = () => {
        stats.queued--;
        prefetched.delete(url.href); // Allow retry on error
        requestIdleCallback(() => document.head.removeChild(link));
    };
    
    document.head.appendChild(link);
  }

  function isPrefetchable(el) {
    if (el.tagName !== 'A' || !el.href) return false;
    const url = new URL(el.href, location.href);
    if (location.origin !== url.origin) return false;
    if (url.hash) return false;
    if (el.hasAttribute('noprefetch') || el.hasAttribute('download')) return false;

    // Check for file extensions common for non-HTML content
    const path = url.pathname;
    const fileExtensionRegex = /\.(pdf|zip|rar|tar|gz|mov|avi|mp4|mp3|jpg|jpeg|png|gif|svg|webp|doc|docx|xls|xlsx|ppt|pptx)$/i;
    if (fileExtensionRegex.test(path)) return false;

    return true;
  }

  let intersectionObserver;
  function observe(el) {
    if (!isPrefetchable(el)) return;
    intersectionObserver.observe(el);
  }

  function scanAndObserve() {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(() => {
        document.querySelectorAll('a').forEach(observe);
    }, MUTATION_THROTTLE_MS);
  }

  function initialize() {
    updateMaxParallelPrefetches();
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateMaxParallelPrefetches);
    }
    
    intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.href) {
                requestIdleCallback(() => prefetchUrl(new URL(entry.target.href, location.href), entry.target));
            }
        });
    }, { rootMargin: OBSERVER_ROOT_MARGIN });
    
    const mutationObserver = new MutationObserver(scanAndObserve);
    
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      scanAndObserve();
    };
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      scanAndObserve();
    };
    
    window.addEventListener('popstate', scanAndObserve);
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          mutationObserver.observe(document.body, { childList: true, subtree: true });
          scanAndObserve();
      });
    } else {
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        scanAndObserve();
    }
  }

  initialize();
})();
