'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Home,
  ArrowRightLeft,
  Rocket,
  Sparkles,
  GalleryVerticalEnd,
  BookOpen,
  ShoppingBag,
} from 'lucide-react';

const navItems = [
  { labelKey: 'home', href: '/', icon: Home },
  { labelKey: 'transactions', href: '/transactions', icon: ArrowRightLeft },
  { labelKey: 'goals', href: '/goals', icon: Rocket },
  { labelKey: 'insights', href: '/insights', icon: Sparkles },
  { labelKey: 'aiShop', href: '/ai-shop', icon: ShoppingBag },
  { labelKey: 'tips', href: '/financial-tips', icon: BookOpen },
  { labelKey: 'showcase', href: '/showcase', icon: GalleryVerticalEnd },
];

export default function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-[var(--primary)]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
