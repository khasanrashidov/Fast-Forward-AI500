"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type CategoryEntry = { name: string; value: number };

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const CATEGORY_COLORS = chartColors;

export function SpendingCategoryRadial({
  categories,
  colors = CATEGORY_COLORS,
  sizeClassName = "w-[240px] max-w-full",
  centerLabel = "Total",
  currency = "UZS",
  subLabel,
}: {
  categories: CategoryEntry[];
  colors?: string[] | readonly string[];
  sizeClassName?: string;
  centerLabel?: string;
  currency?: string;
  subLabel?: string;
}) {
  const limited = categories.slice(0, chartColors.length);
  const total = limited.reduce((sum, item) => sum + item.value, 0);

  const chartData = [
    limited.reduce(
      (acc, item, idx) => {
        const key = `c${idx}`;
        acc[key] = item.value;
        return acc;
      },
      { name: "spending" } as Record<string, number | string>
    ),
  ];

  const chartConfig = limited.reduce((acc, item, idx) => {
    const key = `c${idx}`;
    acc[key] = {
      label: item.name,
      color: colors[idx % colors.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer
      config={chartConfig}
      className={`mx-auto aspect-square ${sizeClassName}`}
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={-270}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 10}
                      className="fill-foreground text-xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 10}
                      className="fill-muted-foreground text-xs"
                    >
                      {currency}
                      {subLabel ? ` ${subLabel}` : centerLabel}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        {limited.map((_, idx) => {
          const key = `c${idx}`;
          return (
            <RadialBar
              key={key}
              dataKey={key}
              stackId="a"
              cornerRadius={5}
              fill={`var(--color-${key})`}
              className="stroke-transparent stroke-2"
            />
          );
        })}
      </RadialBarChart>
    </ChartContainer>
  );
}

