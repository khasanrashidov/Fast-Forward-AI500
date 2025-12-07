'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if the page has already loaded (for client-side navigation)
    if (document.readyState === 'complete') {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsLoading(false), 300);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Listen for the load event
    const handleLoad = () => {
      // Small delay to ensure content is painted
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsLoading(false), 300);
      }, 100);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Don't render anything after loading is complete
  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm animate-pulse">
          <Image
            src="/logo.png"
            alt="Moliyachi"
            fill
            className="object-contain p-2"
            sizes="64px"
            priority
          />
        </div>

        {/* App name */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-outfit font-semibold text-xl text-zinc-900">Moliyachi</span>
          <span className="text-xs text-zinc-500">Loading your financial data...</span>
        </div>

        {/* Loading spinner */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
}

