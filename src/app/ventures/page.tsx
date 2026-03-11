import { fetchVentures } from "@/lib/notion";
import PipelineBoard from "@/components/pipeline-board";
import RefreshButton from "@/components/refresh-button";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function VenturesPage() {
  const ventures = await fetchVentures();

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium leading-[130%] tracking-[-0.24px] text-text-main">
            Venture Pipeline
          </h1>
          <p className="text-sm/[150%] text-text-soft mt-1">
            {ventures.length} venture{ventures.length !== 1 ? "s" : ""} in pipeline
          </p>
        </div>
        <RefreshButton />
      </div>
      <PipelineBoard ventures={ventures} />
    </div>
  );
}
