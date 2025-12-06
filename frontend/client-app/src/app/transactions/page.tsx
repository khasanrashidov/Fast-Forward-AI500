"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock Data
const transactions = [
    { id: "1", date: "2025-10-24", description: "Grocery Store", category: "Food", amount: -120.50, status: "Completed" },
    { id: "2", date: "2025-10-23", description: "Salary Deposit", category: "Income", amount: 3200.00, status: "Completed" },
    { id: "3", date: "2025-10-24", description: "Netflix", category: "Entertainment", amount: -15.00, status: "Pending" },
    { id: "4", date: "2025-10-22", description: "Shell Station", category: "Transport", amount: -45.00, status: "Completed" },
    { id: "5", date: "2025-10-20", description: "Electric Bill", category: "Utilities", amount: -150.00, status: "Completed" },
    { id: "6", date: "2025-10-18", description: "Freelance Work", category: "Income", amount: 450.00, status: "Completed" },
    { id: "7", date: "2025-10-15", description: "Cafe Latte", category: "Food", amount: -5.50, status: "Completed" },
    { id: "8", date: "2025-10-12", description: "Cinema Ticket", category: "Entertainment", amount: -18.00, status: "Completed" },
]

export default function TransactionsPage() {
    const [filter, setFilter] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredTransactions = transactions.filter((t) => {
        const matchesCategory = filter === "All" || t.category === filter
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <p className="text-zinc-500">View and manage all your financial transactions.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <CardTitle>History</CardTitle>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input
                                    className="pl-8"
                                    placeholder="Search transactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Categories</SelectItem>
                                    <SelectItem value="Food">Food</SelectItem>
                                    <SelectItem value="Transport">Transport</SelectItem>
                                    <SelectItem value="Utilities">Utilities</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Income">Income</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell className="font-medium">{transaction.description}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal text-zinc-600">
                                            {transaction.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.status === 'Completed' ? 'secondary' : 'outline'} className={transaction.status === 'Completed' ? 'bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]' : 'text-zinc-500'}>
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-bold ${transaction.amount > 0 ? 'text-[var(--primary)]' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
