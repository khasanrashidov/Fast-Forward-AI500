import { notFound } from 'next/navigation';
import { CheckCircle, Info, Lightbulb, Sparkles, TrendingUp } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { getGoalById, getGoalRecommendations, getGoalTimeline } from '@/lib/services/goals';
import { getGoalInsights } from '@/lib/services/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TimelineChart } from './timeline-chart';

export const dynamic = 'force-dynamic';

function formatAmount(value: number, currency: string) {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + Math.ceil(months));
  return next;
}

export default async function GoalDetailPage({ params }: { params: Promise<{ goalId: string }> }) {
  const { goalId } = await params;
  const t = await getTranslations('goalDetail');
  const locale = await getLocale();

  if (!goalId || goalId === 'undefined') {
    return (
      <div className="p-4 sm:p-6">
        <Card className="border-destructive/20">
          <CardHeader className="flex items-center gap-2 text-destructive">
            <Info className="h-4 w-4" />
            <CardTitle>{t('goalNotFound')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t('goalNotFoundDescription')}
          </CardContent>
        </Card>
      </div>
    );
  }

  let goal;
  try {
    goal = await getGoalById(goalId);
  } catch (error) {
    console.error(error);
    return (
      <div className="p-4 sm:p-6">
        <Card className="border-destructive/20">
          <CardHeader className="flex items-center gap-2 text-destructive">
            <Info className="h-4 w-4" />
            <CardTitle>{t('failedToLoad')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{t('tryAgain')}</CardContent>
        </Card>
      </div>
    );
  }

  if (!goal) {
    notFound();
  }

  const [insightsResult, recommendationsResult, timelineResult] = await Promise.allSettled([
    getGoalInsights(goalId),
    getGoalRecommendations(goalId),
    getGoalTimeline(goalId),
  ]);

  const insights = insightsResult.status === 'fulfilled' ? insightsResult.value : null;
  const recommendations =
    recommendationsResult.status === 'fulfilled' ? recommendationsResult.value : null;
  const timeline = timelineResult.status === 'fulfilled' ? timelineResult.value : null;

  const percent = goal.target_amount
    ? Math.min(100, Math.max(0, Math.round((goal.current_amount / goal.target_amount) * 100)))
    : 0;

  const remaining = Math.max(goal.target_amount - goal.current_amount, 0);

  const successProbability =
    timeline?.success_probability ??
    timeline?.monte_carlo_results?.success_probability ??
    timeline?.monte_carlo?.success_probability;

  const deterministicMonths =
    timeline?.deterministic_months ??
    timeline?.monte_carlo_results?.deterministic_months ??
    timeline?.monte_carlo?.deterministic_months;

  const predictedMonths =
    deterministicMonths ?? timeline?.monte_carlo_results?.p50 ?? timeline?.monte_carlo?.p50;

  const predictedFinishDate = predictedMonths ? addMonths(new Date(), predictedMonths) : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{goal.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{t('subtitle')}</p>
      </div>

      {/* Progress + AI Insights */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Progress Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="space-y-2 sm:space-y-1 pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              {t('progress')}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge className="bg-primary/12 text-primary border border-primary/20 text-xs">
                {goal.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {goal.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {/* Progress bar section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{t('current')}</span>
                <span className="text-foreground font-medium">
                  {formatAmount(goal.current_amount, goal.currency)}
                </span>
              </div>
              <Progress value={percent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{percent}%</span>
                <span>
                  {t('target')}: {formatAmount(goal.target_amount, goal.currency)}
                </span>
              </div>
            </div>

            {/* Details - stacked on mobile */}
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-2">
                <span className="text-primary font-semibold text-xs sm:text-base">
                  {t('remainingAmount')}
                </span>
                <span className="text-foreground font-medium">
                  {formatAmount(remaining, goal.currency)}
                </span>
              </div>

              {goal.target_date ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-2">
                  <span className="text-primary font-semibold text-xs sm:text-base">
                    {t('targetDate')}
                  </span>
                  <span className="text-foreground">
                    {new Date(goal.target_date).toLocaleDateString(locale)}
                  </span>
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-2">
                <span className="text-primary font-semibold text-xs sm:text-base inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  {t('predictedFinish')}
                </span>
                <span className="text-foreground text-sm sm:text-base">
                  {predictedFinishDate
                    ? `${predictedFinishDate.toLocaleDateString(locale)}${
                        predictedMonths
                          ? ` (${t('inMonths', { months: Math.ceil(predictedMonths) })})`
                          : ''
                      }`
                    : t('notAvailable')}
                </span>
                <span className="text-primary font-semibold text-xs sm:text-base inline-flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  {t('successRate')} {`${successProbability}%`}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-0.5 sm:gap-2">
                <span className="text-primary font-semibold text-xs sm:text-base">
                  {t('created')}
                </span>
                <span className="text-foreground text-sm sm:text-base">
                  {new Date(goal.created_at).toLocaleDateString(locale)}
                </span>
              </div>

              {goal.description ? (
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-primary font-semibold text-xs sm:text-base">
                    {t('descriptionLabel')}
                  </span>
                  <span className="text-foreground text-sm sm:text-base leading-relaxed">
                    {goal.description}
                  </span>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Card */}
        <Card className="bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
          <CardHeader className="flex items-center gap-2 pb-3">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">{t('aiInsights')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {insights?.insights?.length ? (
              insights.insights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-2.5 sm:p-3 text-xs sm:text-sm text-foreground"
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground">{t('noInsights')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline + Recommendations */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Timeline Card */}
        <Card>
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-sm sm:text-lg">{t('timeline')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 text-[11px] sm:text-sm text-muted-foreground px-3 sm:px-6 pb-3 sm:pb-6">
            {/* Stats row - compact on mobile */}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] sm:text-xs">
              {deterministicMonths !== undefined ? (
                <div className="flex items-center gap-1">
                  <span>{t('estimated')}</span>
                  <span className="text-foreground font-medium">{deterministicMonths}mo</span>
                </div>
              ) : null}
              {successProbability !== undefined ? (
                <div className="flex items-center gap-1">
                  <span>{t('success')}</span>
                  <span className="text-foreground font-medium">{successProbability}%</span>
                </div>
              ) : null}
            </div>

            {/* Chart */}
            <div className="w-full overflow-x-auto -mx-1 px-1">
              <div className="min-w-[240px]">
                <TimelineChart timeline={timeline ?? undefined} currency={goal.currency} />
              </div>
            </div>

            {/* AI Interpretation */}
            {timeline?.ai_interpretation || timeline?.interpretation ? (
              <div className="rounded border bg-muted/40 p-2 sm:p-3 text-[10px] sm:text-xs text-foreground leading-relaxed">
                {timeline.ai_interpretation ?? timeline.interpretation}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Recommendations Card */}
        <Card>
          <CardHeader className="flex items-center gap-1.5 sm:gap-2 pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <CardTitle className="text-sm sm:text-lg">
              <span className="hidden sm:inline">{t('agrobankRecommendations')}</span>
              <span className="sm:hidden">{t('recommendations')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
            {recommendations?.recommendations?.length ? (
              recommendations.recommendations.map((rec, idx) => (
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
                        <span className="rounded border border-border/60 px-1.5 py-0.5">
                          {rec.type}
                        </span>
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
                      <span className="font-semibold text-primary">{t('benefit')}</span>{' '}
                      {rec.benefit}
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
      </div>
    </div>
  );
}
