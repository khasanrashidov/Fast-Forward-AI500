"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Rocket,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserRoundCheck,
} from "lucide-react";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: "Dashboard", href: "/" },
        { icon: CreditCard, label: "Transactions", href: "/transactions" },
        { icon: Rocket, label: "Goals", href: "/goals" },
        { icon: Sparkles, label: "Insights", href: "/insights" },
    ];

    return (
        <aside
            className={`hidden md:flex fixed left-0 top-0 h-full bg-white border-r border-zinc-200/70 transition-all duration-200 z-50 flex flex-col ${isCollapsed ? "w-16" : "w-64"
                }`}
        >
            <div className="flex items-center gap-3 py-4 ps-4">
                <div className="relative h-9 w-9 overflow-hidden rounded-md border border-zinc-200 bg-white">
                    <Image src="/logo.png" alt="Moliyachi" fill className="object-contain w-full h-full p-1" sizes="36px" />
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col leading-tight">
                        <span className="font-outfit font-semibold text-base text-zinc-900">
                            Moliyachi
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.08em] text-zinc-500">
                            Financial Hub
                        </span>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-2.5 py-2 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-3 transition-colors ${isActive
                                ? "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)] border border-[color-mix(in_srgb,var(--primary)_25%,transparent)]"
                                : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 border border-transparent" // invincible border
                                }`}
                        >
                            <item.icon
                                size={18}
                                strokeWidth={isActive ? 2.4 : 2}
                                className={isActive ? "text-[var(--primary)]" : "text-zinc-400"}
                            />
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-2.5 border-t border-zinc-200/70">
                <Link
                    href="/onboarding"
                    className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                >
                    <UserRoundCheck size={18} className="text-zinc-500" />
                    {!isCollapsed && <span className="text-sm font-medium">Onboarding</span>}
                </Link>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`mt-2 w-full flex items-center p-2 rounded-md text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                >
                    {!isCollapsed && <span className="text-sm font-medium ml-2">Collapse</span>}
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>
        </aside>
    );
}
