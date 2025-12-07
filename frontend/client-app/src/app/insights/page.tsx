import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDashboard } from '@/lib/services/dashboard';
import { getUser } from '@/lib/services/users';
import { AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const [dashboard, user] = await Promise.all([getDashboard(), getUser()]);
  const { insights, alerts, health_score } = dashboard;

  const healthTone = (health_score.color || '').toLowerCase();
  const healthBadge =
    healthTone === 'green'
      ? { className: 'bg-green-100 text-green-700 border border-green-200', label: 'On Track' }
      : healthTone === 'yellow'
        ? {
            className: 'bg-amber-100 text-amber-700 border border-amber-200',
            label: 'Needs Attention',
          }
        : healthTone === 'red'
          ? { className: 'bg-rose-100 text-rose-700 border border-rose-200', label: 'Critical' }
          : null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--primary)]">AI Insights</h1>
        <p className="text-muted-foreground">Smart analysis of your financial health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-4 bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
              Financial Health
              {healthBadge && (
                <Badge className={`text-xs font-semibold ${healthBadge.className}`}>
                  {healthBadge.label}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold">{health_score.score} / 100</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">User:</span>{' '}
              <span className="text-foreground">
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">Email:</span>{' '}
              <span className="text-foreground">{user.email}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">Status:</span>{' '}
              <span className="text-foreground">{health_score.status}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">Age:</span>{' '}
              <span className="text-foreground">{user.age}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">Family Size:</span>{' '}
              <span className="text-foreground">{user.family_size}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-[var(--primary)] font-semibold">Location:</span>{' '}
              <span className="text-foreground">{user.location}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-8 flex flex-col bg-gradient-to-br from-primary/5 via-primary/8 to-accent/10 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.length === 0 ? (
              <p className="text-sm text-muted-foreground">No insights yet.</p>
            ) : (
              insights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-primary/25 bg-white/80 p-3 text-sm text-foreground"
                >
                  {item}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="flex flex-col">
        <CardHeader className="flex items-center gap-2 pb-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts at this time.</p>
          ) : (
            alerts.map((alert, idx) => (
              <div key={idx} className="text-sm text-foreground">
                {alert}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
