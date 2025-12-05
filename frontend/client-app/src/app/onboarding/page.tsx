"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function OnboardingPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        fullName: "",
        monthlyIncome: "",
        currentBalance: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, we would save this data to a backend or local storage context
        console.log("Onboarding Data:", formData)
        router.push("/")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
            <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Welcome to FinAssist
                    </CardTitle>
                    <CardDescription>
                        Let's get to know you better to provide personalized financial guidance.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="John Doe"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                            <Input
                                id="monthlyIncome"
                                name="monthlyIncome"
                                type="number"
                                placeholder="5000"
                                required
                                min="0"
                                value={formData.monthlyIncome}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentBalance">Current Balance ($)</Label>
                            <Input
                                id="currentBalance"
                                name="currentBalance"
                                type="number"
                                placeholder="1500"
                                required
                                value={formData.currentBalance}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
