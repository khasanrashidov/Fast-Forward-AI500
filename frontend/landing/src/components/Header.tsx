'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { ExternalLink, Menu, X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="relative w-8 h-8">
            <Image src="/logo.png" alt="Moliyachi Logo" fill className="object-contain" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">Moliyachi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/ask"
            className="px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all flex items-center gap-2 group border border-emerald-100"
          >
            <Sparkles
              size={16}
              className="text-emerald-500 group-hover:scale-110 transition-transform"
            />
            Ask our AI
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

        {/* Mobile Navigation Toggle & Language Switcher */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link
                href="/ask"
                onClick={closeMenu}
                className="px-4 py-3 text-base font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all flex items-center gap-2"
              >
                <Sparkles size={18} className="text-emerald-500" />
                Ask our AI
              </Link>
              <Link
                href="/demo"
                onClick={closeMenu}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
              >
                Demo
              </Link>
              <a
                href="https://fast-forward-apty.onrender.com/docs/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-2"
              >
                API Docs
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
