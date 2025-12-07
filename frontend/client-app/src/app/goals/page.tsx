import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { GoalsClient } from './goals-client';
import { getGoals } from '@/lib/services/goals';
import { getUser } from '@/lib/services/users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
  const t = await getTranslations('goals');

  try {
    const [goals, user] = await Promise.all([getGoals(), getUser()]);
    return <GoalsClient initialGoals={goals} userId={user.id} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="p-6">
        <Card className="border-destructive/20">
          <CardHeader className="flex items-center gap-2 text-destructive">
            <Info className="h-4 w-4" />
            <CardTitle>{t('failedToLoad')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{t('tryAgain')}</CardContent>
        </Card>
      </div>
    );
  }
}
