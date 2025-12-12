import Link from 'next/link';
import { Home, MapPinOff } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* 404 Code */}
        <div className="relative">
          <span className="text-[120px] sm:text-[160px] font-bold leading-none tracking-tighter text-primary/10 select-none">
            {t('code')}
          </span>
        </div>

        {/* Text content */}
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Action button */}
        <Button asChild size="lg" className="mt-4 gap-2 shadow-md">
          <Link href="/">
            <Home className="h-4 w-4" />
            {t('backHome')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
