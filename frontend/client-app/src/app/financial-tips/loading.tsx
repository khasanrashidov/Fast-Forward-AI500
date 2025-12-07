import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FinancialTipsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Tips grid skeleton */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Card
            key={idx}
            className="border border-primary/15 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              {idx % 3 === 0 && (
                <div className="rounded-md border border-primary/20 bg-white/70 px-3 py-2">
                  <Skeleton className="h-4 w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
