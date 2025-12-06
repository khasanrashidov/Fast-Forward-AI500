import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpendingCategoryRadial, CATEGORY_COLORS } from "@/components/SpendingCategoryRadial";
import { getTransactions } from "@/lib/services/transactions";

type StatusTone = "primary" | "warn" | "error" | "muted";

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

function formatAmount(amount: number, direction?: string, currency?: string) {
  const signed = direction === "INCOMING" ? Math.abs(amount) : -Math.abs(amount);
  const formatted = `${signed > 0 ? "+" : ""}${Math.abs(signed).toLocaleString("en-US")} ${
    currency ?? "UZS"
  }`;
  return { signed, formatted };
}

function statusStyle(status: string): { tone: StatusTone; label: string } {
  const s = status.toUpperCase();
  if (s === "APPROVED" || s === "SETTLED" || s === "SUCCESS" || s === "COMPLETED") {
    return { tone: "primary", label: status };
  }
  if (s === "PENDING") return { tone: "warn", label: status };
  if (s === "DECLINED" || s === "CANCELED" || s === "VOIDED" || s === "REFUNDED") {
    return { tone: "error", label: status };
  }
  return { tone: "muted", label: status };
}

function toneBadge(tone: StatusTone, label: string) {
  const map: Record<StatusTone, string> = {
    primary: "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]",
    warn: "bg-amber-100 text-amber-700",
    error: "bg-rose-100 text-rose-700",
    muted: "bg-zinc-100 text-zinc-700",
  };
  return <Badge className={`font-semibold ${map[tone]}`}>{label}</Badge>;
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

  // Group by month-year for table rendering
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-zinc-500">Latest activity from your linked accounts.</p>
      </div>

      {monthOrder.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-zinc-500 text-center">No transactions yet.</p>
          </CardContent>
        </Card>
      ) : (
        monthOrder.map((month) => {
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

          return (
            <Card key={month}>
              <CardHeader>
                <CardTitle>{month}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <SpendingCategoryRadial
                      categories={categories}
                      colors={palette}
                      sizeClassName="w-[180px] max-w-full"
                      centerLabel="UZS"
                      subLabel={month}
                      currency="UZS"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Merchant</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups[month].map((transaction: any) => {
                      const { tone, label } = statusStyle(transaction.status);
                      const { formatted, signed } = formatAmount(
                        transaction.amount,
                        transaction.transaction_direction,
                        transaction.currency
                      );
                      const displayDate = transaction.created_at || transaction.date;
                      const color = categoryColors[transaction.category] ?? "var(--muted)";
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(displayDate)}</TableCell>
                          <TableCell className="font-medium">{transaction.merchant}</TableCell>
                          <TableCell>
                            <Badge className="font-semibold text-white" style={{ backgroundColor: color }}>
                              {transaction.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{toneBadge(tone, label)}</TableCell>
                          <TableCell
                            className={`text-right font-bold ${
                              signed >= 0 ? "text-[var(--primary)]" : "text-zinc-900"
                            }`}
                          >
                            {formatted}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
