import { Card, CardContent } from "@/components/ui/card";
import { getTransactions } from "@/lib/services/transactions";
import TransactionsClient from "./transactions-client";

type MonthGroup = {
  month: string;
  categories: { name: string; value: number }[];
  palette: string[];
  rows: {
    id: string;
    date: string;
    merchant?: string | null;
    category: string;
    status: string;
    amount: number;
    direction?: string | null;
    currency?: string | null;
    categoryColor: string;
  }[];
};

const CHART_PALETTE = [
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

export default async function TransactionsPage() {
  let transactions = [];
  try {
    transactions = await getTransactions();
  } catch (error) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-rose-600">Failed to load transactions.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const groups = transactions.reduce<Record<string, any[]>>((acc, tx) => {
    const key = tx.created_at || tx.date;
    const d = new Date(key);
    const label = Number.isNaN(d.getTime())
      ? "Unknown"
      : d.toLocaleString("en-US", { month: "long", year: "numeric" });
    if (!acc[label]) acc[label] = [];
    acc[label].push(tx);
    return acc;
  }, {});

  const monthOrder = Object.keys(groups).sort((a, b) => {
    const da = new Date(groups[a][0]?.created_at || groups[a][0]?.date || "");
    const db = new Date(groups[b][0]?.created_at || groups[b][0]?.date || "");
    return db.getTime() - da.getTime();
  });

  const monthGroups: MonthGroup[] = monthOrder.map((month) => {
    const grouped = groups[month].reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + Math.abs(t.amount);
      return acc;
    }, {});
    const categories = Object.entries(grouped).map(([name, value]) => ({ name, value }));
    const palette = categories.map((_, idx) => CHART_PALETTE[idx % CHART_PALETTE.length]);
    const categoryColors = categories.reduce<Record<string, string>>((acc, cat, idx) => {
      acc[cat.name] = palette[idx % palette.length] ?? "var(--muted)";
      return acc;
    }, {});
    const rows = groups[month].map((t: any) => ({
      id: t.id,
      date: t.created_at || t.date,
      merchant: t.merchant,
      category: t.category,
      status: t.status,
      amount: t.amount,
      direction: t.transaction_direction,
      currency: t.currency,
      categoryColor: categoryColors[t.category] ?? "var(--muted)",
    }));
    return { month, categories, palette, rows };
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-zinc-500">Latest activity from your linked accounts.</p>
      </div>

      <TransactionsClient monthGroups={monthGroups} />
    </div>
  );
}

