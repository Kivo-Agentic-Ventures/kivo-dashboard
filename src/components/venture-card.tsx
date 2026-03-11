import type { Venture } from "@/lib/types";
import ScoreBadge from "./score-badge";
import StageBadge from "./stage-badge";

interface VentureCardProps {
  venture: Venture;
}

export default function VentureCard({ venture }: VentureCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {venture.productName}
        </h3>
        <ScoreBadge score={venture.score} />
      </div>

      {venture.tagline && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{venture.tagline}</p>
      )}

      {venture.valueProposition && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {venture.valueProposition}
        </p>
      )}

      {venture.targetAudience && (
        <p className="text-xs text-gray-400 mb-3">
          <span className="font-medium">Audience:</span> {venture.targetAudience}
        </p>
      )}

      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
        <StageBadge stage={venture.stage} />
        <div className="flex gap-2 ml-auto">
          {venture.siteUrl && venture.siteUrl !== "pending" && (
            <a
              href={venture.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Site
            </a>
          )}
          {venture.repoUrl && (
            <a
              href={venture.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
