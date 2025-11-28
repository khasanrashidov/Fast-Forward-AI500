"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/data/translations';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                    <Globe size={20} className="text-emerald-600" />
                    <span className="font-medium text-gray-700 hidden sm:inline">{currentLang.name}</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden min-w-[180px]"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors ${language === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                                        }`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                    {language === lang.code && (
                                        <span className="ml-auto text-emerald-600">✓</span>
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
