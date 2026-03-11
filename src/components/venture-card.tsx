import { ExternalLink, GitBranch } from "lucide-react";
import type { Venture } from "@/lib/types";
import { cn } from "@/lib/cn";
import ScoreBadge from "./score-badge";
import StageBadge from "./stage-badge";

export default function VentureCard({ venture }: { venture: Venture }) {
  return (
    <div
      className={cn(
        "rounded-xl border-[0.5px] border-border-soft bg-background-main p-4 shadow-button-sm",
        "transition-[box-shadow] duration-150 hover:shadow-drop-md"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-text-main text-sm/[150%] leading-tight tracking-[-0.1px]">
          {venture.productName}
        </h3>
        <ScoreBadge score={venture.score} />
      </div>

      {venture.tagline && (
        <p className="text-[13px]/[150%] text-text-soft mb-3 line-clamp-2">{venture.tagline}</p>
      )}

      {venture.valueProposition && (
        <p className="text-[13px]/[150%] text-text-sub mb-3 line-clamp-2">
          {venture.valueProposition}
        </p>
      )}

      {venture.targetAudience && (
        <p className="text-[13px]/[150%] text-text-soft mb-3">
          <span className="font-mono text-xs tracking-[0.6px] uppercase text-text-muted">Audience</span>{" "}
          {venture.targetAudience}
        </p>
      )}

      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border-sub">
        <StageBadge stage={venture.stage} />
        <div className="flex gap-3 ml-auto">
          {venture.siteUrl && venture.siteUrl !== "pending" && (
            <a
              href={venture.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-sub opacity-70 hover:opacity-100 transition-opacity duration-100"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="text-xs font-medium">Site</span>
            </a>
          )}
          {venture.repoUrl && (
            <a
              href={venture.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-sub opacity-70 hover:opacity-100 transition-opacity duration-100"
            >
              <GitBranch className="h-3 w-3" />
              <span className="text-xs font-medium">Repo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
