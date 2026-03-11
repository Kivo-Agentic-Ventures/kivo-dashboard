function SkeletonRow() {
  return (
    <tr>
      <td className="px-4 py-3"><div className="h-4 w-32 animate-pulse rounded bg-gray-200" /></td>
      <td className="px-4 py-3"><div className="h-4 w-24 animate-pulse rounded bg-gray-200" /></td>
      <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" /></td>
      <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" /></td>
      <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" /></td>
      <td className="px-4 py-3 text-center"><div className="mx-auto h-5 w-5 animate-pulse rounded bg-gray-200" /></td>
      <td className="px-4 py-3"><div className="h-4 w-48 animate-pulse rounded bg-gray-200" /></td>
    </tr>
  );
}

export default function IdeasLoading() {
  const SKELETON_ROWS = 8;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Idea", "Product Name", "Score", "Market Size", "Feasibility", "Should Pursue", "Summary"].map(
                  (header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: SKELETON_ROWS }, (_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
