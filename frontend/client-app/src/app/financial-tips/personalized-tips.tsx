import { Sparkles, Brain, Scale, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PersonalizedTips() {
  const tips = [
    {
      title: 'Educate Yourself Constantly',
      description:
        'Financial literacy is key. Allocate time each week to read books, articles, or take courses on investing and money management.',
      icon: Brain,
    },
    {
      title: 'Avoid Bad Debt — Use Loans Wisely',
      description:
        'Distinguish between good debt (investments) and bad debt (consumer goods). Prioritize paying off high-interest liabilities.',
      icon: Scale,
    },
    {
      title: 'Set SMART Financial Goals',
      description:
        'Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound to track progress and stay motivated.',
      icon: Target,
    },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Personal financial tips for you
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tips.map((tip) => (
          <Card
            key={tip.title}
            className="border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-950 dark:to-indigo-950/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <tip.icon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-semibold leading-tight">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
