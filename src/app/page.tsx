import { fetchIdeas, fetchVentures } from "@/lib/notion";
import type { Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import ScoreBadge from "@/components/score-badge";
import StageBadge from "@/components/stage-badge";
import RefreshButton from "@/components/refresh-button";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const STAGE_COLORS: Record<Stage, string> = {
  research: "bg-purple-500",
  build: "bg-blue-500",
  deploy: "bg-cyan-500",
  marketing: "bg-amber-500",
  complete: "bg-green-500",
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
  const activeVentures = ventures.filter((v) => v.stage !== "complete" && v.stage !== "failed").slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Kivo Ventures overview</p>
        </div>
        <RefreshButton />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Ideas" value={ideas.length} />
        <StatCard label="Should Pursue" value={pursueCount} />
        <StatCard label="Avg Score" value={avgScore} />
        <StatCard label="Active Ventures" value={ventures.length - stageCounts.complete - stageCounts.failed} />
      </div>

      {/* Pipeline stages bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm mb-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Stages</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {STAGES.map((stage) => (
            <div key={stage} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className={`w-2 h-2 rounded-full ${STAGE_COLORS[stage]}`} />
                <span className="text-xs text-gray-500 capitalize">{stage}</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">{stageCounts[stage]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: recent ideas + active ventures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Ideas */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Recent Ideas</h2>
            <Link href="/ideas" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentIdeas.length === 0 && (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No ideas yet</p>
            )}
            {recentIdeas.map((idea) => (
              <div key={idea.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{idea.title}</p>
                  <p className="text-xs text-gray-500 truncate">{idea.productName}</p>
                </div>
                <ScoreBadge score={idea.score} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Ventures */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Active Ventures</h2>
            <Link href="/ventures" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {activeVentures.length === 0 && (
              <p className="px-5 py-8 text-sm text-gray-400 text-center">No active ventures</p>
            )}
            {activeVentures.map((venture) => (
              <div key={venture.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{venture.productName}</p>
                  <p className="text-xs text-gray-500 truncate">{venture.tagline}</p>
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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
