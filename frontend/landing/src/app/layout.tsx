import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import CursorFollower from "@/components/CursorFollower";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moliyachi - Smart Financial AI Assistant",
  description: "Your AI-powered personal finance assistant inside Agrobank Mobile.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <ReactLenis root>
            <CursorFollower />
            <LanguageSwitcher />
            {children}
          </ReactLenis>
        </LanguageProvider>
      </body>
    </html>
  );
}
