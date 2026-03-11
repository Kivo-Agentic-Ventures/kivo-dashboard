import type { Stage } from "@/lib/types";

const STAGE_STYLES: Record<Stage, string> = {
  research: "bg-purple-100 text-purple-800",
  build: "bg-blue-100 text-blue-800",
  deploy: "bg-cyan-100 text-cyan-800",
  marketing: "bg-amber-100 text-amber-800",
  complete: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};

const STAGE_LABELS: Record<Stage, string> = {
  research: "Research",
  build: "Build",
  deploy: "Deploy",
  marketing: "Marketing",
  complete: "Complete",
  failed: "Failed",
};

interface StageBadgeProps {
  stage: Stage;
}

export default function StageBadge({ stage }: StageBadgeProps) {
  const classes = STAGE_STYLES[stage] ?? "bg-gray-100 text-gray-700";
  const label = STAGE_LABELS[stage] ?? stage;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
}
