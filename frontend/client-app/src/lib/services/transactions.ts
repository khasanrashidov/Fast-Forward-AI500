import { z } from "zod";
import { apiFetch } from "../api";
import {
  PARTY_TYPES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_DIRECTIONS,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
} from "../enums";
import { DEFAULT_USERNAME } from "../config";

const partyInfoSchema = z.object({
  type: z.enum(PARTY_TYPES),
  name: z.string().optional(),
  merchant_name: z.string().optional(),
  card_number: z.string().optional(),
});

const transactionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  amount: z.number(),
  currency: z.string(),
  merchant: z.string(),
  date: z.string(),
  category: z.enum(TRANSACTION_CATEGORIES),
  card_id: z.string(),
  status: z.enum(TRANSACTION_STATUSES),
  external_id: z.string(),
  transaction_type: z.enum(TRANSACTION_TYPES),
  transaction_direction: z.enum(TRANSACTION_DIRECTIONS),
  fee: z.number(),
  processed_at: z.string(),
  sender_info: partyInfoSchema,
  receiver_info: partyInfoSchema,
  metadata: z.record(z.any()),
  gateway: z.string(),
  rrn: z.string(),
  description: z.string(),
  is_recurring: z.boolean(),
  created_at: z.string(),
});

const transactionsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: z.array(transactionSchema),
});

export type Transaction = z.infer<typeof transactionSchema>;

export async function getTransactions(
  username = DEFAULT_USERNAME
): Promise<Transaction[]> {
  const result = await apiFetch<unknown>(`/api/transactions/?username=${username}`, {
    method: "GET",
  });

  const parsed = transactionsResponseSchema.parse(result);
  return parsed.data;
}

