import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboard } from '@/lib/services/dashboard';

export async function AlertsCard() {
  const t = await getTranslations('dashboard');

  let alerts: string[] = [];
  try {
    const data = await getDashboard();
    alerts = data.alerts ?? [];
  } catch {
    // Silently fail, show empty state
  }

  return (
    <Card className="flex flex-col w-full lg:basis-[25%]">
      <CardHeader className="flex items-center gap-2 pb-2">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <CardTitle>{t('alerts')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-sm text-zinc-500">
            <div className="h-50 w-50">
              <img
                src="/done-checking.svg"
                alt={t('noAlerts')}
                className="h-full w-full object-contain"
              />
            </div>
            <p>{t('noAlerts')}</p>
          </div>
        ) : (
          alerts.map((alert, idx) => (
            <div key={idx} className="text-sm text-zinc-700 dark:text-zinc-200">
              {alert}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function AlertsCardSkeleton() {
  return (
    <Card className="flex flex-col w-full lg:basis-[25%]">
      <CardHeader className="flex items-center gap-2 pb-2">
        <div className="h-4 w-4 bg-muted rounded animate-pulse" />
        <div className="h-5 w-16 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-24 w-full bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

