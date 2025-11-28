"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, TrendingUp, Brain, ShieldCheck, Clock } from "lucide-react";

export default function ProblemSolution() {
    const problems = [
        "Aggressive spending after salary arrival",
        "Mid-month financial stress & uncertainty",
        "No visibility into spending behavior",
        "Lack of personalized budgeting guidance",
    ];

    const solutions = [
        {
            icon: Brain,
            title: "AI Spending Insights",
            desc: "Short, actionable explanations of where your money goes.",
        },
        {
            icon: TrendingUp,
            title: "Smart Monthly Planning",
            desc: "Warnings when spending is too fast & balance predictions.",
        },
        {
            icon: ShieldCheck,
            title: "Financial Health Score",
            desc: "One simple score (0–100) explaining your stability.",
        },
        {
            icon: Clock,
            title: "Goal Planning",
            desc: "AI calculates timelines and suggests improvements.",
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Problem Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-50 rounded-xl text-red-500">
                                    <AlertCircle size={24} />
                                </div>
                                <h2 className="text-3xl font-bold font-display text-gray-900">The Problem</h2>
                            </div>
                            <p className="text-gray-600 mb-8 text-lg">
                                A significant number of Agrobank’s customers live on a strict salary cycle, facing stress and uncertainty every month.
                            </p>
                            <ul className="space-y-4">
                                {problems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <span className="mt-1 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Solution Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-8">
                            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">The Solution</span>
                            <h2 className="text-4xl font-bold font-display text-gray-900 mt-2 mb-4">
                                Meet <span className="text-emerald-600">Moliyachi AI</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                A smart financial assistant fully embedded into AgrobankMobile that transforms it from a transaction tool into a financial partner.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {solutions.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 w-fit mb-4">
                                        <item.icon size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
