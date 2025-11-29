"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper function to parse date ranges and determine status
function getPhaseStatus(dateString: string): 'completed' | 'current' | 'upcoming' {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Parse different date formats
    // English: "Nov 26 – Nov 30", "Dec 1 – Dec 5"
    // Uzbek: "26-30 Noyabr", "1-5 Dekabr"
    // Russian: "26-30 Ноября", "1-5 Декабря"

    // Month mappings
    const monthMap: { [key: string]: number } = {
        'jan': 0, 'january': 0, 'yanvar': 0, 'января': 0, 'январь': 0,
        'feb': 1, 'february': 1, 'fevral': 1, 'февраля': 1, 'февраль': 1,
        'mar': 2, 'march': 2, 'mart': 2, 'марта': 2, 'март': 2,
        'apr': 3, 'april': 3, 'aprel': 3, 'апреля': 3, 'апрель': 3,
        'may': 4, 'мая': 4, 'май': 4,
        'jun': 5, 'june': 5, 'iyun': 5, 'июня': 5, 'июнь': 5,
        'jul': 6, 'july': 6, 'iyul': 6, 'июля': 6, 'июль': 6,
        'aug': 7, 'august': 7, 'avgust': 7, 'августа': 7, 'август': 7,
        'sep': 8, 'september': 8, 'sentyabr': 8, 'сентября': 8, 'сентябрь': 8,
        'oct': 9, 'october': 9, 'oktyabr': 9, 'октября': 9, 'октябрь': 9,
        'nov': 10, 'november': 10, 'noyabr': 10, 'ноября': 10, 'ноябрь': 10,
        'dec': 11, 'december': 11, 'dekabr': 11, 'декабря': 11, 'декабрь': 11,
    };

    try {
        const lowerDate = dateString.toLowerCase();

        // Extract numbers and month names
        const numbers = lowerDate.match(/\d+/g)?.map(Number) || [];
        const monthNames = Object.keys(monthMap).filter(month => lowerDate.includes(month));

        if (numbers.length >= 2 && monthNames.length > 0) {
            // Get the month
            const month = monthMap[monthNames[0]];

            // Determine start and end days
            let startDay: number, endDay: number;

            if (numbers.length === 2) {
                // Format: "26-30 November" or "1-5 December"
                [startDay, endDay] = numbers;
            } else if (numbers.length >= 4) {
                // Format: "Nov 26 – Nov 30" or "Dec 1 – Dec 5"
                startDay = numbers[0];
                endDay = numbers[2];
            } else {
                // Fallback
                startDay = numbers[0];
                endDay = numbers[numbers.length - 1];
            }

            // Create date objects
            const startDate = new Date(currentYear, month, startDay);
            const endDate = new Date(currentYear, month, endDay);

            // Adjust year if the phase is in December but we're in November of next year
            if (today.getMonth() === 10 && month === 11) {
                // We're in November, phase is in December - use previous year
                startDate.setFullYear(currentYear - 1);
                endDate.setFullYear(currentYear - 1);
            }

            // Compare dates
            if (today > endDate) {
                return 'completed';
            } else if (today >= startDate && today <= endDate) {
                return 'current';
            } else {
                return 'upcoming';
            }
        }
    } catch (error) {
        console.error('Error parsing date:', dateString, error);
    }

    // Fallback to index-based if parsing fails
    return 'upcoming';
}

export default function Roadmap() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">{t.roadmap.badge}</span>
                    <h2 className="text-4xl font-bold font-display text-gray-900 mt-2">{t.roadmap.title}</h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    {t.roadmap.phases.map((phase, index) => {
                        const status = getPhaseStatus(phase.date);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-emerald-100 last:border-l-0"
                            >
                                <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white ${status === 'completed' ? 'bg-emerald-500' :
                                    status === 'current' ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-300'
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
