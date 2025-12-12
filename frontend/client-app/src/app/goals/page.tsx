import { getTranslations } from 'next-intl/server';

import { GoalsClient } from './goals-client';
import { getGoals } from '@/lib/services/goals';
import { getUser } from '@/lib/services/users';
import { ErrorState } from '@/components/ui/error-state';

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
  const t = await getTranslations('goals');

  try {
    const [goals, user] = await Promise.all([getGoals(), getUser()]);
    return <GoalsClient initialGoals={goals} userId={user.id} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="p-4 sm:p-6">
        <ErrorState title={t('failedToLoad')} description={t('tryAgain')} />
      </div>
    );
  }
}
