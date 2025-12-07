import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ShowcaseLoading() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section skeleton */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/15 border border-primary/20 p-8 md:p-12">
        <div className="max-w-3xl space-y-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-5 w-3/4 max-w-lg" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-36 rounded-md" />
            <Skeleton className="h-11 w-40 rounded-md" />
          </div>
        </div>
      </div>

      {/* Features Section header skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-7 w-24" />
        </div>
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Features grid skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-6 w-36" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section skeleton */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

