import { cn } from "@/lib/cn";

interface ScoreRange {
  min: number;
  label: string;
  classes: string;
}

const SCORE_RANGES: ScoreRange[] = [
  { min: 86, label: "Exceptional", classes: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { min: 71, label: "Strong", classes: "border-blue-200 bg-blue-50 text-blue-700" },
  { min: 51, label: "Promising", classes: "border-amber-200 bg-amber-50 text-amber-700" },
  { min: 31, label: "Below avg", classes: "border-orange-200 bg-orange-50 text-orange-700" },
  { min: 0, label: "Not viable", classes: "border-red-200 bg-red-50 text-red-700" },
];

function resolveRange(score: number): ScoreRange {
  return SCORE_RANGES.find((r) => score >= r.min) ?? SCORE_RANGES[SCORE_RANGES.length - 1];
}

export default function ScoreBadge({ score }: { score: number }) {
  const { label, classes } = resolveRange(score);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5",
        "font-mono text-xs font-medium leading-[150%] tracking-[0.3px]",
        "border-[0.5px]",
        classes
      )}
    >
      {score} &middot; {label}
    </span>
  );
}
