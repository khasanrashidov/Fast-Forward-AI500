import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({ title, description, onRetry, retryLabel = 'Try again' }: ErrorStateProps) {
  return (
    <Card className="border-amber-200/60 bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-rose-50/30 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-rose-950/10 dark:border-amber-800/30">
      <CardContent className="flex flex-col items-center justify-center py-10 px-6 text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50">
          <AlertTriangle className="h-7 w-7 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-amber-900 dark:text-amber-100">{title}</h3>
          {description && (
            <p className="text-sm text-amber-700/80 dark:text-amber-300/70 max-w-sm">{description}</p>
          )}
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 gap-2 border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30"
          >
            <RefreshCw className="h-4 w-4" />
            {retryLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

