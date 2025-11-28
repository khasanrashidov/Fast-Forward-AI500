"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6 border border-emerald-100">
                        {t.hero.badge}
                    </span>
                    <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        {t.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="relative group">
                            <a
                                href="https://moliyachi-web.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-1"
                            >
                                {t.hero.viewDemo}
                                <ArrowRight size={20} />
                            </a>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {t.hero.demoTooltip}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </div>
                        </div>
                        <button
                            onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                        >
                            {t.hero.learnMore}
                        </button>
                    </div>
                </motion.div>

                {/* Floating Elements Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                >
                    {/* Add some subtle floating UI cards here later if needed */}
                </motion.div>
            </div>
        </section>
    );
}
