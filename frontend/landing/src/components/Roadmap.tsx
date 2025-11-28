"use client";

import { motion } from "framer-motion";

export default function Roadmap() {
    const phases = [
        {
            date: "Nov 26 – Nov 30",
            title: "Stage 1: Demo Website",
            items: ["Landing website", "Problem & Solution", "Architecture planning", "Initial AI insights"],
            status: "completed",
        },
        {
            date: "Dec 1 – Dec 5",
            title: "Functional MVP Shell",
            items: ["Next.js frontend base", "Visual dashboard layout", "Mock profile setup", "Frontend-Backend pipeline"],
            status: "current",
        },
        {
            date: "Dec 5 – Dec 10",
            title: "Core MVP Functionality",
            items: ["AI recommendation engine", "Goal calculator", "Financial Health Score", "Salary-cycle warning"],
            status: "upcoming",
        },
        {
            date: "Dec 10 – Dec 13",
            title: "Polish & Submission",
            items: ["Supabase integration", "LangChain pipeline", "Final UI polishing", "Deployment (Vercel/Render)"],
            status: "upcoming",
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Roadmap</span>
                    <h2 className="text-4xl font-bold font-display text-gray-900 mt-2">Development Plan</h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 pb-12 last:pb-0 border-l-2 border-emerald-100 last:border-l-0"
                        >
                            <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white ${phase.status === 'completed' ? 'bg-emerald-500' :
                                    phase.status === 'current' ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-300'
                                }`} />

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ml-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                                        {phase.date}
                                    </span>
                                </div>
                                <ul className="grid sm:grid-cols-2 gap-2">
                                    {phase.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
