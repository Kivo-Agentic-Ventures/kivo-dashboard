function SkeletonRow() {
  return (
    <tr>
      <td className="px-4 py-3"><div className="h-4 w-32 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3"><div className="h-4 w-24 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3 text-center"><div className="mx-auto h-4 w-4 animate-pulse rounded-full bg-background-soft" /></td>
      <td className="px-4 py-3"><div className="h-4 w-48 animate-pulse rounded-full bg-background-soft" /></td>
    </tr>
  );
}

export default function IdeasLoading() {
  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-24 animate-pulse rounded-full bg-background-soft" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-full bg-background-soft" />
        </div>
        <div className="h-8 w-24 animate-pulse rounded-full bg-background-soft" />
      </div>
      <div className="rounded-2xl border border-border-surface bg-background-main shadow-button-sm overflow-hidden">
        <table className="min-w-full text-sm/[150%]">
          <thead>
            <tr className="border-b border-border-surface">
              {["Idea", "Product", "Score", "Market", "Feasibility", "Pursue", "Summary"].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 text-left font-mono text-xs font-medium tracking-[0.6px] uppercase text-text-soft">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-sub">
            {Array.from({ length: 8 }, (_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
