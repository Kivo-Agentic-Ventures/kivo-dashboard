"use client";

import type { Venture, Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import VentureCard from "./venture-card";

const STAGE_HEADERS: Record<Stage, { label: string; dot: string }> = {
  research: { label: "Research", dot: "bg-purple-500" },
  build: { label: "Build", dot: "bg-blue-500" },
  deploy: { label: "Deploy", dot: "bg-cyan-500" },
  marketing: { label: "Marketing", dot: "bg-amber-500" },
  complete: { label: "Complete", dot: "bg-emerald-500" },
  failed: { label: "Failed", dot: "bg-red-500" },
};

function groupByStage(ventures: Venture[]): Record<Stage, Venture[]> {
  const groups: Record<Stage, Venture[]> = {
    research: [], build: [], deploy: [], marketing: [], complete: [], failed: [],
  };
  for (const v of ventures) {
    const stage = STAGES.includes(v.stage) ? v.stage : "research";
    groups[stage].push(v);
  }
  return groups;
}

export default function PipelineBoard({ ventures }: { ventures: Venture[] }) {
  const grouped = groupByStage(ventures);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {STAGES.map((stage) => {
        const { label, dot } = STAGE_HEADERS[stage];
        const items = grouped[stage];

        return (
          <div key={stage} className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <h3 className="font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
                {label}
              </h3>
              <span className="ml-auto font-mono text-xs text-text-muted tabular-nums">
                {items.length}
              </span>
            </div>
            <div className="flex flex-col gap-3 min-h-[120px] rounded-xl border border-border-sub p-2 bg-background-soft/50">
              {items.length === 0 && (
                <p className="text-xs text-text-muted text-center py-8">No ventures</p>
              )}
              {items.map((venture) => (
                <VentureCard key={venture.id} venture={venture} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
