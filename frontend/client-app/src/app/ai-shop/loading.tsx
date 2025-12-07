import { Skeleton } from '@/components/ui/skeleton';

export default function AIShopLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)]">
      {/* Chat messages area - Welcome screen skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
          <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
            {/* Logo skeleton */}
            <Skeleton className="h-16 w-16 rounded-2xl" />

            {/* Title skeleton */}
            <div className="space-y-3 flex flex-col items-center">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-5 w-80" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-56" />
            </div>

            {/* Sample prompts grid skeleton */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg mt-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-4 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>

            {/* Capabilities skeleton */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-40 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky input area skeleton */}
      <div className="border-t border-border bg-background/95">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
          </div>
          <Skeleton className="h-3 w-64 mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
}
