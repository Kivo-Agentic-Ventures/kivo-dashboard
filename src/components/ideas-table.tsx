"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Check, X } from "lucide-react";
import type { Idea } from "@/lib/types";
import { cn } from "@/lib/cn";
import ScoreBadge from "./score-badge";

type SortKey = keyof Idea;
type SortDirection = "asc" | "desc";

interface Column {
  key: SortKey;
  label: string;
}

const COLUMNS: Column[] = [
  { key: "title", label: "Idea" },
  { key: "productName", label: "Product" },
  { key: "score", label: "Score" },
  { key: "marketSize", label: "Market" },
  { key: "feasibility", label: "Feasibility" },
  { key: "shouldPursue", label: "Pursue" },
  { key: "summary", label: "Summary" },
];

function compare(a: Idea, b: Idea, key: SortKey, direction: SortDirection): number {
  const valA = a[key];
  const valB = b[key];
  const modifier = direction === "asc" ? 1 : -1;

  if (typeof valA === "number" && typeof valB === "number") {
    return (valA - valB) * modifier;
  }
  if (typeof valA === "boolean" && typeof valB === "boolean") {
    return (Number(valA) - Number(valB)) * modifier;
  }
  return String(valA).localeCompare(String(valB)) * modifier;
}

function TextPill({ value }: { value: string }) {
  return (
    <span className="inline-block rounded-full border-[0.5px] border-border-soft bg-background-soft px-2.5 py-0.5 font-mono text-xs font-medium leading-[150%] tracking-[0.3px] text-text-sub">
      {value || "\u2014"}
    </span>
  );
}

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) return <ArrowUpDown className="ml-1 h-3 w-3 text-text-muted" />;
  return direction === "asc"
    ? <ArrowUp className="ml-1 h-3 w-3 text-brand" />
    : <ArrowDown className="ml-1 h-3 w-3 text-brand" />;
}

export default function IdeasTable({ ideas }: { ideas: Idea[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  }

  const sorted = [...ideas].sort((a, b) => compare(a, b, sortKey, sortDirection));

  return (
    <div className="rounded-2xl border border-border-surface bg-background-main shadow-button-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm/[150%]">
          <thead>
            <tr className="border-b border-border-surface">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={cn(
                    "cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left",
                    "font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft",
                    "transition-[color] duration-100 hover:text-text-main"
                  )}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    <SortIcon active={sortKey === col.key} direction={sortDirection} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((idea) => (
              <tr
                key={idea.id}
                className="border-b border-border-sub last:border-b-0 transition-[background-color] duration-100 hover:bg-background-soft"
              >
                <td className="px-4 py-3 font-medium text-text-main max-w-xs truncate">
                  {idea.title}
                </td>
                <td className="px-4 py-3 text-text-sub whitespace-nowrap">
                  {idea.productName || "\u2014"}
                </td>
                <td className="px-4 py-3">
                  <ScoreBadge score={idea.score} />
                </td>
                <td className="px-4 py-3">
                  <TextPill value={idea.marketSize} />
                </td>
                <td className="px-4 py-3">
                  <TextPill value={idea.feasibility} />
                </td>
                <td className="px-4 py-3 text-center">
                  {idea.shouldPursue
                    ? <Check className="h-4 w-4 text-brand mx-auto" />
                    : <X className="h-4 w-4 text-text-muted mx-auto" />
                  }
                </td>
                <td className="px-4 py-3 text-text-sub max-w-md truncate">
                  {idea.summary || "\u2014"}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-16 text-center text-text-soft text-sm/[150%]">
                  No ideas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
