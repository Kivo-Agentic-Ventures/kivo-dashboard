import { fetchIdeas } from "@/lib/notion";
import IdeasTable from "@/components/ideas-table";
import RefreshButton from "@/components/refresh-button";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function IdeasPage() {
  const ideas = await fetchIdeas();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ideas</h1>
            <p className="mt-1 text-sm text-gray-500">
              {ideas.length} idea{ideas.length !== 1 ? "s" : ""} triaged from inbox
            </p>
          </div>
          <RefreshButton />
        </div>
        <IdeasTable ideas={ideas} />
      </div>
    </main>
  );
}
