import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ExternalLink,
  HeartPulse,
  Lightbulb,
  Rocket,
  ShoppingBag,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react';

const features = [
  {
    title: 'AI Spending Insights',
    description:
      'Short, actionable explanations of where your money goes. Understand your spending patterns with AI-powered analysis.',
    icon: BarChart3,
    href: '/transactions',
    badge: 'Analytics',
  },
  {
    title: 'Smart Monthly Planning',
    description:
      'Warnings when spending is too fast & balance predictions. Stay on track with intelligent alerts.',
    icon: CalendarClock,
    href: '/',
    badge: 'Dashboard',
  },
  {
    title: 'Financial Health Score',
    description:
      'One simple score (0–100) explaining your stability. Know exactly where you stand financially.',
    icon: HeartPulse,
    href: '/insights',
    badge: 'Insights',
  },
  {
    title: 'Goal Planning',
    description:
      'AI calculates timelines and suggests improvements. Set goals and track your progress with Monte Carlo simulations.',
    icon: Target,
    href: '/goals',
    badge: 'Goals',
  },
  {
    title: 'Personalized Recommendations',
    description:
      'Based on spending patterns, habits, income, and goals. Get tailored advice to improve your finances.',
    icon: Lightbulb,
    href: '/financial-tips',
    badge: 'Tips',
  },
  {
    title: 'Agrobank Product Matching',
    description:
      'AI suggests Microloans, Deposits, Savings, and Installment options. Find the right products for your needs.',
    icon: ShoppingBag,
    href: '/ai-shop',
    badge: 'AI Shop',
  },
];

export default function ShowcasePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/15 border border-primary/20 p-8 md:p-12">
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-4 bg-primary/15 text-primary border border-primary/25">
            <Sparkles className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Meet <span className="text-primary">Moliyachi</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            A smart financial assistant fully embedded into Agrobank Mobile that transforms it from
            a transaction tool into a{' '}
            <span className="text-foreground font-medium">financial partner</span>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://moliyachi-landing.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                Visit Landing Page
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2" />
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
        </div>
        <p className="text-muted-foreground">
          Explore all the intelligent features that make Moliyachi your personal finance companion.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.title} href={feature.href} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[11px] shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* CTA Section */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-primary/20 bg-white shadow-sm">
              <Image
                src="/logo.png"
                alt="Moliyachi"
                fill
                className="object-contain p-2"
                sizes="64px"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground">Ready to take control?</h3>
              <p className="text-sm text-muted-foreground">
                Start your journey to financial wellness with Moliyachi today.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://moliyachi-landing.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                Learn More
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
