"use client";

import { useState } from "react";
import type { Idea } from "@/lib/types";
import ScoreBadge from "./score-badge";

type SortKey = keyof Idea;
type SortDirection = "asc" | "desc";

const MARKET_SIZE_COLORS: Record<string, string> = {
  Large: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Small: "bg-orange-100 text-orange-800",
  Niche: "bg-gray-100 text-gray-700",
};

const FEASIBILITY_COLORS: Record<string, string> = {
  High: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-red-100 text-red-800",
};

interface Column {
  key: SortKey;
  label: string;
}

const COLUMNS: Column[] = [
  { key: "title", label: "Idea" },
  { key: "productName", label: "Product Name" },
  { key: "score", label: "Score" },
  { key: "marketSize", label: "Market Size" },
  { key: "feasibility", label: "Feasibility" },
  { key: "shouldPursue", label: "Should Pursue" },
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

function TextBadge({ value, colorMap }: { value: string; colorMap: Record<string, string> }) {
  const classes = colorMap[value] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {value || "\u2014"}
    </span>
  );
}

function PursueIndicator({ value }: { value: boolean }) {
  if (value) {
    return <span className="text-green-600 font-semibold text-lg" aria-label="Yes">&check;</span>;
  }
  return <span className="text-red-500 font-semibold text-lg" aria-label="No">&times;</span>;
}

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  if (!active) {
    return <span className="ml-1 text-gray-300">&uarr;&darr;</span>;
  }
  return <span className="ml-1 text-indigo-600">{direction === "asc" ? "\u2191" : "\u2193"}</span>;
}

interface IdeasTableProps {
  ideas: Idea[];
}

export default function IdeasTable({ ideas }: IdeasTableProps) {
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
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {col.label}
                <SortIcon active={sortKey === col.key} direction={sortDirection} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map((idea, index) => (
            <tr
              key={idea.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-indigo-50/40 transition-colors`}
            >
              <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">
                {idea.title}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {idea.productName || "\u2014"}
              </td>
              <td className="px-4 py-3">
                <ScoreBadge score={idea.score} />
              </td>
              <td className="px-4 py-3">
                <TextBadge value={idea.marketSize} colorMap={MARKET_SIZE_COLORS} />
              </td>
              <td className="px-4 py-3">
                <TextBadge value={idea.feasibility} colorMap={FEASIBILITY_COLORS} />
              </td>
              <td className="px-4 py-3 text-center">
                <PursueIndicator value={idea.shouldPursue} />
              </td>
              <td className="px-4 py-3 text-gray-600 max-w-md truncate">
                {idea.summary || "\u2014"}
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="px-4 py-12 text-center text-gray-400">
                No ideas found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
