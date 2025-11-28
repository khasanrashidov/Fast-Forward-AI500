"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Brain, ShieldCheck, Clock, Sparkles, Landmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProblemSolution() {
    const { t } = useLanguage();

    return (
        <section id="solution" className="py-24 bg-gray-50">
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
                                <h2 className="text-3xl font-bold font-display text-gray-900">{t.problemSolution.problemTitle}</h2>
                            </div>
                            <p className="text-gray-600 mb-8 text-lg">
                                {t.problemSolution.problemDesc}
                            </p>
                            <ul className="space-y-4">
                                {t.problemSolution.problems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <span className="mt-[9px] w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
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
                            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">{t.problemSolution.solutionBadge}</span>
                            <h2 className="text-4xl font-bold font-display text-gray-900 mt-2 mb-4">
                                {t.problemSolution.meet} <span className="text-emerald-600">{t.problemSolution.solutionTitle}</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {t.problemSolution.solutionDesc}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {t.problemSolution.solutions.map((item, index) => {
                                const icons = [Brain, TrendingUp, ShieldCheck, Clock, Sparkles, Landmark];
                                const Icon = icons[index];
                                return (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 w-fit mb-2">
                                                <Icon size={20} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
