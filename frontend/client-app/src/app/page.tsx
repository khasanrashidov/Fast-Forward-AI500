import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpendingCategoryRadial } from "@/components/SpendingCategoryRadial";
import { getDashboard } from "@/lib/services/dashboard";
import { getUser } from "@/lib/services/users";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  HeartPulse,
  Sparkles,
  Wallet,
} from "lucide-react";

function formatCurrency(amount: number) {
  return `${amount.toLocaleString("en-US")} UZS`;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default async function DashboardPage() {
  let data;
  let user;

  const basePalette = [
    "#2563eb",
    "#f97316",
    "#22c55e",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
    "#f59e0b",
    "#e11d48",
    "#6366f1",
    "#0ea5e9",
    "#84cc16",
    "#d946ef",
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
    [data, user] = await Promise.all([getDashboard(), getUser()]);
  } catch (error) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-rose-600">Failed to load dashboard data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { summary, category_distribution, previous_month_categories, insights, alerts, health_score } =
    data;

  const categories = Object.entries(category_distribution ?? {}).sort(
    (a, b) => b[1] - a[1]
  );

  const deltas = categories.map(([name, value]) => {
    const prev = previous_month_categories?.[name] ?? 0;
    const diff = value - prev;
    const pct = prev > 0 ? (diff / prev) * 100 : null;
    return { name, value, prev, diff, pct };
  });

  const palette = makePalette(deltas.length || 1);

  const monthLabel = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const monthOnly = new Date().toLocaleString("default", { month: "long" });

  const healthTone = (health_score.color || "").toLowerCase();
  const healthBadge =
    healthTone === "green"
      ? { className: "border text-[var(--primary)] bg-white", style: { borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)", backgroundColor: "color-mix(in srgb, var(--primary) 8%, transparent)" } }
      : healthTone === "yellow"
        ? { className: "bg-amber-100 border border-amber-200 text-amber-700" }
        : healthTone === "red"
          ? { className: "bg-rose-100 border border-rose-200 text-rose-700" }
          : null;
  const healthIcon =
    healthTone === "green"
      ? "text-[var(--primary)]"
      : healthTone === "yellow"
        ? "text-amber-500"
        : healthTone === "red"
          ? "text-rose-600"
          : "text-indigo-500";

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <AvatarImage src="/user_avatar.png" alt="User avatar" />
            <AvatarFallback>
              {user ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}` : "U"}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--primary)]">
            {user ? `${user.first_name} ${user.last_name}` : "Welcome"}
          </h1>
        </div>
        <p className="text-zinc-500">Here is your latest financial overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--primary)]">
              {formatCurrency(summary.total_income)}
            </div>
            <p className="text-xs text-zinc-500">From all sources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
            <ArrowDownRight className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              {formatCurrency(summary.total_spending)}
            </div>
            <p className="text-xs text-zinc-500">
              Previous month: {formatCurrency(summary.previous_month_spending)}
            </p>
            <p className="text-xs text-zinc-500">
              Difference: {formatPercent(summary.spending_change_percent)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Potential</CardTitle>
            <Coins className="h-5 w-5 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.savings_potential)}</div>
            <p className="text-xs text-zinc-500">After spend & obligations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <HeartPulse className={`h-5 w-5 ${healthIcon}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health_score.score} / 100 </div>
            {healthBadge && health_score.status && (
              <div className="mt-2">
                <Badge className={`text-[11px] font-semibold ${healthBadge.className}`} style={healthBadge.style}>
                  {health_score.status}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <CardTitle>
              Spending in {monthLabel}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {deltas.length === 0 ? (
              <p className="text-sm text-zinc-500">No category data yet.</p>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <SpendingCategoryRadial
                    categories={deltas.map(({ name, value }) => ({ name, value }))}
                    colors={palette}
                    sizeClassName="w-[200px] max-w-full"
                    centerLabel="UZS"
                    subLabel={monthOnly}
                    currency="UZS"
                  />
                </div>
                <div className="space-y-2">
                  {deltas.map(({ name, value, prev, pct, diff }, idx) => (
                    <div key={name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                          style={{
                            backgroundColor: palette[idx % palette.length],
                            color: "#ffffff",
                          }}
                        >
                          {name}
                        </Badge>
                        <div>
                          {prev > 0 && (
                            <p className="text-xs text-zinc-500">
                              Previous month: {formatCurrency(prev)}
                              {pct !== null && (
                                <span className="ml-2">
                                  ({diff >= 0 ? "+" : ""}
                                  {formatPercent(pct)})
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-semibold shrink-0">{formatCurrency(value)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="col-span-12 lg:col-span-6 grid gap-4">
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.length === 0 ? (
                <p className="text-sm text-zinc-500">No insights yet.</p>
              ) : (
                insights.map((item, idx) => (
                  <div key={idx} className="text-sm text-zinc-700 dark:text-zinc-200">
                    {item}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="flex items-center gap-2 pb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.length === 0 ? (
                <p className="text-sm text-zinc-500">No alerts at this time.</p>
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
    </div>
  );
}
