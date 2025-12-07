import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function InsightsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* All three cards in one row */}
      <div className="grid gap-4 md:grid-cols-12">
        {/* Financial Health Card skeleton - 3 cols */}
        <Card className="md:col-span-3 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-28" />
            </CardTitle>
            <Skeleton className="h-5 w-20 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-9 w-28" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Card skeleton - 6 cols */}
        <Card className="md:col-span-6 flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-6 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-md border border-primary/25 bg-white/80 p-3"
              >
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts Card skeleton - 3 cols */}
        <Card className="md:col-span-3 flex flex-col">
          <CardHeader className="flex items-center gap-2 pb-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="space-y-2 flex-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Shop Assistant promo card skeleton */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
