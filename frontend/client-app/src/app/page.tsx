import { Suspense } from 'react';

import { UserHeader, UserHeaderSkeleton } from './dashboard/user-header';
import { SummaryCards, SummaryCardsSkeleton } from './dashboard/summary-cards';
import { SpendingChart, SpendingChartSkeleton } from './dashboard/spending-chart';
import { AIInsightsCard, AIInsightsCardSkeleton } from './dashboard/ai-insights-card';
import { AlertsCard, AlertsCardSkeleton } from './dashboard/alerts-card';
import { CardsSection, CardsSectionSkeleton } from './dashboard/cards-section';
import { getDashboard, getDashboardInsights } from '@/lib/services/dashboard';
import { getUser } from '@/lib/services/users';
import { getCards } from '@/lib/services/cards';

export default function DashboardPage() {
  // Fire ALL API calls immediately in parallel - don't await, just start them
  // React's cache() will deduplicate when components call the same functions
  getDashboard();
  getUser();
  getCards();
  getDashboardInsights(); // LLM-based, will take longer but starts now

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header - User name */}
      <Suspense fallback={<UserHeaderSkeleton />}>
        <UserHeader />
      </Suspense>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-9 grid gap-4">
          {/* Summary Cards - Income, Spending, Savings, Health Score */}
          <Suspense fallback={<SummaryCardsSkeleton />}>
            <SummaryCards />
          </Suspense>

          {/* Middle Row - Spending Chart, AI Insights, Alerts */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Suspense fallback={<SpendingChartSkeleton />}>
              <SpendingChart />
            </Suspense>

            <Suspense fallback={<AIInsightsCardSkeleton />}>
              <AIInsightsCard />
            </Suspense>

            <Suspense fallback={<AlertsCardSkeleton />}>
              <AlertsCard />
            </Suspense>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="col-span-12 lg:col-span-3">
          <Suspense fallback={<CardsSectionSkeleton />}>
            <CardsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
