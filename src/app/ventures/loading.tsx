export default function VenturesLoading() {
  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 animate-pulse rounded-full bg-background-soft" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-background-soft mt-2" />
        </div>
        <div className="h-8 w-24 animate-pulse rounded-full bg-background-soft" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col min-w-0">
            <div className="h-4 w-20 animate-pulse rounded-full bg-background-soft mb-3" />
            <div className="rounded-xl border border-border-sub p-2 min-h-[120px] bg-background-soft/50">
              <div className="h-24 animate-pulse rounded-lg bg-background-soft" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
