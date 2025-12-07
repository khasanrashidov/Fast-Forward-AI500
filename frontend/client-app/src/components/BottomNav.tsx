"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowRightLeft, Rocket, Sparkles, GalleryVerticalEnd, BookOpen } from "lucide-react";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
    { name: "Goals", href: "/goals", icon: Rocket },
    { name: "Insights", href: "/insights", icon: Sparkles },
    { name: "Tips", href: "/financial-tips", icon: BookOpen },
    { name: "Showcase", href: "/showcase", icon: GalleryVerticalEnd },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-[var(--primary)]" : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
