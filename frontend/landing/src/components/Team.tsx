"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const teamData = [
    {
        linkedin: "https://www.linkedin.com/in/azizullo",
        github: "https://github.com/azakapro",
        image: "/azizulloh.jpeg",
    },
    {
        linkedin: "https://www.linkedin.com/in/khasanr",
        github: "https://github.com/khasanrashidov",
        image: "/khasanr.jpg",
        isTeamLead: true,
    },
    {
        linkedin: "https://www.linkedin.com/in/xkhusan",
        github: "https://github.com/xkhusan",
        image: "/khusan.jpeg",
    },
    {
        linkedin: "https://www.linkedin.com/in/burkhonjon-solihjonov",
        github: "https://github.com/black-belt-engineer",
        image: "/burxonjon.jpeg",
    },
    {
        linkedin: "https://www.linkedin.com/in/bakhtiyorjon-bokhodirov",
        github: "https://github.com/Fasttyper",
        image: "/bakhtiyorjon.jpeg",
    },
];

export default function Team() {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">{t.team.title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t.team.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.team.members.map((member, index) => {
                        const data = teamData[index];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all duration-300 group ${hoveredIndex !== null && hoveredIndex !== index
                                        ? "opacity-40 grayscale"
                                        : "hover:border-emerald-200"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                        <Image
                                            src={data.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                {member.name}
                                            </h3>
                                            {data.isTeamLead && (
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-[2px]">
                                                    {t.team.teamLead}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-emerald-600 font-medium text-sm">{member.role}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.desc}</p>

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <Link href={data.linkedin} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
                                        <Linkedin size={18} />
                                    </Link>
                                    <Link href={data.github} target="_blank" className="text-gray-400 hover:text-gray-900 transition-colors">
                                        <Github size={18} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
