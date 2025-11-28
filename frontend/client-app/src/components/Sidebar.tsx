"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Home, CreditCard, Target, Lightbulb, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";

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
        { icon: Lightbulb, label: "AI Insights", href: "/ai-insights" },
        { icon: LayoutDashboard, label: "Showcase", href: "/showcase" },
    ];

    return (
        <aside
            className={`hidden md:flex fixed left-0 top-0 h-full bg-white border-r border-gray-100 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="p-6 flex items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                    <Image src="/logo.png" alt="Moliyachi Logo" fill className="object-contain" />
                </div>
                {!isCollapsed && (
                    <span className="font-outfit font-bold text-xl text-emerald-600 whitespace-nowrap">
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
                                ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={20} className={isActive ? "text-emerald-600 ml-[2px]" : "text-gray-400 group-hover:text-gray-600 ml-[2px]"} />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`w-full flex items-center p-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                >
                    {!isCollapsed && <span className="font-medium ml-2">Collapse</span>}
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
}
