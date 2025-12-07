import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`h-3 rounded-md bg-zinc-200 animate-pulse ${className ?? ''}`} />;
}

function StatSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <SkeletonLine className="w-24" />
        <div className="h-4 w-4 rounded-full bg-zinc-200 animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-2">
        <SkeletonLine className="h-6 w-28" />
        <SkeletonLine className="w-32" />
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 rounded-md bg-zinc-200 animate-pulse" />
        <div className="h-4 w-64 rounded-md bg-zinc-200 animate-pulse" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <Card className="w-full lg:basis-[40%]">
              <CardHeader>
                <CardTitle>
                  <SkeletonLine className="w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="h-48 w-48 rounded-full bg-zinc-200 animate-pulse" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <SkeletonLine className="w-32" />
                      <SkeletonLine className="w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20 w-full lg:basis-[35%]">
              <CardHeader className="pb-2">
                <CardTitle>
                  <SkeletonLine className="w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <SkeletonLine key={idx} className="w-full" />
                ))}
              </CardContent>
            </Card>

            <Card className="flex flex-col w-full lg:basis-[25%]">
              <CardHeader className="pb-2">
                <CardTitle>
                  <SkeletonLine className="w-20" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <SkeletonLine key={idx} className="w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 space-y-3">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <SkeletonLine className="w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="space-y-2 rounded-xl border border-zinc-200 p-3">
                  <SkeletonLine className="w-32" />
                  <SkeletonLine className="w-40" />
                  <SkeletonLine className="w-28" />
                </div>
              ))}
              <SkeletonLine className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
