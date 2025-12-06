import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-200/70 dark:bg-zinc-700/60", className)}
      {...props}
    />
  );
}

export { Skeleton };

