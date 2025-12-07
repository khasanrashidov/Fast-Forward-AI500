'use client';

import {
  Line,
  LineChart,
  TooltipProps,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { GoalTimeline } from '@/lib/services/goals';

type Props = {
  timeline?: GoalTimeline | null;
  currency: string;
};

export function TimelineChart({ timeline, currency }: Props) {
  const data = timeline?.timeline_data ?? [];

  if (!data.length) {
    return (
      <div className="rounded-md border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
        No timeline data available.
      </div>
    );
  }

  const config: ChartConfig = {
    deterministic: { label: 'Deterministic', color: 'var(--chart-1)' },
    p10_optimistic: { label: 'P10 (optimistic)', color: 'var(--chart-2)' },
    p50_median: { label: 'P50 (median)', color: 'var(--chart-3)' },
    p90_pessimistic: { label: 'P90 (pessimistic)', color: 'var(--chart-4)' },
  };

  const formatCurrency = (value: number) => `${value.toLocaleString('en-US')} ${currency}`;

  return (
    <ChartContainer config={config} className="h-36 sm:h-64 w-full">
      <LineChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          stroke="var(--muted-foreground)"
          tick={{ fontSize: 9 }}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={2}
          stroke="var(--muted-foreground)"
          tickFormatter={(v) => `${Math.round(v / 1_000_000)}m`}
          tick={{ fontSize: 9 }}
          width={28}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: ValueType, name?: NameType) => {
                if (typeof value === 'number') {
                  return <span className="text-foreground">{formatCurrency(value)}</span>;
                }
                return value;
              }}
              labelFormatter={(label) => `Month ${label}`}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="deterministic"
          stroke="var(--color-deterministic)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="p10_optimistic"
          stroke="var(--color-p10_optimistic)"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="p50_median"
          stroke="var(--color-p50_median)"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="p90_pessimistic"
          stroke="var(--color-p90_pessimistic)"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
