import { fetchVentures } from "@/lib/notion";
import PipelineBoard from "@/components/pipeline-board";
import RefreshButton from "@/components/refresh-button";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function VenturesPage() {
  const ventures = await fetchVentures();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venture Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">
            {ventures.length} venture{ventures.length !== 1 ? "s" : ""} in pipeline
          </p>
        </div>
        <RefreshButton />
      </div>
      <PipelineBoard ventures={ventures} />
    </div>
  );
}
