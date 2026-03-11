export default function AnalyticsLoading() {
  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-32 animate-pulse rounded-full bg-background-soft" />
          <div className="h-4 w-48 animate-pulse rounded-full bg-background-soft mt-2" />
        </div>
        <div className="h-8 w-24 animate-pulse rounded-full bg-background-soft" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-2xl border-[0.5px] border-border-soft p-5">
            <div className="h-3 w-20 animate-pulse rounded-full bg-background-soft mb-3" />
            <div className="h-7 w-16 animate-pulse rounded-full bg-background-soft" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border-surface p-6 h-64">
            <div className="h-3 w-32 animate-pulse rounded-full bg-background-soft mb-5" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-6 animate-pulse rounded-full bg-background-soft" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
