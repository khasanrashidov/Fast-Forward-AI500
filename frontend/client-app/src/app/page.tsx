import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpendingCategoryRadial } from '@/components/SpendingCategoryRadial';
import { getDashboard } from '@/lib/services/dashboard';
import { getUser } from '@/lib/services/users';
import { getCards } from '@/lib/services/cards';
import { Badge } from '@/components/ui/badge';
import { DashboardCards } from './dashboard/dashboard-cards';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import { getTranslations, getLocale } from 'next-intl/server';

function formatCurrency(amount: number) {
  return `${amount.toLocaleString('en-US')} UZS`;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const locale = await getLocale();

  let data;
  let user;
  let cards = [];

  const basePalette = [
    '#2563eb',
    '#f97316',
    '#22c55e',
    '#a855f7',
    '#ec4899',
    '#14b8a6',
    '#f59e0b',
    '#e11d48',
    '#6366f1',
    '#0ea5e9',
    '#84cc16',
    '#d946ef',
  ];

  const makePalette = (count: number) => {
    if (count <= basePalette.length) return basePalette.slice(0, count);
    const extra = Array.from({ length: count - basePalette.length }, (_, idx) => {
      const hue = Math.round((idx / (count - basePalette.length + 1)) * 360);
      return `hsl(${hue}deg 70% 55%)`;
    });
    return [...basePalette, ...extra];
  };

  try {
    [data, user, cards] = await Promise.all([getDashboard(), getUser(), getCards()]);
  } catch {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('welcome')}</h1>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-rose-600">{t('failedToLoad')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    summary,
    category_distribution,
    previous_month_categories,
    insights,
    alerts,
    health_score,
  } = data;

  const categories = Object.entries(category_distribution ?? {}).sort((a, b) => b[1] - a[1]);

  const deltas = categories.map(([name, value]) => {
    const prev = previous_month_categories?.[name] ?? 0;
    const diff = value - prev;
    const pct = prev > 0 ? (diff / prev) * 100 : null;
    return { name, value, prev, diff, pct };
  });

  const palette = makePalette(deltas.length || 1);

  const monthLabel = new Date().toLocaleString(locale, { month: 'long', year: 'numeric' });
  const monthOnly = new Date().toLocaleString(locale, { month: 'long' });

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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--primary)]">
            {user ? `${user.first_name} ${user.last_name}` : t('welcome')}
          </h1>
        </div>
        <p className="text-sm sm:text-base text-zinc-500">{t('overview')}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-9 grid gap-4">
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
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {t('totalSpending')}
                </CardTitle>
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
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {t('savingsPotential')}
                </CardTitle>
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

          <div className="flex flex-col lg:flex-row gap-4">
            <Card className="w-full lg:basis-[40%]">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">
                  {t('spendingIn', { month: monthLabel })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {deltas.length === 0 ? (
                  <p className="text-sm text-zinc-500">{t('noCategoryData')}</p>
                ) : (
                  <>
                    <div className="flex items-center justify-center py-2">
                      <SpendingCategoryRadial
                        categories={deltas.map(({ name, value }) => ({ name, value }))}
                        colors={palette}
                        sizeClassName="w-[180px] sm:w-[200px] max-w-full"
                        centerLabel="UZS"
                        subLabel={monthOnly}
                        currency="UZS"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      {deltas.map(({ name, value, prev, pct, diff }, idx) => (
                        <div
                          key={name}
                          className="flex items-center justify-between gap-2 sm:gap-4"
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                            <Badge
                              className="rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold shrink-0"
                              style={{
                                backgroundColor: palette[idx % palette.length],
                                color: '#ffffff',
                              }}
                            >
                              {name}
                            </Badge>
                            <div className="hidden sm:block">
                              {prev > 0 && (
                                <p className="text-xs text-zinc-500">
                                  {t('previousMonthFull')}: {formatCurrency(prev)}
                                  {pct !== null && (
                                    <span className="ml-2">
                                      ({diff >= 0 ? '+' : ''}
                                      {formatPercent(pct)})
                                    </span>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold shrink-0">
                            {formatCurrency(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20 w-full lg:basis-[35%]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                  {t('aiInsights')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.length === 0 ? (
                  <p className="text-sm text-zinc-500">{t('noInsights')}</p>
                ) : (
                  insights.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/6 to-accent/10 p-3 text-sm text-foreground"
                    >
                      {item}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="flex flex-col w-full lg:basis-[25%]">
              <CardHeader className="flex items-center gap-2 pb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <CardTitle>{t('alerts')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {alerts.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 text-sm text-zinc-500">
                    <div className="h-50 w-50">
                      <img
                        src="/done-checking.svg"
                        alt={t('noAlerts')}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p>{t('noAlerts')}</p>
                  </div>
                ) : (
                  alerts.map((alert, idx) => (
                    <div key={idx} className="text-sm text-zinc-700 dark:text-zinc-200">
                      {alert}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <DashboardCards initialCards={cards} username={user.username} />
        </div>
      </div>
    </div>
  );
}
