import { z } from 'zod';
import { apiFetch } from '../api';
import {
  PARTY_TYPES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_DIRECTIONS,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
} from '../enums';
import { DEFAULT_USERNAME } from '../config';

const partyInfoSchema = z.object({
  type: z.enum(PARTY_TYPES),
  name: z.string().optional(),
  merchant_name: z.string().optional(),
  card_number: z.string().optional(),
});

const transactionSchema = z.object({
  id: z.string(),
  user_id: z.string().optional().nullable(),
  amount: z.number(),
  currency: z.string().optional().nullable(),
  merchant: z.string().optional().nullable(),
  date: z.string(),
  category: z.string(),
  card_id: z.string().optional().nullable(),
  status: z.string(),
  external_id: z.string().optional().nullable(),
  transaction_type: z.string().optional().nullable(),
  transaction_direction: z.string().optional().nullable(),
  fee: z.number().optional().nullable(),
  processed_at: z.string().optional().nullable(),
  sender_info: partyInfoSchema.optional().nullable(),
  receiver_info: partyInfoSchema.optional().nullable(),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
  gateway: z.string().optional().nullable(),
  rrn: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  is_recurring: z.boolean().optional().nullable(),
  created_at: z.string().optional().nullable(),
});

const transactionsResponseSchema = z.object({
  is_success: z.boolean(),
  message: z.string(),
  data: z.array(transactionSchema),
});

export type Transaction = z.infer<typeof transactionSchema>;

export async function getTransactions(username = DEFAULT_USERNAME): Promise<Transaction[]> {
  const result = await apiFetch<unknown>(`/api/transactions/?username=${username}`, {
    method: 'GET',
  });

  const parsed = transactionsResponseSchema.parse(result);
  return parsed.data;
}
