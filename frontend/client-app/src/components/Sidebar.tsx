"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowRightLeft, Target, Sparkles, Store, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
    { name: "Main", href: "/", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
    { name: "Goals", href: "/goals", icon: Target },
    { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
    { name: "Showcase", href: "/showcase", icon: Store },
];

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={`hidden md:flex flex-col h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-50 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4 shrink-0">
                {!isCollapsed && (
                    <span className="text-2xl font-bold text-primary font-outfit truncate">
                        AgroSense AI
                    </span>
                )}
                {isCollapsed && (
                    <span className="text-2xl font-bold text-primary font-outfit mx-auto">
                        🍀
                    </span>
                )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        } ${isCollapsed ? "justify-center px-2" : ""}`}
                                    title={isCollapsed ? item.name : ""}
                                >
                                    <Icon size={20} className={isCollapsed ? "" : "mr-3"} />
                                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 shrink-0">
                <button
                    onClick={toggleSidebar}
                    className={`flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors`}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </aside>
    );
}
