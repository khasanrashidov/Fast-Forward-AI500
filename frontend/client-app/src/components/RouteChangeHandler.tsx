'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cancelAllRequests } from '@/lib/request-manager';

/**
 * Component that cancels all ongoing API requests when the route changes.
 * Must be placed inside a Suspense boundary due to useSearchParams.
 */
export function RouteChangeHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Cancel all ongoing requests when route changes
    return () => {
      cancelAllRequests();
    };
  }, [pathname, searchParams]);

  return null;
}

