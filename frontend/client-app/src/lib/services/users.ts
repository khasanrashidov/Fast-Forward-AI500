import { z } from "zod";
import { apiFetch } from "../api";
import { USER_ROLES } from "../enums";
import { DEFAULT_USERNAME } from "../config";

const cardSchema = z.object({
  id: z.string(),
  card_name: z.string(),
  card_number: z.string(),
  balance: z.number(),
  card_type: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  salary: z.number(),
  currency: z.string(),
  age: z.number(),
  family_size: z.number(),
  bio: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  role: z.enum(USER_ROLES),
  cards: z.array(cardSchema),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const userResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: userSchema,
});

const updateUserBodySchema = z.object({
  salary: z.number().optional(),
  age: z.number().optional(),
  family_size: z.number().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export async function getUser(username = DEFAULT_USERNAME): Promise<User> {
  const result = await apiFetch<User>(`/api/users/${username}`, {
    method: "GET",
  });

  const parsed = userResponseSchema.parse(result);
  return parsed.data;
}

export async function updateUser(
  username = DEFAULT_USERNAME,
  payload: UpdateUserBody
): Promise<User> {
  const body = updateUserBodySchema.parse(payload);

  const result = await apiFetch<User>(`/api/users/${username}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const parsed = userResponseSchema.parse(result);
  return parsed.data;
}
