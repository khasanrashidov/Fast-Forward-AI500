import { Sparkles } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardInsights } from '@/lib/services/dashboard';
import { DEFAULT_USERNAME } from '@/lib/config';

export async function AIInsightsCard() {
  const t = await getTranslations('dashboard');
  const locale = await getLocale();

  let insights: string[] = [];

  try {
    const data = await getDashboardInsights(DEFAULT_USERNAME, locale);
    insights = data.insights ?? [];
  } catch (error) {
    console.error('Failed to load dashboard insights:', error);
  }

  return (
    <Card className="flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20 w-full lg:basis-[35%]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--primary)]" />
          {t('aiInsights')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-sm text-zinc-500">{t('noInsights')}</p>
        ) : (
          insights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-3 text-sm text-foreground"
            >
              {item}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export function AIInsightsCardSkeleton() {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20 w-full lg:basis-[35%]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--primary)] animate-pulse" />
          <span className="h-5 w-24 bg-primary/10 rounded animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-3"
          >
            <div className="space-y-2">
              <div className="h-4 bg-primary/10 rounded w-full animate-pulse" />
              <div className="h-4 bg-primary/10 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

