import { getTranslations, getLocale } from 'next-intl/server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpendingCategoryRadial } from '@/components/SpendingCategoryRadial';
import { getDashboard } from '@/lib/services/dashboard';

function formatCurrency(amount: number) {
  return `${amount.toLocaleString('en-US')} UZS`;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

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

function makePalette(count: number) {
  if (count <= basePalette.length) return basePalette.slice(0, count);
  const extra = Array.from({ length: count - basePalette.length }, (_, idx) => {
    const hue = Math.round((idx / (count - basePalette.length + 1)) * 360);
    return `hsl(${hue}deg 70% 55%)`;
  });
  return [...basePalette, ...extra];
}

export async function SpendingChart() {
  const t = await getTranslations('dashboard');
  const locale = await getLocale();

  let data;
  try {
    data = await getDashboard();
  } catch {
    return (
      <Card className="w-full lg:basis-[40%]">
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          Failed to load spending data
        </CardContent>
      </Card>
    );
  }

  const { category_distribution, previous_month_categories } = data;

  const categories = Object.entries(category_distribution ?? {}).sort((a, b) => b[1] - a[1]);

  const deltas = categories.map(([name, value]) => {
    const prev = previous_month_categories?.[name] ?? 0;
    const diff = value - prev;
    const pct = prev > 0 ? (diff / prev) * 100 : null;
    return { name, value, prev, diff, pct };
  });

  const palette = makePalette(deltas.length || 1);
  const monthOnly = new Date().toLocaleString(locale, { month: 'long' });

  return (
    <Card className="w-full lg:basis-[40%]">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-lg">{t('spendingIn')}</CardTitle>
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
                <div key={name} className="flex items-center justify-between gap-2 sm:gap-4">
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
                  <p className="text-xs sm:text-sm font-semibold shrink-0">{formatCurrency(value)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function SpendingChartSkeleton() {
  return (
    <Card className="w-full lg:basis-[40%]">
      <CardHeader className="pb-2 sm:pb-4">
        <div className="h-5 w-40 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center py-2">
          <div className="w-[180px] sm:w-[200px] h-[180px] sm:h-[200px] rounded-full bg-muted animate-pulse" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

