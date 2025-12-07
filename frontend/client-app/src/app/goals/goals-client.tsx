'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { Flag, Plus, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Goal, createGoal, updateGoal } from '@/lib/services/goals';
import { CURRENCIES, GOAL_PRIORITIES, type Currency } from '@/lib/enums';
import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  initialGoals: Goal[];
  userId: string;
};

type GoalTone = {
  badgeClass: string;
  ringClass: string;
};

const STATUS_TONES: Record<Goal['status'], GoalTone> = {
  Active: {
    badgeClass: 'bg-primary/15 text-primary border border-primary/20',
    ringClass: 'ring-1 ring-primary/30',
  },
  Achieved: {
    badgeClass: 'bg-primary/12 text-primary border border-primary/25',
    ringClass: 'ring-1 ring-primary/25',
  },
  Cancelled: {
    badgeClass: 'bg-destructive/10 text-destructive border border-destructive/20',
    ringClass: 'ring-1 ring-destructive/25',
  },
};

const PRIORITY_TONES: Record<Goal['priority'], GoalTone> = {
  Low: {
    badgeClass: 'bg-muted text-muted-foreground border border-border',
    ringClass: 'ring-1 ring-muted/30',
  },
  Medium: {
    badgeClass: 'bg-secondary text-secondary-foreground border border-secondary/40',
    ringClass: 'ring-1 ring-secondary/30',
  },
  High: {
    badgeClass: 'bg-primary text-primary-foreground',
    ringClass: 'ring-1 ring-primary/35',
  },
};

const createGoalSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    target_amount: z
      .string()
      .min(1, t('targetAmountRequired'))
      .transform((val) => Number(val.replace(/,/g, '')))
      .refine((val) => Number.isFinite(val) && val > 0, t('enterValidAmount')),
    currency: z.enum(CURRENCIES),
    priority: z.enum(GOAL_PRIORITIES),
    target_date: z.string().optional(),
    description: z.string().optional(),
  });

const addFundsSchema = (t: (key: string) => string) =>
  z.object({
    amount: z
      .string()
      .min(1, t('amountRequired'))
      .transform((val) => Number(val.replace(/,/g, '')))
      .refine((val) => Number.isFinite(val) && val > 0, t('enterValidAmount')),
  });

function formatAmount(value: number, currency: string) {
  return `${value.toLocaleString('en-US')} ${currency}`;
}

const formatNumberInput = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  const number = Number(digits);
  if (Number.isNaN(number)) return '';
  return number.toLocaleString('en-US');
};

function goalPercent(goal: Goal) {
  if (!goal.target_amount) return 0;
  return Math.min(100, Math.max(0, Math.round((goal.current_amount / goal.target_amount) * 100)));
}

