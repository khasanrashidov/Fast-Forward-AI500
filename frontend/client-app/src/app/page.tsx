"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, Wallet } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <p className="text-xs text-zinc-500">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+$4,200.00</div>
            <p className="text-xs text-zinc-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">-$1,850.00</div>
            <p className="text-xs text-zinc-500">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-zinc-500">2 Debit, 1 Credit</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

        {/* Main Chart Area Placeholder (We can add a real chart later if needed) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-400">Chart Visualization Placeholder</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Grocery Store", amount: "-$120.50", date: "Today, 10:23 AM", icon: "🛒", type: "expense" },
                { name: "Salary Deposit", amount: "+$3,200.00", date: "Yesterday, 9:00 AM", icon: "💰", type: "income" },
                { name: "Netflix Subscription", amount: "-$15.00", date: "Oct 24, 2025", icon: "🎬", type: "expense" },
                { name: "Gas Station", amount: "-$45.00", date: "Oct 22, 2025", icon: "⛽", type: "expense" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-lg">
                      {t.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {t.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
