"use client";

import { motion } from "framer-motion";
import { Zap, Users, Code2 } from "lucide-react";

export default function WhyUs() {
    const reasons = [
        {
            icon: Zap,
            title: "We move extremely fast",
            desc: "All members are Lead and Senior level engineers capable of shipping an MVP within days.",
        },
        {
            icon: Users,
            title: "We know the problem",
            desc: "Most of us live on a salary cycle and personally experience the challenges we are solving.",
        },
        {
            icon: Code2,
            title: "Strong technical background",
            desc: "We cover ML/AI, Backend, Fintech logic, and Modern UI/UX.",
        },
    ];

    return (
        <section className="py-24 bg-emerald-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-display mb-4">Why Our Team?</h2>
                    <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
                        We are not just building features — we are building a financial intelligence layer for Agrobank.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700/50 backdrop-blur-sm"
                        >
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-300 mb-6">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-emerald-100/80 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
