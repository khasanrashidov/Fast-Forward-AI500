import { z } from 'zod';
import { apiFetch } from '../api';
import { DEFAULT_USERNAME } from '../config';

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

// Dashboard data without insights (fast endpoint)
const dashboardDataSchema = z.object({
  summary: summarySchema,
  category_distribution: z.record(z.string(), z.number()),
  previous_month_categories: z.record(z.string(), z.number()),
  alerts: z.array(z.string()),
  health_score: healthScoreSchema,
});

const dashboardResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: dashboardDataSchema,
  errors: z.array(z.string()).optional().nullable(),
});

// Dashboard insights (LLM-based, separate endpoint)
const dashboardInsightsSchema = z.object({
  insights: z.array(z.string()),
});

const dashboardInsightsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: dashboardInsightsSchema,
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
export type DashboardInsights = z.infer<typeof dashboardInsightsSchema>;
export type DashboardGoalInsights = z.infer<typeof goalInsightsSchema>;

/**
 * Get dashboard data (fast, no LLM)
 * Returns summary, category distribution, alerts, and health score.
 */
export async function getDashboard(username = DEFAULT_USERNAME): Promise<DashboardData> {
  const result = await apiFetch<unknown>(`/api/dashboard/?username=${username}`, {
    method: 'GET',
  });

  const parsed = dashboardResponseSchema.parse(result);
  return parsed.data;
}

/**
 * Get dashboard insights (LLM-based, may take a few seconds)
 * Returns AI-generated financial insights based on spending patterns.
 */
export async function getDashboardInsights(
  username = DEFAULT_USERNAME,
  language = 'en'
): Promise<DashboardInsights> {
  const result = await apiFetch<unknown>(
    `/api/dashboard/insights?username=${username}&language=${language}`,
    {
      method: 'GET',
    }
  );

  const parsed = dashboardInsightsResponseSchema.parse(result);
  return parsed.data;
}

/**
 * Get goal insights (LLM-based, may take a few seconds)
 */
export async function getGoalInsights(goalId: string, language = 'en'): Promise<DashboardGoalInsights> {
  const result = await apiFetch<unknown>(
    `/api/dashboard/goal-insights/${goalId}?language=${language}`,
    {
      method: 'GET',
    }
  );

  const parsed = goalInsightsResponseSchema.parse(result);
  return parsed.data;
}
