"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Target,
  Lightbulb,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Settings,
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
        { icon: Target, label: "Goals", href: "/goals" },
        { icon: Lightbulb, label: "Insights", href: "/insights" },
    ];

    return (
        <aside
            className={`hidden md:flex fixed left-0 top-0 h-full bg-white border-r border-gray-100 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="p-5 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50">
                    <Image src="/logo.png" alt="Moliyachi" fill className="object-contain p-1.5" sizes="40px" />
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col leading-tight">
                        <span className="font-outfit font-bold text-lg text-emerald-700">
                            Moliyachi
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.08em] text-emerald-500">
                            Financial Hub
                        </span>
                    </div>
                )}
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                                }`}
                        >
                            <item.icon size={20} className={isActive ? "text-emerald-700 ml-[2px]" : "text-zinc-400 group-hover:text-zinc-700 ml-[2px]"} />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-100">
                <Link
                    href="/onboarding"
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                >
                    <Settings size={20} className="text-zinc-400 group-hover:text-zinc-700 ml-[2px]" />
                    {!isCollapsed && <span className="font-medium">Onboarding</span>}
                </Link>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`mt-2 w-full flex items-center p-2 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                >
                    {!isCollapsed && <span className="font-medium ml-2">Collapse</span>}
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
}
