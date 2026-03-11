interface ScoreBadgeProps {
  score: number;
}

interface ScoreRange {
  min: number;
  label: string;
  classes: string;
}

const SCORE_RANGES: ScoreRange[] = [
  { min: 86, label: "Exceptional", classes: "bg-green-100 text-green-800" },
  { min: 71, label: "Strong", classes: "bg-blue-100 text-blue-800" },
  { min: 51, label: "Promising", classes: "bg-yellow-100 text-yellow-800" },
  { min: 31, label: "Below avg", classes: "bg-orange-100 text-orange-800" },
  { min: 0, label: "Not viable", classes: "bg-red-100 text-red-800" },
];

function resolveRange(score: number): ScoreRange {
  return SCORE_RANGES.find((r) => score >= r.min) ?? SCORE_RANGES[SCORE_RANGES.length - 1];
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const { label, classes } = resolveRange(score);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      {score} &middot; {label}
    </span>
  );
}
