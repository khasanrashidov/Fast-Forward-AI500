import {
  Lightbulb,
  NotebookPen,
  ShieldCheck,
  Rocket,
  Target,
  Coins,
  Boxes,
  Landmark,
  HandCoins,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TipsDialog, type TipSlide } from './tips-dialog';

type Tip = {
  title: string;
  description: string;
  tip?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const tips: Tip[] = [
  {
    title: 'Start With a Clear Budget',
    description:
      'Track income and expenses monthly. Use mobile tools to monitor activity, savings, and repayments automatically. Follow the 50/30/20 rule.',
    tip: '50% needs, 30% wants, 20% savings or debt repayment.',
    badge: 'Budgeting',
    icon: NotebookPen,
  },
  {
    title: 'Build an Emergency Fund',
    description:
      'Save 3–6 months of expenses in reliable deposits (e.g., “Comfort” or “Sandiq” ~21% in UZS) to cover job loss or unexpected costs.',
    badge: 'Safety',
    icon: ShieldCheck,
  },
  {
    title: 'Apply the FIRE Principle',
    description:
      'Spend less than you earn, save/invest aggressively (50–70% if possible), and aim for passive income via deposits, investments, or business.',
    badge: 'FIRE',
    icon: Rocket,
  },
  {
    title: 'Avoid Bad Debt — Use Loans Wisely',
    description:
      'Use education loans or microloans for productive goals, not consumption. Borrow only if it increases your earning capacity.',
    badge: 'Smart Debt',
    icon: Target,
  },
  {
    title: 'Automate Your Savings',
    description:
      'Auto-transfer part of your salary to a deposit each month. Automation builds consistency and reduces impulse spending.',
    badge: 'Automation',
    icon: HandCoins,
  },
  {
    title: 'Invest Early and Regularly',
    description:
      'Small, regular deposits grow through compounding (e.g., “Progress” deposit with top-ups). Time in the market beats timing the market.',
    badge: 'Investing',
    icon: Coins,
  },
  {
    title: 'Educate Yourself Constantly',
    description:
      'Learn from free platforms (Coursera, Khan Academy, Investopedia) and bank resources. Ask consultants for tailored advice.',
    badge: 'Learning',
    icon: Lightbulb,
  },
  {
    title: 'Plan for Retirement Early',
    description:
      'Start now, even with small amounts. Compound growth and long-term deposits accelerate financial independence.',
    badge: 'Retirement',
    icon: Landmark,
  },
  {
    title: 'Diversify Your Assets',
    description:
      'Mix high-yield deposits, long-term investments (real estate, pension funds, business), and FX deposits for currency protection.',
    badge: 'Diversification',
    icon: Boxes,
  },
  {
    title: 'Set SMART Financial Goals',
    description:
      'Make goals Specific, Measurable, Achievable, Relevant, and Time-bound (e.g., save 20M UZS in 12 months for a business fund).',
    badge: 'Goals',
    icon: Target,
  },
];

export const dynamic = 'force-static';

export default function FinancialTipsPage() {
  const slides: TipSlide[] = [
    {
      title: 'Start With a Clear Budget',
      description: tips[0].description,
      illustration: '/undraw_wallet_diag.svg',
    },
    {
      title: 'Build an Emergency Fund',
      description: tips[1].description,
      illustration: '/undraw_vault_tyfh.svg',
    },
    {
      title: 'Apply the FIRE Principle',
      description: tips[2].description,
      illustration: '/undraw_investing_uzcu.svg',
    },
    {
      title: 'Avoid Bad Debt — Use Loans Wisely',
      description: tips[3].description,
      illustration: '/undraw_finance_m6vw.svg',
    },
    {
      title: 'Automate Your Savings',
      description: tips[4].description,
      illustration: '/undraw_success-factors_i417.svg',
    },
    {
      title: 'Invest Early and Regularly',
      description: tips[5].description,
      illustration: '/undraw_revenue_kv38.svg',
    },
    {
      title: 'Educate Yourself Constantly',
      description: tips[6].description,
      illustration: '/undraw_brainstorming_gny9.svg',
    },
    {
      title: 'Plan for Retirement Early',
      description: tips[7].description,
      illustration: '/undraw_personal-finance_xpqg.svg',
    },
    {
      title: 'Diversify Your Assets',
      description: tips[8].description,
      illustration: '/undraw_houses_owky.svg',
    },
    {
      title: 'Set SMART Financial Goals',
      description: tips[9].description,
      illustration: '/undraw_target_d6hf.svg',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">
            Financial Tips
          </h1>
          <p className="text-muted-foreground">
            Quick, actionable guidance to strengthen your finances. Swipe through illustrations in
            the dialog.
          </p>
        </div>
        <TipsDialog tips={slides} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <Card
              key={tip.title}
              className="border border-primary/15 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-white/70 border border-white/50 flex items-center justify-center shadow-sm">
                    <Icon className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-base font-semibold leading-snug">
                    {tip.title}
                  </CardTitle>
                </div>
                {tip.badge ? (
                  <Badge className="text-[11px] bg-primary/15 text-primary border border-primary/25">
                    {tip.badge}
                  </Badge>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-foreground">
                <p className="leading-relaxed">{tip.description}</p>
                {tip.tip ? (
                  <div className="rounded-md border border-primary/20 bg-white/70 px-3 py-2 text-[13px] text-foreground">
                    <span className="font-semibold text-[var(--primary)]">Tip:</span> {tip.tip}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
