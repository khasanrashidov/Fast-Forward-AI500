'use client';

import { useMemo, useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { Flag, Plus, Wallet } from 'lucide-react';

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

const createGoalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  target_amount: z
    .string()
    .min(1, 'Target amount is required')
    .transform((val) => Number(val.replace(/,/g, '')))
    .refine((val) => Number.isFinite(val) && val > 0, 'Enter a valid amount'),
  currency: z.enum(CURRENCIES),
  priority: z.enum(GOAL_PRIORITIES),
  target_date: z.string().optional(),
  description: z.string().optional(),
});

const addFundsSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .transform((val) => Number(val.replace(/,/g, '')))
    .refine((val) => Number.isFinite(val) && val > 0, 'Enter a valid amount'),
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
    const parsed = createGoalSchema.safeParse(createForm);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid form data';
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
      toast.success('Goal created');
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
      toast.error('Failed to create goal');
    } finally {
      setCreateSubmitting(false);
    }
  };

  const handleAddFunds = async () => {
    if (!fundsOpenFor) return;

    const parsed = addFundsSchema.safeParse(fundsForm);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid amount';
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
      toast.success('Funds added');
      setFundsForm({ amount: '' });
      setFundsOpenFor(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add funds');
    } finally {
      setFundsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">Goals</h1>
          <p className="text-muted-foreground">
            Track each goal&apos;s progress, priority, and status in real time.
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Add goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create goal</DialogTitle>
              <DialogDescription>Set a target and start tracking progress.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Name</Label>
                <Input
                  id="goal-name"
                  placeholder="New Laptop"
                  value={createForm.name}
                  onChange={(e) => setCreateForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">Target amount</Label>
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
                  <Label htmlFor="goal-currency">Currency</Label>
                  <Select
                    value={createForm.currency}
                    onValueChange={(value) =>
                      setCreateForm((p) => ({ ...p, currency: value as Currency }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
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
                  <Label htmlFor="goal-priority">Priority</Label>
                  <Select
                    value={createForm.priority}
                    onValueChange={(value) =>
                      setCreateForm((p) => ({ ...p, priority: value as Goal['priority'] }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
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
                  <Label htmlFor="goal-date">Target date (optional)</Label>
                  <Input
                    id="goal-date"
                    type="date"
                    value={createForm.target_date}
                    onChange={(e) => setCreateForm((p) => ({ ...p, target_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description (optional)</Label>
                <textarea
                  id="goal-description"
                  placeholder="Why is this goal important?"
                  value={createForm.description}
                  onChange={(e) => setCreateForm((p) => ({ ...p, description: e.target.value }))}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGoal} disabled={createSubmitting}>
                {createSubmitting ? 'Creating...' : 'Create goal'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!hasGoals ? (
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            <CardTitle>No goals yet</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Create a goal to start tracking your progress.
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
                      {goal.priority} priority
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Current</span>
                    <span className="text-foreground font-medium">
                      {formatAmount(goal.current_amount, goal.currency)}
                    </span>
                  </div>

                  <Progress value={percent} className="h-2" />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{percent}%</span>
                    <span>Target: {formatAmount(goal.target_amount, goal.currency)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Remaining</span>
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
                    Add funds
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
            <DialogTitle>Add funds</DialogTitle>
            <DialogDescription>
              Increase the current amount for this goal. It will add on top of the existing balance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="funds-amount">Amount</Label>
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
                Current: {formatAmount(fundsOpenFor.current_amount, fundsOpenFor.currency)}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFundsOpenFor(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddFunds} disabled={fundsSubmitting}>
              {fundsSubmitting ? 'Saving...' : 'Add funds'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
