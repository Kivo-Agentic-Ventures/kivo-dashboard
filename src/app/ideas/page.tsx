import { fetchIdeas } from "@/lib/notion";
import IdeasTable from "@/components/ideas-table";
import RefreshButton from "@/components/refresh-button";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function IdeasPage() {
  const ideas = await fetchIdeas();

  return (
    <div className="max-w-[1022px] mx-auto px-6 md:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium leading-[130%] tracking-[-0.24px] text-text-main">
            Ideas
          </h1>
          <p className="text-sm/[150%] text-text-soft mt-1">
            {ideas.length} idea{ideas.length !== 1 ? "s" : ""} triaged from inbox
          </p>
        </div>
        <RefreshButton />
      </div>
      <IdeasTable ideas={ideas} />
    </div>
  );
}
