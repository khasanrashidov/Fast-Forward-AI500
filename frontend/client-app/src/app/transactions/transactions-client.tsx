'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SpendingCategoryRadial } from '@/components/SpendingCategoryRadial';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

type StatusTone = 'primary' | 'warn' | 'error' | 'muted';

const toneBadge = (tone: StatusTone, label: string) => {
  const map: Record<StatusTone, string> = {
    primary: 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]',
    warn: 'bg-amber-100 text-amber-700',
    error: 'bg-rose-100 text-rose-700',
    muted: 'bg-zinc-100 text-zinc-700',
  };
  return <Badge className={`font-semibold ${map[tone]}`}>{label}</Badge>;
};

const statusStyle = (status: string): { tone: StatusTone; label: string } => {
  const s = status?.toUpperCase?.() ?? '';
  if (s === 'APPROVED' || s === 'SETTLED' || s === 'SUCCESS' || s === 'COMPLETED') {
    return { tone: 'primary', label: status };
  }
  if (s === 'PENDING') return { tone: 'warn', label: status };
  if (s === 'DECLINED' || s === 'CANCELED' || s === 'VOIDED' || s === 'REFUNDED') {
    return { tone: 'error', label: status };
  }
  return { tone: 'muted', label: status };
};

const formatAmount = (amount: number, direction?: string, currency?: string) => {
  const signed = direction === 'INCOMING' ? Math.abs(amount) : -Math.abs(amount);
  const formatted = `${signed > 0 ? '+' : ''}${Math.abs(signed).toLocaleString('en-US')} ${
    currency ?? 'UZS'
  }`;
  return { signed, formatted };
};

type MonthGroup = {
  month: string;
  categories: { name: string; value: number }[];
  palette: string[];
  rows: {
    id: string;
    date: string;
    dateFormatted: string;
    dateShort: string;
    merchant?: string | null;
    category: string;
    status: string;
    amount: number;
    direction?: string | null;
    currency?: string | null;
    categoryColor: string;
  }[];
};

