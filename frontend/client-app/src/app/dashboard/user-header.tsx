import { getTranslations } from 'next-intl/server';

import { getUser } from '@/lib/services/users';

export async function UserHeader() {
  const t = await getTranslations('dashboard');

  let user;
  try {
    user = await getUser();
  } catch {
    // Silently fail, show welcome
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--primary)]">
          {user ? `${user.first_name} ${user.last_name}` : t('welcome')}
        </h1>
      </div>
      <p className="text-sm sm:text-base text-zinc-500">{t('overview')}</p>
    </div>
  );
}

export function UserHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="h-8 sm:h-9 w-48 bg-muted rounded animate-pulse" />
      </div>
      <div className="h-4 sm:h-5 w-64 bg-muted rounded animate-pulse" />
    </div>
  );
}

