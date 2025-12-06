import { z } from "zod";
import { apiFetch } from "../api";
import { CARD_TYPES } from "../enums";
import { DEFAULT_USERNAME } from "../config";

const cardSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  card_name: z.string(),
  card_number: z.string(),
  balance: z.number(),
  currency: z.string(),
  card_type: z.enum(CARD_TYPES),
  expiration_date: z.string(),
  is_removed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Base response shape per API docs; we also allow legacy shapes with `card`/`cards`.
const listCardsResponseSchema = z.union([
  z.object({
    is_success: z.boolean(),
    message: z.string(),
    data: z.array(cardSchema),
    errors: z.array(z.string()).optional().nullable(),
  }),
  z.object({
    cards: z.array(cardSchema),
  }),
]);

const singleCardResponseSchema = z.union([
  z.object({
    is_success: z.boolean(),
    message: z.string(),
    data: cardSchema,
    errors: z.array(z.string()).optional().nullable(),
  }),
  z.object({
    card: cardSchema,
  }),
]);

const createCardBodySchema = z.object({
  username: z.string().default(DEFAULT_USERNAME),
  card_name: z.string(),
  card_number: z.string(),
  balance: z.number(),
  currency: z.string(),
  card_type: z.string(),
  expiration_date: z.string(),
});

export type Card = z.infer<typeof cardSchema>;
export type CreateCardBody = z.infer<typeof createCardBodySchema>;

export async function getCards(username = DEFAULT_USERNAME): Promise<Card[]> {
  const result = await apiFetch<unknown>(`/api/cards/?username=${username}`, {
    method: "GET",
  });

  const parsed = listCardsResponseSchema.parse(result);
  if ("data" in parsed) return parsed.data;
  return parsed.cards;
}

export async function getCardById(cardId: string): Promise<Card> {
  const result = await apiFetch<unknown>(`/api/cards/${cardId}`, {
    method: "GET",
  });

  const parsed = singleCardResponseSchema.parse(result);
  if ("data" in parsed) return parsed.data;
  return parsed.card;
}

export async function createCard(payload: CreateCardBody): Promise<Card> {
  const body = createCardBodySchema.parse(payload);

  const result = await apiFetch<unknown>("/api/cards/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const parsed = singleCardResponseSchema.parse(result);
  if ("data" in parsed) return parsed.data;
  return parsed.card;
}
