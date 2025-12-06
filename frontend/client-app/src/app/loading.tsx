import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SkeletonLine({ className }: { className?: string }) {
  return <div className={`h-3 rounded-md bg-zinc-200 animate-pulse ${className ?? ""}`} />;
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
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <CardTitle>
              <SkeletonLine className="w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <SkeletonLine className="w-48" />
                <SkeletonLine className="w-32" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="col-span-12 lg:col-span-6 grid gap-4">
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>
                <SkeletonLine className="w-28" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonLine key={idx} className="w-full" />
              ))}
            </CardContent>
          </Card>

          <Card className="flex flex-col">
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
    </div>
  );
}

