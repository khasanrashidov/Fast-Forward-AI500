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
import { getTranslations } from 'next-intl/server';

type Tip = {
  title: string;
  description: string;
  tip?: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const icons = [
  NotebookPen,
  ShieldCheck,
  Rocket,
  Target,
  HandCoins,
  Coins,
  Lightbulb,
  Landmark,
  Boxes,
  Target,
];

const illustrations = [
  '/undraw_wallet_diag.svg',
  '/undraw_vault_tyfh.svg',
  '/undraw_investing_uzcu.svg',
  '/undraw_finance_m6vw.svg',
  '/undraw_success-factors_i417.svg',
  '/undraw_revenue_kv38.svg',
  '/undraw_brainstorming_gny9.svg',
  '/undraw_personal-finance_xpqg.svg',
  '/undraw_houses_owky.svg',
  '/undraw_target_d6hf.svg',
];

export default async function FinancialTipsPage() {
  const t = await getTranslations('financialTips');

  const tips: Tip[] = [
    {
      title: t('tip1Title'),
      description: t('tip1Desc'),
      tip: t('tip1Tip'),
      badge: t('tip1Badge'),
      icon: icons[0],
    },
    {
      title: t('tip2Title'),
      description: t('tip2Desc'),
      badge: t('tip2Badge'),
      icon: icons[1],
    },
    {
      title: t('tip3Title'),
      description: t('tip3Desc'),
      badge: t('tip3Badge'),
      icon: icons[2],
    },
    {
      title: t('tip4Title'),
      description: t('tip4Desc'),
      badge: t('tip4Badge'),
      icon: icons[3],
    },
    {
      title: t('tip5Title'),
      description: t('tip5Desc'),
      badge: t('tip5Badge'),
      icon: icons[4],
    },
    {
      title: t('tip6Title'),
      description: t('tip6Desc'),
      badge: t('tip6Badge'),
      icon: icons[5],
    },
    {
      title: t('tip7Title'),
      description: t('tip7Desc'),
      badge: t('tip7Badge'),
      icon: icons[6],
    },
    {
      title: t('tip8Title'),
      description: t('tip8Desc'),
      badge: t('tip8Badge'),
      icon: icons[7],
    },
    {
      title: t('tip9Title'),
      description: t('tip9Desc'),
      badge: t('tip9Badge'),
      icon: icons[8],
    },
    {
      title: t('tip10Title'),
      description: t('tip10Desc'),
      badge: t('tip10Badge'),
      icon: icons[9],
    },
  ];

  const slides: TipSlide[] = tips.map((tip, i) => ({
    title: tip.title,
    description: tip.description,
    illustration: illustrations[i],
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <TipsDialog
          tips={slides}
          viewIllustrations={t('viewIllustrations')}
          swipeThrough={t('swipeThrough')}
          prev={t('prev')}
          next={t('next')}
        />
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
                  <div className="h-9 w-9 shrink-0 rounded-full bg-white/70 border border-white/50 flex items-center justify-center shadow-sm">
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
                    <span className="font-semibold text-[var(--primary)]">{t('tip')}</span>{' '}
                    {tip.tip}
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
