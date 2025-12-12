import { getLocale } from 'next-intl/server';

import { getGoalTimelineInterpretation } from '@/lib/services/goals';

type Props = {
  goalId: string;
};

export async function TimelineInterpretation({ goalId }: Props) {
  const locale = await getLocale();

  let interpretation: string | null = null;

  try {
    const data = await getGoalTimelineInterpretation(goalId, undefined, locale);
    interpretation = data.interpretation ?? null;
  } catch (error) {
    console.error('Failed to load timeline interpretation:', error);
  }

  if (!interpretation) {
    return null;
  }

  return (
    <div className="rounded border bg-muted/40 p-2 sm:p-3 text-[10px] sm:text-xs text-foreground leading-relaxed">
      {interpretation}
    </div>
  );
}

export function TimelineInterpretationSkeleton() {
  return (
    <div className="rounded border bg-muted/40 p-2 sm:p-3">
      <div className="space-y-1.5">
        <div className="h-3 bg-muted-foreground/10 rounded w-full animate-pulse" />
        <div className="h-3 bg-muted-foreground/10 rounded w-11/12 animate-pulse" />
        <div className="h-3 bg-muted-foreground/10 rounded w-4/5 animate-pulse" />
      </div>
    </div>
  );
}

