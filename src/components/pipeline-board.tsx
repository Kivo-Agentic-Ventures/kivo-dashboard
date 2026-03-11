"use client";

import type { Venture, Stage } from "@/lib/types";
import { STAGES } from "@/lib/types";
import VentureCard from "./venture-card";

const STAGE_HEADERS: Record<Stage, { label: string; color: string }> = {
  research: { label: "Research", color: "bg-purple-500" },
  build: { label: "Build", color: "bg-blue-500" },
  deploy: { label: "Deploy", color: "bg-cyan-500" },
  marketing: { label: "Marketing", color: "bg-amber-500" },
  complete: { label: "Complete", color: "bg-green-500" },
  failed: { label: "Failed", color: "bg-red-500" },
};

interface PipelineBoardProps {
  ventures: Venture[];
}

function groupByStage(ventures: Venture[]): Record<Stage, Venture[]> {
  const groups: Record<Stage, Venture[]> = {
    research: [],
    build: [],
    deploy: [],
    marketing: [],
    complete: [],
    failed: [],
  };

  for (const v of ventures) {
    const stage = STAGES.includes(v.stage) ? v.stage : "research";
    groups[stage].push(v);
  }

  return groups;
}

export default function PipelineBoard({ ventures }: PipelineBoardProps) {
  const grouped = groupByStage(ventures);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {STAGES.map((stage) => {
        const { label, color } = STAGE_HEADERS[stage];
        const items = grouped[stage];

        return (
          <div key={stage} className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                {items.length}
              </span>
            </div>
            <div className="flex flex-col gap-3 min-h-[120px] rounded-lg bg-gray-50/50 p-2">
              {items.length === 0 && (
                <p className="text-xs text-gray-300 text-center py-8">No ventures</p>
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
