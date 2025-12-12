import { getUser } from '@/lib/services/users';
import { getCards } from '@/lib/services/cards';
import { DashboardCards } from './dashboard-cards';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export async function CardsSection() {
  let user;
  let cards = [];

  try {
    [user, cards] = await Promise.all([getUser(), getCards()]);
  } catch {
    return (
      <Card>
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          Failed to load cards
        </CardContent>
      </Card>
    );
  }

  return <DashboardCards initialCards={cards} username={user.username} />;
}

export function CardsSectionSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 w-full bg-gradient-to-br from-muted to-muted/50 rounded-xl animate-pulse"
          />
        ))}
      </CardContent>
    </Card>
  );
}

