"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertTriangle, ShieldCheck, PieChart } from "lucide-react"

export default function InsightsPage() {
    const financialScore = 780

    const insights = [
        {
            id: 1,
            title: "High Savings Rate",
            description: "You saved 25% of your income this month! Consider opening a high-yield savings account to maximize returns.",
            type: "positive",
            icon: TrendingUp,
            action: "View Deposit Options"
        },
        {
            id: 2,
            title: "Unusual Subscription Activity",
            description: "We noticed a price increase in your 'Netflix' subscription this month.",
            type: "warning",
            icon: AlertTriangle,
            action: "Manage Subscriptions"
        },
        {
            id: 3,
            title: "Loan Eligibility",
            description: "With your current score (780), you are eligible for personal loans with interest rates as low as 5%.",
            type: "info",
            icon: ShieldCheck,
            action: "Check Rates"
        },
        {
            id: 4,
            title: "Spending Analysis",
            description: "Your food expenses are 15% lower than last month. Great job sticking to your budget!",
            type: "positive",
            icon: PieChart,
            action: "View Details"
        }
    ]

    const getScoreColor = (score: number) => {
        if (score >= 800) return "text-blue-500"
        if (score >= 700) return "text-indigo-500"
        if (score >= 600) return "text-yellow-500"
        return "text-red-500"
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
                <p className="text-zinc-500">Smart analysis of your financial health.</p>
            </div>

            {/* Financial Score Section */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-1 border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            Financial Health Score
                        </CardTitle>
                        <CardDescription>Based on your income, savings, and spending habits.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-zinc-100 dark:border-zinc-800`}>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-4xl font-black ${getScoreColor(financialScore)}`}>{financialScore}</span>
                                <span className="text-xs text-zinc-400 font-medium">EXCELLENT</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-xs text-center text-zinc-500 max-w-[200px]">You are in the top 15% of users. Keep up the good work!</p>
                    </CardFooter>
                </Card>

                <div className="col-span-2 grid gap-4 grid-cols-1 md:grid-cols-2">
                    {insights.map((insight) => (
                        <Card key={insight.id} className="flex flex-col">
                            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                                <div className={`p-2 rounded-lg ${insight.type === 'positive' ? 'bg-blue-100 text-blue-700' :
                                    insight.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                                        'bg-indigo-100 text-indigo-700'
                                    }`}>
                                    <insight.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-base font-semibold">{insight.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {insight.description}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" className="w-full justify-between group hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                    {insight.action}
                                    <TrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
