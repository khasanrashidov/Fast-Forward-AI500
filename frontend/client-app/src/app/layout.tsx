import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Toaster } from '@/components/ui/sonner';
import { RouteChangeHandler } from '@/components/RouteChangeHandler';
// import { GlobalLoader } from '@/components/GlobalLoader';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moliyachi',
  description: 'Modern Mobile-First Fintech Application',
  icons: {
    icon: '/logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-white text-gray-900 font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          {/* <GlobalLoader /> */}
          <Suspense fallback={null}>
            <RouteChangeHandler />
          </Suspense>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
