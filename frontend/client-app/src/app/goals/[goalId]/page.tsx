import { notFound } from "next/navigation";
import { Info, Lightbulb, Sparkles, TrendingUp } from "lucide-react";

import { getGoalById, getGoalRecommendations, getGoalTimeline } from "@/lib/services/goals";
import { getGoalInsights } from "@/lib/services/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

function formatAmount(value: number, currency: string) {
  return `${value.toLocaleString("en-US")} ${currency}`;
}

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = await params;

  if (!goalId || goalId === "undefined") {
    return (
      <div className="p-6">
        <Card className="border-destructive/20">
          <CardHeader className="flex items-center gap-2 text-destructive">
            <Info className="h-4 w-4" />
            <CardTitle>Goal not found.</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The goal ID in the URL is missing or invalid.
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
      <div className="p-6">
        <Card className="border-destructive/20">
          <CardHeader className="flex items-center gap-2 text-destructive">
            <Info className="h-4 w-4" />
            <CardTitle>Failed to load goal.</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Please try again shortly.
          </CardContent>
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

  const insights = insightsResult.status === "fulfilled" ? insightsResult.value : null;
  const recommendations =
    recommendationsResult.status === "fulfilled" ? recommendationsResult.value : null;
  const timeline = timelineResult.status === "fulfilled" ? timelineResult.value : null;

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{goal.name}</h1>
        <p className="text-muted-foreground">Goal details, insights, and recommendations.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Progress
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge className="bg-primary/12 text-primary border border-primary/20">
                {goal.status}
              </Badge>
              <Badge variant="outline">{goal.priority} priority</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Current</span>
              <span className="text-foreground font-medium">
                {formatAmount(goal.current_amount, goal.currency)}
              </span>
            </div>
            <Progress value={percent} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{percent}%</span>
              <span>Target: {formatAmount(goal.target_amount, goal.currency)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Remaining</span>
              <span className="text-foreground font-medium">
                {formatAmount(remaining, goal.currency)}
              </span>
            </div>
            {goal.target_date ? (
              <div className="text-xs text-muted-foreground">
                Target date:{" "}
                <span className="text-foreground font-medium">
                  {new Date(goal.target_date).toLocaleDateString()}
                </span>
              </div>
            ) : null}
            {goal.description ? (
              <p className="text-sm text-muted-foreground leading-relaxed">{goal.description}</p>
            ) : null}
            <div className="text-xs text-muted-foreground">
              Created at:{" "}
              <span className="text-foreground font-medium">
                {new Date(goal.created_at).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline (Monte Carlo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {deterministicMonths !== undefined ? (
              <div className="flex items-center justify-between">
                <span>Deterministic months</span>
                <span className="text-foreground font-medium">{deterministicMonths}</span>
              </div>
            ) : null}
            {successProbability !== undefined ? (
              <div className="flex items-center justify-between">
                <span>Success probability</span>
                <span className="text-foreground font-medium">{successProbability}%</span>
              </div>
            ) : null}
            {timeline?.timeline_data?.length ? (
              <div className="rounded-md border bg-muted/40 p-3 space-y-1">
                <div className="text-xs font-medium text-foreground">Sample trajectory</div>
                <div className="text-xs">
                  Month 0: {formatAmount(timeline.timeline_data[0].deterministic, goal.currency)}
                </div>
                {timeline.timeline_data[1] ? (
                  <div className="text-xs">
                    Month {timeline.timeline_data[1].month}:{" "}
                    {formatAmount(timeline.timeline_data[1].deterministic, goal.currency)}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-xs">No timeline data available.</div>
            )}
            {timeline?.ai_interpretation || timeline?.interpretation ? (
              <div className="rounded-md border bg-muted/40 p-3 text-xs text-foreground">
                {timeline.ai_interpretation ?? timeline.interpretation}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {insights?.insights?.length ? (
              insights.insights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-border/70 bg-muted/40 p-3 text-sm text-foreground"
                >
                  {item}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No insights available.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations?.recommendations?.length ? (
              recommendations.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-border/70 bg-muted/40 p-3 text-sm space-y-1"
                >
                  <div className="font-medium text-foreground">{rec.product_name}</div>
                  {rec.reason ? (
                    <div className="text-muted-foreground text-xs">Reason: {rec.reason}</div>
                  ) : null}
                  {rec.benefit ? (
                    <div className="text-muted-foreground text-xs">Benefit: {rec.benefit}</div>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recommendations available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

