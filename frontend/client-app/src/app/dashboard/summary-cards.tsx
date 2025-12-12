import { getTranslations } from 'next-intl/server';
import { ArrowDownRight, ArrowUpRight, Coins, HeartPulse } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDashboard } from '@/lib/services/dashboard';

function formatCurrency(amount: number) {
  return `${amount.toLocaleString('en-US')} UZS`;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export async function SummaryCards() {
  const t = await getTranslations('dashboard');

  let data;
  try {
    data = await getDashboard();
  } catch {
    return (
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="opacity-50">
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Failed to load
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { summary, health_score } = data;

  const healthTone = (health_score.color || '').toLowerCase();
  const healthBadge =
    healthTone === 'green'
      ? {
          className: 'border text-[var(--primary)] bg-white',
          style: {
            borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)',
            backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)',
          },
        }
      : healthTone === 'yellow'
        ? { className: 'bg-amber-100 border border-amber-200 text-amber-700' }
        : healthTone === 'red'
          ? { className: 'bg-rose-100 border border-rose-200 text-rose-700' }
          : null;
  const healthIcon =
    healthTone === 'green'
      ? 'text-[var(--primary)]'
      : healthTone === 'yellow'
        ? 'text-amber-500'
        : healthTone === 'red'
          ? 'text-rose-600'
          : 'text-indigo-500';

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">{t('totalIncome')}</CardTitle>
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)]" />
        </CardHeader>
        <CardContent className="pt-0 sm:pt-0">
          <div className="text-lg sm:text-2xl font-bold text-[var(--primary)]">
            {formatCurrency(summary.total_income)}
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-500 hidden sm:block">
            {t('fromAllSources')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">{t('totalSpending')}</CardTitle>
          <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
        </CardHeader>
        <CardContent className="pt-0 sm:pt-0">
          <div className="text-lg sm:text-2xl font-bold text-rose-600">
            {formatCurrency(summary.total_spending)}
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-500 hidden sm:block">
            {t('previousMonth')}: {formatCurrency(summary.previous_month_spending)}
          </p>
          <p className="text-[10px] sm:text-xs text-zinc-500 hidden sm:block">
            {t('difference')}: {formatPercent(summary.spending_change_percent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">{t('savingsPotential')}</CardTitle>
          <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--primary)]" />
        </CardHeader>
        <CardContent className="pt-0 sm:pt-0">
          <div className="text-lg sm:text-2xl font-bold">
            {formatCurrency(summary.savings_potential)}
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-500 hidden sm:block">
            {t('afterSpendObligations')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium">{t('healthScore')}</CardTitle>
          <HeartPulse className={`h-4 w-4 sm:h-5 sm:w-5 ${healthIcon}`} />
        </CardHeader>
        <CardContent className="pt-0 sm:pt-0">
          <div className="text-lg sm:text-2xl font-bold">{health_score.score} / 100</div>
          {healthBadge && health_score.status && (
            <div className="mt-1 sm:mt-2">
              <Badge
                className={`text-[10px] sm:text-[11px] font-semibold ${healthBadge.className}`}
                style={healthBadge.style}
              >
                {health_score.status}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function SummaryCardsSkeleton() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-5 w-5 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-7 w-32 bg-muted rounded animate-pulse mb-2" />
            <div className="h-3 w-24 bg-muted rounded animate-pulse hidden sm:block" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

