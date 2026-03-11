import type { Stage } from "@/lib/types";
import { cn } from "@/lib/cn";

const STAGE_STYLES: Record<Stage, string> = {
  research: "border-purple-200 bg-purple-50 text-purple-700",
  build: "border-blue-200 bg-blue-50 text-blue-700",
  deploy: "border-cyan-200 bg-cyan-50 text-cyan-700",
  marketing: "border-amber-200 bg-amber-50 text-amber-700",
  complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
  failed: "border-red-200 bg-red-50 text-red-700",
};

const STAGE_LABELS: Record<Stage, string> = {
  research: "Research",
  build: "Build",
  deploy: "Deploy",
  marketing: "Marketing",
  complete: "Complete",
  failed: "Failed",
};

export default function StageBadge({ stage }: { stage: Stage }) {
  const classes = STAGE_STYLES[stage] ?? "border-border-soft bg-background-soft text-text-sub";
  const label = STAGE_LABELS[stage] ?? stage;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "font-mono text-xs font-medium leading-[150%] tracking-[0.6px] uppercase",
        "border-[0.5px]",
        classes
      )}
    >
      {label}
    </span>
  );
}
