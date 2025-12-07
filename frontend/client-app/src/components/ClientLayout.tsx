"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <>
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />
            <main
                className={`min-h-screen pb-20 md:pb-0 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
                    }`}
            >
                <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-5 md:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <BottomNav />
        </>
    );
}
