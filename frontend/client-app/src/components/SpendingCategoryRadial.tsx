"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type CategoryEntry = { name: string; value: number };

// Diverse, high-contrast palette to keep each category visually distinct.
const defaultChartColors = [
  "#2563eb", // blue
  "#f97316", // orange
  "#22c55e", // green
  "#a855f7", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#e11d48", // rose
  "#6366f1", // indigo
  "#0ea5e9", // sky
  "#84cc16", // lime
  "#d946ef", // fuchsia
] as const;

export const CATEGORY_COLORS = defaultChartColors;

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
  const palette = (colors.length ? colors : defaultChartColors) as readonly string[];
  const total = categories.reduce((sum, item) => sum + item.value, 0);

  const chartData = [
    categories.reduce(
      (acc, item, idx) => {
        const key = `c${idx}`;
        acc[key] = item.value;
        return acc;
      },
      { name: "spending" } as Record<string, number | string>
    ),
  ];

  const chartConfig = categories.reduce((acc, item, idx) => {
    const key = `c${idx}`;
    acc[key] = {
      label: item.name,
      color: palette[idx % palette.length],
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

        {categories.map((_, idx) => {
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

