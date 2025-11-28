"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Methodology() {
    const [openStep, setOpenStep] = useState<number | null>(0);
    const [isPaused, setIsPaused] = useState(false);

    const steps = [
        {
            title: "User Financial Profile Ingestion & Normalization",
            details: [
                "Collect structured data: salary, age, family size, occupation, financial goals, currency preferences.",
                "Extract dynamic data: income streams, spending history, recurring payments, loans, assets, liabilities.",
                "Normalize & store in secure DB (PII-safe).",
                "Build continuous profile updates using transaction streams + AI-based document parsing (e.g., salary slips)."
            ]
        },
        {
            title: "Transaction Categorization & Behavioral Modeling",
            details: [
                "Hybrid engine: Rule-based keyword detection for high-precision categories.",
                "AI classifier (GPT or finetuned model) for ambiguous transactions.",
                "Track monthly volatility per category (µ, σ).",
                "Build behavioral signatures: spending cycles, salary cycles, weekend spikes, seasonality.",
                "Detect anomalies: sudden overspending, large one-offs, emerging recurring charges."
            ]
        },
        {
            title: "Financial Analytics Dashboard",
            details: [
                "Built with Next.js + Tailwind + charts (bar, pie, trend lines).",
                "Shows: Category breakdown, Month-over-month trends, Essential vs discretionary spend.",
                "Income stability index & Cashflow heatmap.",
                "AI auto-highlights unusual trends (e.g., “Dining Out +32% vs last month”)."
            ]
        },
        {
            title: "AI Insight Engine (Core Intelligence Layer)",
            details: [
                "Powered by GPT-5/4.1/4o + LangChain.",
                "Generates: Spending insights, Trend explanations, Micro-advice (short, actionable 1–2 sentence tips).",
                "Predictive alerts (e.g., “Balance may fall below safe threshold in 9 days”).",
                "Uses chain-of-thought hidden reasoning + deterministic guardrails for consistency."
            ]
        },
        {
            title: "Salary-Cycle & Cashflow Predictor",
            details: [
                "Predicts when user will run out of money using: Historical spending velocity, Upcoming bills, Category-level volatility.",
                "Produces: “Days until zero”, Confidence interval (AI-enhanced).",
                "Recommended interventions (cut X% in discretionary → +5 days buffer)."
            ]
        },
        {
            title: "Advanced Goal Timeline Calculator",
            details: [
                "Replaces the old formula with full financial modeling.",
                "Real contributions = income – spending – installments – taxes – volatility buffer.",
                "Monte Carlo simulation (2k–10k runs) for realistic scenarios.",
                "Outputs: Deterministic months to target, Monte Carlo percentiles (10th, 50th, 90th), Success probability."
            ]
        },
        {
            title: "Financial Health Score (Composite Index)",
            details: [
                "Factors: Savings rate stability, Income consistency, Spending volatility, Debt ratio, Emergency buffer coverage.",
                "AI-derived risk assessment.",
                "Score recalculated monthly with clear breakdowns (“Your score improved due to reduced volatility in Utilities spending”)."
            ]
        },
        {
            title: "Agrobank Product Recommendation Engine",
            details: [
                "Uses AI reasoning + financial rules to match user to products.",
                "Deposits for surplus cash, Loans when liquidity risk detected.",
                "Installments for large upcoming payments, Investment products depending on risk score.",
                "Personalized explanations (“This deposit helps your goal reach 2 months earlier due to higher effective return”)."
            ]
        },
        {
            title: "Predictive Scenario & Simulation Engine",
            details: [
                "User can test scenarios: “What if I increase savings by 10%?”, “What if inflation rises to 7%?”, “What if I take a 5,000 loan?”.",
                "The engine recalculates the entire projection with new inputs using fast Monte Carlo."
            ]
        },
        {
            title: "Adaptive Learning & Continuous Model Updating",
            details: [
                "Monthly profile recalibration: Update spending µ/σ, Relearn category weights.",
                "Adjust risk score, Update inflation & return assumptions.",
                "AI automatically adjusts predictions as user behavior changes."
            ]
        }
    ];

    // Auto-play logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setOpenStep((prev) => {
                if (prev === null) return 0;
                return (prev + 1) % steps.length;
            });
        }, 4000); // Change step every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused, steps.length]); // Added steps.length to dependency array for completeness

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

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Steps - Accordion */}
                    <div
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">Key Implementation Steps</h3>
                        <div className="space-y-4">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${openStep === index
                                            ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                                            : 'bg-white border-gray-100 hover:border-emerald-100'
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenStep(openStep === index ? null : index)}
                                        className="w-full flex items-center gap-4 p-4 text-left transition-colors"
                                    >
                                        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${openStep === index
                                                ? 'bg-emerald-600 text-white scale-110'
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {index + 1}
                                        </span>
                                        <span className={`font-medium flex-1 transition-colors ${openStep === index ? 'text-emerald-900' : 'text-gray-700'
                                            }`}>
                                            {step.title}
                                        </span>
                                        {openStep === index && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="w-2 h-2 rounded-full bg-emerald-500"
                                            />
                                        )}
                                        <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openStep === index ? 'rotate-180' : ''
                                            }`} />
                                    </button>

                                    <AnimatePresence>
                                        {openStep === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-4 pb-4 pl-[3.5rem]">
                                                    <ul className="space-y-2">
                                                        {step.details.map((detail, i) => (
                                                            <motion.li
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                                className="text-sm text-gray-600 leading-relaxed relative pl-3 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-400 before:rounded-full"
                                                            >
                                                                {detail}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack - Sticky */}
                    <div className="lg:sticky lg:top-8">
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