export default function TransactionsClient({
  monthGroups,
}: {
  monthGroups: MonthGroup[];
}) {
  const t = useTranslations('transactions');
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{
    key: 'date' | 'merchant' | 'category' | 'status' | 'amount';
    dir: 'asc' | 'desc';
  }>({
    key: 'date',
    dir: 'desc',
  });
  const current = useMemo(() => monthGroups[index], [monthGroups, index]);

  if (monthGroups.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-sm text-zinc-500 text-center">{t('noTransactions')}</p>
        </CardContent>
      </Card>
    );
  }

  const goPrev = () => setIndex((i) => (i - 1 + monthGroups.length) % monthGroups.length);
  const goNext = () => setIndex((i) => (i + 1) % monthGroups.length);
  const goCurrentMonth = () => {
    // Go to the first (most recent) month group
    setIndex(0);
  };

  const filteredRows = current.rows.filter((tx) => {
    const q = (search ?? '').toLowerCase().trim();
    if (!q) return true;
    return (
      String(tx.merchant ?? '')
        .toLowerCase()
        .includes(q) ||
      String(tx.category ?? '')
        .toLowerCase()
        .includes(q) ||
      String(tx.status ?? '')
        .toLowerCase()
        .includes(q) ||
      tx.amount.toString().includes(q)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    const dir = sort.dir === 'asc' ? 1 : -1;
    switch (sort.key) {
      case 'date': {
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      }
      case 'merchant': {
        return (a.merchant || '').localeCompare(b.merchant || '') * dir;
      }
      case 'category': {
        return (a.category || '').localeCompare(b.category || '') * dir;
      }
      case 'status': {
        return (a.status || '').localeCompare(b.status || '') * dir;
      }
      case 'amount': {
        return (a.amount - b.amount) * dir;
      }
      default:
        return 0;
    }
  });

  const toggleSort = (key: typeof sort.key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
  };

  const renderSortIcon = (key: typeof sort.key) => {
    if (sort.key !== key) return <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />;
    return sort.dir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-[var(--primary)]" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-[var(--primary)]" />
    );
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        {/* Month navigation - responsive */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={goPrev}
              className="rounded-full border border-zinc-200 p-1.5 sm:p-2 hover:bg-zinc-50 transition"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <CardTitle className="text-base sm:text-xl">{current.month}</CardTitle>
            <button
              onClick={goNext}
              className="rounded-full border border-zinc-200 p-1.5 sm:p-2 hover:bg-zinc-50 transition"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={goCurrentMonth}
            className="rounded-md border border-zinc-200 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-zinc-50 transition flex items-center gap-1.5 sm:gap-2"
          >
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">{t('current')}</span>
            <span className="hidden sm:inline">{t('month')}</span>
          </button>
        </div>

        {/* Search input - full width on mobile */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            className="w-full h-10 rounded-md border border-zinc-200 pl-9 pr-3 text-sm placeholder:text-zinc-400"
            placeholder={t('filterPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Radial chart */}
        <div className="flex items-center justify-center">
          <SpendingCategoryRadial
            categories={current.categories}
            colors={current.palette}
            sizeClassName="w-[180px] sm:w-[200px] max-w-full"
            centerLabel="UZS"
            subLabel={current.month}
            currency="UZS"
          />
        </div>

        {/* Desktop Table - hidden on mobile */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <button
                    onClick={() => toggleSort('date')}
                    className={`flex items-center gap-1 font-medium ${
                      sort.key === 'date' ? 'text-[var(--primary)]' : ''
                    }`}
                  >
                    {t('date')} {renderSortIcon('date')}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort('merchant')}
                    className={`flex items-center gap-1 font-medium ${
                      sort.key === 'merchant' ? 'text-[var(--primary)]' : ''
                    }`}
                  >
                    {t('merchant')} {renderSortIcon('merchant')}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort('category')}
                    className={`flex items-center gap-1 font-medium ${
                      sort.key === 'category' ? 'text-[var(--primary)]' : ''
                    }`}
                  >
                    {t('category')} {renderSortIcon('category')}
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => toggleSort('status')}
                    className={`flex items-center gap-1 font-medium ${
                      sort.key === 'status' ? 'text-[var(--primary)]' : ''
                    }`}
                  >
                    {t('status')} {renderSortIcon('status')}
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button
                    onClick={() => toggleSort('amount')}
                    className={`flex w-full items-center justify-end gap-1 font-medium ${
                      sort.key === 'amount' ? 'text-[var(--primary)]' : ''
                    }`}
                  >
                    {t('amount')} {renderSortIcon('amount')}
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((transaction) => {
                const { tone, label } = statusStyle(transaction.status ?? '');
                const { formatted, signed } = formatAmount(
                  transaction.amount,
                  transaction.direction ?? undefined,
                  transaction.currency ?? undefined
                );
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.dateFormatted}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.merchant || t('unknown')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="font-semibold text-white"
                        style={{ backgroundColor: transaction.categoryColor }}
                      >
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{toneBadge(tone, label)}</TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        signed >= 0 ? 'text-[var(--primary)]' : 'text-zinc-900'
                      }`}
                    >
                      {formatted}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List - shown only on mobile */}
        <div className="md:hidden space-y-3">
          {sortedRows.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-4">{t('noTransactionsFound')}</p>
          ) : (
            sortedRows.map((transaction) => {
              const { tone, label } = statusStyle(transaction.status ?? '');
              const { formatted, signed } = formatAmount(
                transaction.amount,
                transaction.direction ?? undefined,
                transaction.currency ?? undefined
              );
              return (
                <div
                  key={transaction.id}
                  className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 space-y-2"
                >
                  {/* Top row: Merchant + Amount */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-zinc-900 truncate">
                        {transaction.merchant || t('unknown')}
                      </p>
                      <p className="text-xs text-zinc-500">{transaction.dateShort}</p>
                    </div>
                    <p
                      className={`text-sm font-bold whitespace-nowrap ${
                        signed >= 0 ? 'text-[var(--primary)]' : 'text-zinc-900'
                      }`}
                    >
                      {formatted}
                    </p>
                  </div>

                  {/* Bottom row: Category + Status */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      className="font-semibold text-white text-[11px]"
                      style={{ backgroundColor: transaction.categoryColor }}
                    >
                      {transaction.category}
                    </Badge>
                    {toneBadge(tone, label)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Transaction count */}
        <p className="text-xs text-zinc-500 text-center pt-2">
          {sortedRows.length === 1
            ? t('transactionCount', { count: sortedRows.length, month: current.month })
            : t('transactionsCount', { count: sortedRows.length, month: current.month })}
        </p>
      </CardContent>
    </Card>
  );
}
