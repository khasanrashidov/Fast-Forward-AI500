import { z } from 'zod';
import { apiFetch } from '../api';
import { DEFAULT_USERNAME } from '../config';
import { GOAL_PRIORITIES, GOAL_STATUSES } from '../enums';

const goalSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  target_amount: z.number(),
  current_amount: z.number(),
  currency: z.string(),
  target_date: z.string(),
  status: z.enum(GOAL_STATUSES),
  priority: z.enum(GOAL_PRIORITIES),
  description: z.string().optional().nullable(),
  created_at: z.string(),
  progress_percentage: z.number().optional(),
  estimated_months: z.number().optional(),
});

const goalsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: z.array(goalSchema),
  errors: z.array(z.string()).optional().nullable(),
});

const goalResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: goalSchema,
  errors: z.array(z.string()).optional().nullable(),
});

const singleGoalResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: goalSchema.extend({
    created_at: z.string(),
  }),
  errors: z.array(z.string()).optional().nullable(),
});

const monteCarloResultSchema = z.object({
  p10: z.number(),
  p50: z.number(),
  p90: z.number(),
  deterministic_months: z.number().optional(),
  success_probability: z.number().optional(),
});

const timelineDataPointSchema = z.object({
  month: z.number(),
  deterministic: z.number(),
  p10_optimistic: z.number(),
  p50_median: z.number(),
  p90_pessimistic: z.number(),
});

const goalTimelineSchema = z.object({
  goal: z
    .object({
      name: z.string(),
      target_amount: z.number(),
      current_amount: z.number(),
      remaining_amount: z.number(),
      currency: z.string(),
    })
    .optional(),
  financial_summary: z
    .object({
      income: z.number(),
      monthly_spending: z.number(),
      real_contribution: z.number(),
    })
    .optional(),
  monte_carlo_results: monteCarloResultSchema.optional(),
  // Some responses use `monte_carlo` instead of `monte_carlo_results`.
  monte_carlo: monteCarloResultSchema.optional(),
  deterministic_months: z.number().optional(),
  success_probability: z.number().optional(),
  real_monthly_contribution: z.number().optional(),
  ai_interpretation: z.string().optional(),
  interpretation: z.string().optional(),
  timeline_data: z.array(timelineDataPointSchema),
});

const goalTimelineResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: goalTimelineSchema,
  errors: z.array(z.string()).optional().nullable(),
});

const goalRecommendationsSchema = z.object({
  recommendations: z.array(
    z.object({
      product_name: z.string(),
      reason: z.string().optional(),
      benefit: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      link: z.string().optional(),
      product_id: z.string().optional(),
      type: z.string().optional(),
    })
  ),
});

const goalRecommendationsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: goalRecommendationsSchema,
  errors: z.array(z.string()).optional().nullable(),
});

const createGoalBodySchema = z.object({
  user_id: z.string(),
  name: z.string(),
  target_amount: z.number(),
  current_amount: z.number().default(0),
  currency: z.string().default('UZS'),
  target_date: z.string().optional(),
  status: z.enum(GOAL_STATUSES).default('Active'),
  priority: z.enum(GOAL_PRIORITIES).default('Medium'),
  description: z.string().optional().nullable(),
});

const updateGoalBodySchema = z.object({
  goal_id: z.string(),
  user_id: z.string(),
  name: z.string().optional(),
  target_amount: z.number().optional(),
  current_amount: z.number().optional(),
  currency: z.string().optional(),
  target_date: z.string().optional(),
  status: z.enum(GOAL_STATUSES).optional(),
  priority: z.enum(GOAL_PRIORITIES).optional(),
  description: z.string().optional(),
});

export type Goal = z.infer<typeof goalSchema>;
export type CreateGoalBody = z.infer<typeof createGoalBodySchema>;
export type UpdateGoalBody = z.infer<typeof updateGoalBodySchema>;
export type GoalTimeline = z.infer<typeof goalTimelineSchema>;
export type GoalRecommendations = z.infer<typeof goalRecommendationsSchema>;
export type SingleGoal = z.infer<typeof goalSchema>;

export async function getGoals(username = DEFAULT_USERNAME): Promise<Goal[]> {
  const result = await apiFetch<unknown>(`/api/goals/?username=${username}`, {
    method: 'GET',
  });

  const parsed = goalsResponseSchema.parse(result);
  return parsed.data;
}

export async function getGoalById(
  goalId: string,
  username = DEFAULT_USERNAME
): Promise<SingleGoal> {
  const result = await apiFetch<unknown>(`/api/goals/${goalId}?username=${username}`, {
    method: 'GET',
  });

  const parsed = singleGoalResponseSchema.parse(result);
  return parsed.data;
}

export async function createGoal(payload: CreateGoalBody): Promise<Goal> {
  const body = createGoalBodySchema.parse(payload);

  const result = await apiFetch<unknown>('/api/goals/', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const parsed = goalResponseSchema.parse(result);
  return parsed.data;
}

export async function getGoalTimeline(
  goalId: string,
  username = DEFAULT_USERNAME
): Promise<GoalTimeline> {
  const result = await apiFetch<unknown>(`/api/goals/${goalId}/timeline?username=${username}`, {
    method: 'GET',
  });

  const parsed = goalTimelineResponseSchema.parse(result);
  return parsed.data;
}

export async function getGoalRecommendations(
  goalId: string,
  username = DEFAULT_USERNAME
): Promise<GoalRecommendations> {
  const result = await apiFetch<unknown>(
    `/api/goals/${goalId}/recommendations?username=${username}`,
    {
      method: 'GET',
    }
  );

  const parsed = goalRecommendationsResponseSchema.parse(result);
  return parsed.data;
}

export async function updateGoal(payload: UpdateGoalBody): Promise<Goal> {
  const body = updateGoalBodySchema.parse(payload);

  const result = await apiFetch<unknown>('/api/goals/', {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  const parsed = goalResponseSchema.parse(result);
  return parsed.data;
}
