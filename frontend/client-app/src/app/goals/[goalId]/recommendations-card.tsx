import { Lightbulb } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGoalRecommendations } from '@/lib/services/goals';

type Props = {
  goalId: string;
};

export async function RecommendationsCard({ goalId }: Props) {
  const t = await getTranslations('goalDetail');
  const locale = await getLocale();

  let recommendations: Array<{
    product_name: string;
    reason?: string;
    benefit?: string;
    category?: string;
    description?: string;
    link?: string;
    product_id?: string;
    type?: string;
  }> = [];

  try {
    const data = await getGoalRecommendations(goalId, undefined, locale);
    recommendations = data.recommendations ?? [];
  } catch (error) {
    console.error('Failed to load recommendations:', error);
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-1.5 sm:gap-2 pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <CardTitle className="text-sm sm:text-lg">
          <span className="hidden sm:inline">{t('agrobankRecommendations')}</span>
          <span className="sm:hidden">{t('recommendations')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
        {recommendations.length > 0 ? (
          recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="rounded border border-border/70 bg-muted/40 p-2.5 sm:p-3 text-xs sm:text-sm space-y-1.5 sm:space-y-2"
            >
              {/* Product name + ID */}
              <div className="flex items-start justify-between gap-1.5">
                <div className="font-semibold text-foreground text-sm sm:text-base leading-tight">
                  {rec.product_name}
                </div>
                {rec.product_id ? (
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground shrink-0">
                    {rec.product_id}
                  </span>
                ) : null}
              </div>

              {/* Category/Type badges */}
              {(rec.category || rec.type) && (
                <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-muted-foreground">
                  {rec.category ? (
                    <span className="rounded border border-border/60 px-1.5 py-0.5">
                      {rec.category}
                    </span>
                  ) : null}
                  {rec.type ? (
                    <span className="rounded border border-border/60 px-1.5 py-0.5">{rec.type}</span>
                  ) : null}
                </div>
              )}

              {/* Description - hidden on mobile, shown on desktop */}
              {rec.description ? (
                <div className="hidden sm:block text-foreground text-sm leading-relaxed">
                  {rec.description}
                </div>
              ) : null}

              {/* Reason - truncated on mobile */}
              {rec.reason ? (
                <div className="text-muted-foreground text-xs sm:text-xs line-clamp-2 sm:line-clamp-none">
                  <span className="font-semibold text-primary">{t('why')}</span> {rec.reason}
                </div>
              ) : null}

              {/* Benefit - hidden on mobile */}
              {rec.benefit ? (
                <div className="hidden sm:block text-muted-foreground text-xs">
                  <span className="font-semibold text-primary">{t('benefit')}</span> {rec.benefit}
                </div>
              ) : null}

              {/* Link */}
              {rec.link ? (
                <a
                  href={rec.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-primary text-xs sm:text-xs underline underline-offset-2"
                >
                  {t('learnMore')}
                </a>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">{t('noRecommendations')}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function RecommendationsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-1.5 sm:gap-2 pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
        <span className="h-5 w-32 bg-muted-foreground/10 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded border border-border/70 bg-muted/40 p-2.5 sm:p-3 space-y-2"
          >
            <div className="h-4 bg-muted-foreground/10 rounded w-3/4 animate-pulse" />
            <div className="flex gap-1">
              <div className="h-5 w-16 bg-muted-foreground/10 rounded animate-pulse" />
              <div className="h-5 w-12 bg-muted-foreground/10 rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 bg-muted-foreground/10 rounded w-full animate-pulse" />
              <div className="h-3 bg-muted-foreground/10 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

