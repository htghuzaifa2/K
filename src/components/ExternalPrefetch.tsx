"use client";

import { useEffect } from "react";

export default function ExternalPrefetch() {
  useEffect(() => {
    // Delays script execution until the main page is interactive (TTI)
    const script = document.createElement("script");
    script.src = "/prefetch.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
