import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

import { getGoalById, getGoalTimeline } from '@/lib/services/goals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TimelineChart } from './timeline-chart';
import { ErrorState } from '@/components/ui/error-state';
import { GoalInsightsCard, GoalInsightsCardSkeleton } from './goal-insights-card';
import { TimelineInterpretation, TimelineInterpretationSkeleton } from './timeline-interpretation';
import { RecommendationsCard, RecommendationsCardSkeleton } from './recommendations-card';

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
        <ErrorState title={t('goalNotFound')} description={t('goalNotFoundDescription')} />
      </div>
    );
  }

  // Fetch goal and timeline in parallel (both are fast, no LLM)
  let goal;
  let timeline = null;

  try {
    const [goalResult, timelineResult] = await Promise.allSettled([
      getGoalById(goalId),
      getGoalTimeline(goalId),
    ]);

    if (goalResult.status === 'rejected') {
      console.error('Failed to load goal:', goalResult.reason);
      return (
        <div className="p-4 sm:p-6">
          <ErrorState title={t('failedToLoad')} description={t('tryAgain')} />
        </div>
      );
    }

    goal = goalResult.value;
    timeline = timelineResult.status === 'fulfilled' ? timelineResult.value : null;

    if (timelineResult.status === 'rejected') {
      console.error('Failed to load timeline:', timelineResult.reason);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return (
      <div className="p-4 sm:p-6">
        <ErrorState title={t('failedToLoad')} description={t('tryAgain')} />
      </div>
    );
  }

  if (!goal) {
    notFound();
  }

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

        {/* AI Insights Card - LLM-based, loads separately */}
        <Suspense fallback={<GoalInsightsCardSkeleton />}>
          <GoalInsightsCard goalId={goalId} />
        </Suspense>
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
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[14px] sm:text-[14px]">
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

            {/* AI Interpretation - LLM-based, loads separately (above chart) */}
            <Suspense fallback={<TimelineInterpretationSkeleton />}>
              <TimelineInterpretation goalId={goalId} />
            </Suspense>

            {/* Chart */}
            <div className="w-full overflow-x-auto -mx-1 px-1">
              <div className="min-w-[240px]">
                <TimelineChart timeline={timeline ?? undefined} currency={goal.currency} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Card - LLM-based, loads separately */}
        <Suspense fallback={<RecommendationsCardSkeleton />}>
          <RecommendationsCard goalId={goalId} />
        </Suspense>
      </div>
    </div>
  );
}
