import { fetchIdeas, fetchVentures } from "@/lib/notion";
import type { Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import ScoreBadge from "@/components/score-badge";
import StageBadge from "@/components/stage-badge";
import RefreshButton from "@/components/refresh-button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const STAGE_DOTS: Record<Stage, string> = {
  research: "bg-purple-500",
  build: "bg-blue-500",
  deploy: "bg-cyan-500",
  marketing: "bg-amber-500",
  complete: "bg-emerald-500",
  failed: "bg-red-500",
};

export default async function HomePage() {
  const [ideas, ventures] = await Promise.all([fetchIdeas(), fetchVentures()]);

  const pursueCount = ideas.filter((i) => i.shouldPursue).length;
  const avgScore = ideas.length > 0
    ? Math.round(ideas.reduce((sum, i) => sum + i.score, 0) / ideas.length)
    : 0;

  const stageCounts = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = ventures.filter((v) => v.stage === stage).length;
      return acc;
    },
    {} as Record<Stage, number>,
  );

  const recentIdeas = ideas.slice(0, 5);
  const activeVentures = ventures
    .filter((v) => v.stage !== "complete" && v.stage !== "failed")
    .slice(0, 5);

  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium leading-[130%] tracking-[-0.24px] text-text-main">
            Dashboard
          </h1>
          <p className="text-sm/[150%] text-text-soft mt-1">Kivo Ventures overview</p>
        </div>
        <RefreshButton />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Ideas" value={ideas.length} />
        <StatCard label="Should Pursue" value={pursueCount} />
        <StatCard label="Avg Score" value={avgScore} />
        <StatCard
          label="Active Ventures"
          value={ventures.length - stageCounts.complete - stageCounts.failed}
        />
      </div>

      {/* Pipeline stages */}
      <div className="rounded-2xl border border-border-surface bg-background-main p-6 shadow-button-sm">
        <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft mb-5">
          Pipeline Stages
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {STAGES.map((stage) => (
            <div key={stage} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${STAGE_DOTS[stage]}`} />
                <span className="text-[13px]/[150%] text-text-soft capitalize">{stage}</span>
              </div>
              <span className="text-2xl font-semibold tracking-[-0.5px] text-text-main tabular-nums">
                {stageCounts[stage]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Ideas */}
        <div className="rounded-2xl border border-border-surface bg-background-main shadow-button-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-surface">
            <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
              Recent Ideas
            </h2>
            <Link
              href="/ideas"
              className="inline-flex items-center gap-1 text-text-sub text-xs font-medium opacity-70 hover:opacity-100 transition-opacity duration-100"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border-sub">
            {recentIdeas.length === 0 && (
              <p className="px-5 py-10 text-sm/[150%] text-text-muted text-center">No ideas yet</p>
            )}
            {recentIdeas.map((idea) => (
              <div key={idea.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm/[150%] font-medium text-text-main truncate">{idea.title}</p>
                  <p className="text-[13px]/[150%] text-text-soft truncate">{idea.productName}</p>
                </div>
                <ScoreBadge score={idea.score} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Ventures */}
        <div className="rounded-2xl border border-border-surface bg-background-main shadow-button-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-surface">
            <h2 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
              Active Ventures
            </h2>
            <Link
              href="/ventures"
              className="inline-flex items-center gap-1 text-text-sub text-xs font-medium opacity-70 hover:opacity-100 transition-opacity duration-100"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border-sub">
            {activeVentures.length === 0 && (
              <p className="px-5 py-10 text-sm/[150%] text-text-muted text-center">
                No active ventures
              </p>
            )}
            {activeVentures.map((venture) => (
              <div key={venture.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm/[150%] font-medium text-text-main truncate">
                    {venture.productName}
                  </p>
                  <p className="text-[13px]/[150%] text-text-soft truncate">{venture.tagline}</p>
                </div>
                <StageBadge stage={venture.stage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border-[0.5px] border-border-soft bg-background-main p-5 shadow-button-sm">
      <p className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
        {label}
      </p>
      <p className="text-3xl font-semibold tracking-[-0.8px] text-text-main mt-2 tabular-nums">
        {value}
      </p>
    </div>
  );
}
