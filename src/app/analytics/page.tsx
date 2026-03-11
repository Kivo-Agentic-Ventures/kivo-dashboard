import { fetchIdeas, fetchVentures } from "@/lib/notion";
import type { Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import RefreshButton from "@/components/refresh-button";
import { cn } from "@/lib/cn";
import { DollarSign, Eye, ArrowRight, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default async function AnalyticsPage() {
  const [ideas, ventures] = await Promise.all([fetchIdeas(), fetchVentures()]);

  const totalRevenue = ventures.reduce((sum, v) => sum + v.totalRevenue, 0);
  const monthlyRevenue = ventures.reduce((sum, v) => sum + v.monthlyRevenue, 0);
  const totalVisitors = ventures.reduce((sum, v) => sum + v.visitors, 0);
  const totalConversions = ventures.reduce((sum, v) => sum + v.conversions, 0);
  const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

  const pursueCount = ideas.filter((i) => i.shouldPursue).length;
  const deployedCount = ventures.filter((v) =>
    ["deploy", "marketing", "complete"].includes(v.stage)
  ).length;
  const revenueVentures = ventures.filter((v) => v.totalRevenue > 0);

  // Funnel stages
  const funnel = [
    { label: "Ideas Received", value: ideas.length },
    { label: "Should Pursue", value: pursueCount },
    { label: "Ventures Started", value: ventures.length },
    { label: "Deployed", value: deployedCount },
    { label: "Generating Revenue", value: revenueVentures.length },
  ];
  const funnelMax = Math.max(...funnel.map((f) => f.value), 1);

  // Revenue by stage
  const revenueByStage = STAGES.map((stage) => {
    const stageVentures = ventures.filter((v) => v.stage === stage);
    return {
      stage,
      revenue: stageVentures.reduce((sum, v) => sum + v.totalRevenue, 0),
      count: stageVentures.length,
    };
  }).filter((s) => s.count > 0);

  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium leading-[130%] tracking-[-0.24px] text-text-main">
            Analytics
          </h1>
          <p className="text-sm/[150%] text-text-soft mt-1">Revenue and performance metrics</p>
        </div>
        <RefreshButton />
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign className="h-4 w-4" />}
          accent
        />
        <MetricCard
          label="Monthly Revenue"
          value={formatCurrency(monthlyRevenue)}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          label="Total Visitors"
          value={formatNumber(totalVisitors)}
          icon={<Eye className="h-4 w-4" />}
        />
        <MetricCard
          label="Conversions"
          value={formatNumber(totalConversions)}
          icon={<ArrowRight className="h-4 w-4" />}
        />
        <MetricCard
          label="Conv. Rate"
          value={`${conversionRate.toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* Funnel + Revenue by stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion funnel */}
        <div className="rounded-2xl border border-border-surface bg-background-main p-6 shadow-button-sm">
          <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft mb-5">
            Conversion Funnel
          </h2>
          <div className="space-y-3">
            {funnel.map((step, i) => {
              const width = Math.max((step.value / funnelMax) * 100, 4);
              const rate = i > 0 && funnel[i - 1].value > 0
                ? ((step.value / funnel[i - 1].value) * 100).toFixed(0)
                : null;
              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm/[150%] text-text-sub">{step.label}</span>
                    <div className="flex items-center gap-2">
                      {rate && (
                        <span className="font-mono text-xs text-text-muted">{rate}%</span>
                      )}
                      <span className="font-semibold text-sm tabular-nums text-text-main">
                        {step.value}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-background-soft overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand transition-[width] duration-300"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue by stage */}
        <div className="rounded-2xl border border-border-surface bg-background-main p-6 shadow-button-sm">
          <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft mb-5">
            Revenue by Stage
          </h2>
          {revenueByStage.length === 0 ? (
            <p className="text-sm/[150%] text-text-muted text-center py-10">
              No revenue data yet
            </p>
          ) : (
            <div className="space-y-3">
              {revenueByStage.map((s) => {
                const maxRev = Math.max(...revenueByStage.map((r) => r.revenue), 1);
                const width = Math.max((s.revenue / maxRev) * 100, 4);
                return (
                  <div key={s.stage}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm/[150%] text-text-sub capitalize">{s.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-text-muted">
                          {s.count} venture{s.count !== 1 ? "s" : ""}
                        </span>
                        <span className="font-semibold text-sm tabular-nums text-text-main">
                          {formatCurrency(s.revenue)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-background-soft overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand/60 transition-[width] duration-300"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top ventures table */}
      <div className="rounded-2xl border border-border-surface bg-background-main shadow-button-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border-surface">
          <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
            Venture Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm/[150%]">
            <thead>
              <tr className="border-b border-border-surface">
                {["Venture", "Stage", "Monthly Rev", "Total Rev", "Visitors", "Conversions", "Conv. Rate"].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-5 py-3 text-left font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ventures.map((v) => {
                const rate = v.visitors > 0 ? ((v.conversions / v.visitors) * 100).toFixed(1) : "0.0";
                return (
                  <tr
                    key={v.id}
                    className="border-b border-border-sub last:border-b-0 transition-[background-color] duration-100 hover:bg-background-soft"
                  >
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium text-text-main">{v.productName}</p>
                        {v.tagline && (
                          <p className="text-[13px]/[150%] text-text-soft truncate max-w-xs">{v.tagline}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5",
                        "font-mono text-xs font-medium leading-[150%] tracking-[0.6px] uppercase border-[0.5px]",
                        stageStyle(v.stage)
                      )}>
                        {v.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium tabular-nums text-text-main">
                      {v.monthlyRevenue > 0 ? formatCurrency(v.monthlyRevenue) : <span className="text-text-muted">&mdash;</span>}
                    </td>
                    <td className="px-5 py-3 font-medium tabular-nums text-text-main">
                      {v.totalRevenue > 0 ? formatCurrency(v.totalRevenue) : <span className="text-text-muted">&mdash;</span>}
                    </td>
                    <td className="px-5 py-3 tabular-nums text-text-sub">
                      {v.visitors > 0 ? formatNumber(v.visitors) : <span className="text-text-muted">&mdash;</span>}
                    </td>
                    <td className="px-5 py-3 tabular-nums text-text-sub">
                      {v.conversions > 0 ? formatNumber(v.conversions) : <span className="text-text-muted">&mdash;</span>}
                    </td>
                    <td className="px-5 py-3 tabular-nums text-text-sub">
                      {v.visitors > 0 ? `${rate}%` : <span className="text-text-muted">&mdash;</span>}
                    </td>
                  </tr>
                );
              })}
              {ventures.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-text-muted text-sm/[150%]">
                    No ventures yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl p-5 shadow-button-sm",
      accent
        ? "border-[2px] border-brand/20 bg-brand/5"
        : "border-[0.5px] border-border-soft bg-background-main"
    )}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className={accent ? "text-brand" : "text-text-muted"}>{icon}</span>
        <p className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
          {label}
        </p>
      </div>
      <p className={cn(
        "text-2xl font-semibold tracking-[-0.5px] tabular-nums",
        accent ? "text-text-main" : "text-text-main"
      )}>
        {value}
      </p>
    </div>
  );
}

function stageStyle(stage: Stage): string {
  const styles: Record<Stage, string> = {
    research: "border-purple-200 bg-purple-50 text-purple-700",
    build: "border-blue-200 bg-blue-50 text-blue-700",
    deploy: "border-cyan-200 bg-cyan-50 text-cyan-700",
    marketing: "border-amber-200 bg-amber-50 text-amber-700",
    complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
    failed: "border-red-200 bg-red-50 text-red-700",
  };
  return styles[stage] ?? "border-border-soft bg-background-soft text-text-sub";
}
