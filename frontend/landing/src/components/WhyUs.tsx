'use client';

import { motion } from 'framer-motion';
import { Zap, Users, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhyUs() {
  const { t } = useLanguage();

  const icons = [Zap, Users, Code2];

  return (
    <section className="py-24 bg-emerald-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">{t.whyUs.title}</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">{t.whyUs.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.whyUs.reasons.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-300 mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-emerald-100/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
