'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Methodology() {
  const { t } = useLanguage();
  const [openStep, setOpenStep] = useState<number | null>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOpenStep((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % t.methodology.steps.length;
      });
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, t.methodology.steps.length]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
            {t.methodology.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.methodology.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps - Accordion */}
          <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">
              {t.methodology.stepsTitle}
            </h3>
            <div className="space-y-4">
              {t.methodology.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    openStep === index
                      ? 'bg-emerald-50 border-emerald-200 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-emerald-100'
                  }`}
                >
                  <button
                    onClick={() => setOpenStep(openStep === index ? null : index)}
                    className="w-full flex items-center gap-4 p-4 text-left transition-colors"
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                        openStep === index
                          ? 'bg-emerald-600 text-white scale-110'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`font-medium flex-1 transition-colors ${
                        openStep === index ? 'text-emerald-900' : 'text-gray-700'
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.futurePlan && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full border border-gray-200">
                        Future Plan
                      </span>
                    )}
                    {openStep === index && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                    )}
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${
                        openStep === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openStep === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">
              {t.methodology.techStackTitle}
            </h3>
            <div className="grid gap-6">
              {t.methodology.stack.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
                >
                  <h4 className="text-emerald-600 font-bold mb-4 uppercase text-sm tracking-wider">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
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