export function GoalsClient({ initialGoals, userId }: Props) {
  const t = useTranslations('goals');
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [createOpen, setCreateOpen] = useState(false);
  const [fundsOpenFor, setFundsOpenFor] = useState<Goal | null>(null);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [fundsSubmitting, setFundsSubmitting] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: '',
    target_amount: '',
    currency: 'UZS' as Currency,
    priority: 'Medium' as Goal['priority'],
    target_date: '',
    description: '',
  });

  const [fundsForm, setFundsForm] = useState({ amount: '' });

  const hasGoals = goals.length > 0;

  const statusTone = (status: Goal['status']) => STATUS_TONES[status] ?? STATUS_TONES.Active;
  const priorityTone = (priority: Goal['priority']) =>
    PRIORITY_TONES[priority] ?? PRIORITY_TONES.Medium;

  const handleCreateGoal = async () => {
    const parsed = createGoalSchema(t).safeParse(createForm);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? t('invalidForm');
      toast.error(message);
      return;
    }

    setCreateSubmitting(true);
    try {
      const payload = {
        user_id: userId,
        name: parsed.data.name,
        target_amount: parsed.data.target_amount,
        current_amount: 0,
        currency: parsed.data.currency,
        status: 'Active' as Goal['status'],
        priority: parsed.data.priority,
        target_date: parsed.data.target_date || undefined,
        description: parsed.data.description || undefined,
      };

      const created = await createGoal(payload);
      setGoals((prev) => [created, ...prev]);
      toast.success(t('goalCreated'));
      setCreateForm({
        name: '',
        target_amount: '',
        currency: 'UZS',
        priority: 'Medium',
        target_date: '',
        description: '',
      });
      setCreateOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t('failedToCreate'));
    } finally {
      setCreateSubmitting(false);
    }
  };

  const handleAddFunds = async () => {
    if (!fundsOpenFor) return;

    const parsed = addFundsSchema(t).safeParse(fundsForm);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? t('invalidAmount');
      toast.error(message);
      return;
    }

    setFundsSubmitting(true);
    try {
      const newAmount = fundsOpenFor.current_amount + parsed.data.amount;
      const updated = await updateGoal({
        goal_id: fundsOpenFor.id,
        user_id: userId,
        name: fundsOpenFor.name,
        target_amount: fundsOpenFor.target_amount,
        current_amount: newAmount,
        currency: fundsOpenFor.currency,
        priority: fundsOpenFor.priority,
        status: fundsOpenFor.status,
        target_date: fundsOpenFor.target_date,
        description: fundsOpenFor.description ?? undefined,
      });

      setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      toast.success(t('fundsAdded'));
      setFundsForm({ amount: '' });
      setFundsOpenFor(null);
    } catch (error) {
      console.error(error);
      toast.error(t('failedToAddFunds'));
    } finally {
      setFundsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              {t('addGoal')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createGoal')}</DialogTitle>
              <DialogDescription>{t('createGoalDescription')}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">{t('name')}</Label>
                <Input
                  id="goal-name"
                  placeholder={t('namePlaceholder')}
                  value={createForm.name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">{t('targetAmount')}</Label>
                  <Input
                    id="goal-amount"
                    inputMode="decimal"
                    placeholder="10,000,000"
                    value={createForm.target_amount}
                    onChange={(e) =>
                      setCreateForm((p) => ({
                        ...p,
                        target_amount: formatNumberInput(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-currency">{t('currency')}</Label>
                  <Select
                    value={createForm.currency}
                    onValueChange={(value) =>
                      setCreateForm((p) => ({ ...p, currency: value as Currency }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('selectCurrency')} />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-priority">{t('priority')}</Label>
                  <Select
                    value={createForm.priority}
                    onValueChange={(value) =>
                      setCreateForm((p) => ({ ...p, priority: value as Goal['priority'] }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('selectPriority')} />
                    </SelectTrigger>
                    <SelectContent>
                      {GOAL_PRIORITIES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-date">{t('targetDate')}</Label>
                  <Input
                    id="goal-date"
                    type="date"
                    value={createForm.target_date}
                    onChange={(e) => setCreateForm((p) => ({ ...p, target_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">{t('description')}</Label>
                <textarea
                  id="goal-description"
                  placeholder={t('descriptionPlaceholder')}
                  value={createForm.description}
                  onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                {t('cancel')}
              </Button>
              <Button onClick={handleCreateGoal} disabled={createSubmitting}>
                {createSubmitting ? t('creating') : t('createGoal')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!hasGoals ? (
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            <CardTitle>{t('noGoals')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {t('noGoalsDescription')}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => {
            const percent = goalPercent(goal);
            const statusToneClasses = statusTone(goal.status);
            const priorityToneClasses = priorityTone(goal.priority);

            return (
              <Card
                key={goal.id}
                className={cn(
                  'flex flex-col gap-3 border-border/70',
                  statusToneClasses.ringClass,
                  'bg-card'
                )}
              >
                <CardHeader className="space-y-2 pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Link
                          href={`/goals/${goal.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {goal.name}
                        </Link>
                      </CardTitle>
                      {goal.description ? (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {goal.description}
                        </p>
                      ) : null}
                    </div>
                    <Flag className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={statusToneClasses.badgeClass}>{goal.status}</Badge>
                    <Badge className={priorityToneClasses.badgeClass}>
                      {t('priorityLabel', { priority: goal.priority })}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{t('current')}</span>
                    <span className="text-foreground font-medium">
                      {formatAmount(goal.current_amount, goal.currency)}
                    </span>
                  </div>

                  <Progress value={percent} className="h-2" />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{percent}%</span>
                    <span>
                      {t('target')}: {formatAmount(goal.target_amount, goal.currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t('remaining')}</span>
                    <span className="text-foreground font-medium">
                      {formatAmount(
                        Math.max(goal.target_amount - goal.current_amount, 0),
                        goal.currency
                      )}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setFundsForm({ amount: '' });
                      setFundsOpenFor(goal);
                    }}
                  >
                    <Wallet className="h-4 w-4" />
                    {t('addFunds')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!fundsOpenFor} onOpenChange={(open) => !open && setFundsOpenFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('addFunds')}</DialogTitle>
            <DialogDescription>{t('addFundsDescription')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="funds-amount">{t('amount')}</Label>
              <Input
                id="funds-amount"
                inputMode="decimal"
                placeholder="1,000,000"
                value={fundsForm.amount}
                onChange={(e) => setFundsForm({ amount: formatNumberInput(e.target.value) })}
              />
            </div>
            {fundsOpenFor ? (
              <p className="text-xs text-muted-foreground">
                {t('current')}: {formatAmount(fundsOpenFor.current_amount, fundsOpenFor.currency)}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFundsOpenFor(null)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleAddFunds} disabled={fundsSubmitting}>
              {fundsSubmitting ? t('saving') : t('addFunds')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
