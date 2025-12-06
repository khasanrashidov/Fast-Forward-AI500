import { z } from "zod";
import { apiFetch } from "../api";
import { DEFAULT_USERNAME } from "../config";

const summarySchema = z.object({
  total_income: z.number(),
  total_spending: z.number(),
  savings_potential: z.number(),
  previous_month_spending: z.number(),
  spending_change_percent: z.number(),
});

const healthScoreSchema = z.object({
  score: z.number(),
  status: z.string(),
  color: z.string(),
});

const dashboardDataSchema = z.object({
  summary: summarySchema,
  category_distribution: z.record(z.string(), z.number()),
  previous_month_categories: z.record(z.string(), z.number()),
  insights: z.array(z.string()),
  alerts: z.array(z.string()),
  health_score: healthScoreSchema,
});

const dashboardResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: dashboardDataSchema,
  errors: z.array(z.string()).optional().nullable(),
});

const goalInsightsSchema = z.object({
  insights: z.array(z.string()),
});

const goalInsightsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: goalInsightsSchema,
  errors: z.array(z.string()).optional().nullable(),
});

export type DashboardData = z.infer<typeof dashboardDataSchema>;
export type DashboardGoalInsights = z.infer<typeof goalInsightsSchema>;

export async function getDashboard(
  username = DEFAULT_USERNAME
): Promise<DashboardData> {
  const result = await apiFetch<unknown>(
    `/api/dashboard/?username=${username}`,
    {
      method: "GET",
    }
  );

  const parsed = dashboardResponseSchema.parse(result);
  return parsed.data;
}

export async function getGoalInsights(
  goalId: string
): Promise<DashboardGoalInsights> {
  const result = await apiFetch<unknown>(
    `/api/dashboard/goal-insights/${goalId}`,
    {
      method: "GET",
    }
  );

  const parsed = goalInsightsResponseSchema.parse(result);
  return parsed.data;
}
