import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import CursorFollower from '@/components/CursorFollower';
import { ReactLenis } from 'lenis/react';
import Header from '@/components/Header';
import ChatWidget from '@/components/ChatWidget';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Moliyachi AI - Your Personal Finance Assistant',
  description: 'AI-powered financial assistant integrated into Agrobank Mobile',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      >
        <LanguageProvider>
          <ReactLenis root>
            <CursorFollower />
            <Header />
            {children}
            <ChatWidget />
          </ReactLenis>
        </LanguageProvider>
      </body>
    </html>
  );
}
