import { Info } from 'lucide-react';

import { GoalsClient } from './goals-client';
import { getGoals } from '@/lib/services/goals';
import { getUser } from '@/lib/services/users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
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
            <CardTitle>Failed to load goals.</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Please try again shortly.
          </CardContent>
        </Card>
      </div>
    );
  }
}
