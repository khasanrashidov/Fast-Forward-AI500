import { z } from "zod";
import { apiFetch } from "../api";
import { DEFAULT_USERNAME } from "../config";
import { GOAL_PRIORITIES, GOAL_STATUSES } from "../enums";

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

const createGoalBodySchema = z.object({
  user_id: z.string(),
  name: z.string(),
  target_amount: z.number(),
  current_amount: z.number().default(0),
  currency: z.string().default("UZS"),
  target_date: z.string().optional(),
  status: z.enum(GOAL_STATUSES).default("Active"),
  priority: z.enum(GOAL_PRIORITIES).default("Medium"),
  description: z.string().optional().nullable(),
});

const updateGoalBodySchema = z.object({
  goal_id: z.string(),
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

export async function getGoals(username = DEFAULT_USERNAME): Promise<Goal[]> {
  const result = await apiFetch<unknown>(`/api/goals/?username=${username}`, {
    method: "GET",
  });

  const parsed = goalsResponseSchema.parse(result);
  return parsed.data;
}

export async function createGoal(payload: CreateGoalBody): Promise<Goal> {
  const body = createGoalBodySchema.parse(payload);

  const result = await apiFetch<unknown>("/api/goals/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const parsed = goalResponseSchema.parse(result);
  return parsed.data;
}

export async function updateGoal(payload: UpdateGoalBody): Promise<Goal> {
  const body = updateGoalBodySchema.parse(payload);

  const result = await apiFetch<unknown>("/api/goals/", {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const parsed = goalResponseSchema.parse(result);
  return parsed.data;
}
