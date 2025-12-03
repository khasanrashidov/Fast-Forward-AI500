"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Moliyachi Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">Moliyachi</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link 
            href="/demo"
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          >
            <span className="font-medium text-sm">{t.nav.demo}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
