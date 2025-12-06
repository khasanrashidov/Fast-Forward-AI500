"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, Target, Car, Home, Plane } from "lucide-react"

const goals = [
    { id: 1, name: "New House", target: 300000, current: 45000, icon: Home, color: "text-blue-500" },
    { id: 2, name: "Dream Car", target: 50000, current: 12500, icon: Car, color: "text-red-500" },
    { id: 3, name: "Summer Vacation", target: 5000, current: 3200, icon: Plane, color: "text-yellow-500" },
    { id: 4, name: "Emergency Fund", target: 10000, current: 8000, icon: Target, color: "text-[var(--primary)]" },
]

export default function GoalsPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
                    <p className="text-zinc-500">Track your progress towards your dreams.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> New Goal
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => {
                    const percent = Math.round((goal.current / goal.target) * 100)
                    return (
                        <Card key={goal.id} className="relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-1 h-full ${goal.color.replace('text-', 'bg-')}`}></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold">{goal.name}</CardTitle>
                                <goal.icon className={`h-5 w-5 ${goal.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-zinc-500">Current</span>
                                    <span className="font-bold">${goal.current.toLocaleString()}</span>
                                </div>
                                <Progress value={percent} className="h-2 mb-2" />
                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>0%</span>
                                    <span className="font-medium text-zinc-600">{percent}%</span>
                                    <span>Target: ${goal.target.toLocaleString()}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full text-xs h-8">Add Funds</Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
