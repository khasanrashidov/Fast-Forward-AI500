'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <main
        className={`min-h-screen pb-20 md:pb-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top bar with language switcher */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-zinc-100">
          <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-5 md:px-6 lg:px-8">
            <div className="flex justify-end items-center h-12">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1500px] px-0 sm:px-5 md:px-6 lg:px-8">{children}</div>
      </main>
      <BottomNav />
    </>
  );
}
