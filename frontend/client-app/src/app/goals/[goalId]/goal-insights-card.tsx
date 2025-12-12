import { Sparkles } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGoalInsights } from '@/lib/services/dashboard';

type Props = {
  goalId: string;
};

export async function GoalInsightsCard({ goalId }: Props) {
  const t = await getTranslations('goalDetail');
  const locale = await getLocale();

  let insights: string[] = [];

  try {
    const data = await getGoalInsights(goalId, locale);
    insights = data.insights ?? [];
  } catch (error) {
    console.error('Failed to load goal insights:', error);
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
      <CardHeader className="flex items-center gap-2 pb-3">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <CardTitle className="text-base sm:text-lg">{t('aiInsights')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {insights.length > 0 ? (
          insights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-2.5 sm:p-3 text-xs sm:text-base text-foreground" // font 16px should be added here
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">{t('noInsights')}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function GoalInsightsCardSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
      <CardHeader className="flex items-center gap-2 pb-3">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
        <span className="h-5 w-24 bg-primary/10 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-2.5 sm:p-3"
          >
            <div className="space-y-2">
              <div className="h-3 bg-primary/10 rounded w-full animate-pulse" />
              <div className="h-3 bg-primary/10 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
