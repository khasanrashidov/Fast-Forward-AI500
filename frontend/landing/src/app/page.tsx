'use client';

import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Team from '@/components/Team';
import WhyUs from '@/components/WhyUs';
import Roadmap from '@/components/Roadmap';
import Methodology from '@/components/Methodology';
import { Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const dynamic = 'force-dynamic';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Hero />
      <ProblemSolution />
      <WhyUs />
      <Roadmap />
      <Methodology />
      <Team />

      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-50 border-t border-gray-100">
        <p>{t.footer.copyright}</p>
        <a
          href="https://github.com/khasanrashidov/Fast-Forward-AI500"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 hover:text-emerald-600 transition-colors underline decoration-gray-300 hover:decoration-emerald-600"
        >
          <Github size={18} />
          {t.footer.githubLink}
        </a>
      </footer>
    </main>
  );
}
