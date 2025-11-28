"use client";

import { motion } from "framer-motion";

export default function Methodology() {
    const steps = [
        "User Financial Profile Ingestion",
        "Transaction Categorization & Modeling",
        "Financial Analytics Dashboard",
        "AI Insight Engine (GPT-5/4.1)",
        "Salary-Cycle & Cashflow Predictor",
        "Advanced Goal Timeline Calculator",
        "Financial Health Score",
        "Agrobank Product Recommendations",
        "Predictive Scenario Engine",
        "Adaptive Learning & Continuous Updates",
    ];

    const stack = [
        { category: "Frontend", items: ["Next.js", "Tailwind CSS", "Recharts", "Lucide React"] },
        { category: "Backend", items: ["Python (Flask)", "PostgreSQL", "LangChain", "REST API"] },
        { category: "AI Layer", items: ["OpenAI GPT-4o", "Custom Rules", "Prompt Engineering"] },
        { category: "Hosting", items: ["Vercel", "Supabase", "Render"] },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">How We Plan to Solve It</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We build a thin, intelligent AI layer on top of Agrobank's financial infrastructure.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Steps */}
                    <div>
                        <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">Key Implementation Steps</h3>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <span className="font-medium text-gray-800">{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">Tech Stack</h3>
                        <div className="grid gap-6">
                            {stack.map((group, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
                                >
                                    <h4 className="text-emerald-600 font-bold mb-4 uppercase text-sm tracking-wider">{group.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
