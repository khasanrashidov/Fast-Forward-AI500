export const CARD_TYPES = ['Uzcard', 'Humo', 'Visa', 'Mastercard'] as const;
export type CardType = (typeof CARD_TYPES)[number];

export const GOAL_PRIORITIES = ['Low', 'Medium', 'High'] as const;
export type GoalPriority = (typeof GOAL_PRIORITIES)[number];

export const GOAL_STATUSES = ['Active', 'Achieved', 'Cancelled'] as const;
export type GoalStatus = (typeof GOAL_STATUSES)[number];

export const PARTY_TYPES = ['CARD', 'WALLET', 'MERCHANT', 'BANK_ACCOUNT'] as const;
export type PartyType = (typeof PARTY_TYPES)[number];

export const TRANSACTION_CATEGORIES = [
  'Food',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Services',
  'Housing',
  'Utilities',
  'Education',
  'Gifts & Donations',
  'Insurance',
  'Income',
  'Transfer',
  'Other',
] as const;
export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export const TRANSACTION_DIRECTIONS = ['OUTGOING', 'INCOMING'] as const;
export type TransactionDirection = (typeof TRANSACTION_DIRECTIONS)[number];

export const TRANSACTION_STATUSES = [
  'APPROVED',
  'DECLINED',
  'PENDING',
  'CANCELED',
  'VOIDED',
  'SETTLED',
  'REFUNDED',
  'SUCCESS',
] as const;
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];

export const TRANSACTION_TYPES = [
  'P2P_TRANSFER',
  'P2M_PAYMENT',
  'WALLET_TOPUP',
  'WALLET_PAYOUT',
  'REFUND',
  'REVERSAL',
  'ATM_WITHDRAWAL',
] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const USER_ROLES = ['Client', 'Admin', 'Super Admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

// currency UZS and USD are supported
export const CURRENCIES = ['UZS', 'USD'] as const;
export type Currency = (typeof CURRENCIES)[number];
