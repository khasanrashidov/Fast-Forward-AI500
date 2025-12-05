"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CreditCard, Target, Lightbulb, LayoutDashboard, ChevronLeft, ChevronRight, Settings, Wallet } from "lucide-react";

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
            <div className="p-6 flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                    <Wallet className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                {!isCollapsed && (
                    <span className="font-outfit font-bold text-xl text-blue-600 whitespace-nowrap">
                        Moliyachi
                    </span>
                )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                                }`}
                        >
                            <item.icon size={20} className={isActive ? "text-zinc-900 dark:text-zinc-50 ml-[2px]" : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 ml-[2px]"} />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                    href="/onboarding"
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50`}
                >
                    <Settings size={20} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 ml-[2px]" />
                    {!isCollapsed && <span className="font-medium">Onboarding</span>}
                </Link>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`mt-2 w-full flex items-center p-2 rounded-xl text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'} dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50`}
                >
                    {!isCollapsed && <span className="font-medium ml-2">Collapse</span>}
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
}
