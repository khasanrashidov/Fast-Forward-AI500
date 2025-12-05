'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/logo.png" alt="Moliyachi Logo" fill className="object-contain" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">Moliyachi</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/ask"
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          >
            Ask AI
          </Link>
          <Link
            href="/demo"
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          >
            Demo
          </Link>
          <a
            href="https://fast-forward-apty.onrender.com/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all flex items-center gap-1"
          >
            API Docs
            <ExternalLink size={14} />
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
