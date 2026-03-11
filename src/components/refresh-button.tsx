"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className={cn(
        "bg-background-main text-text-sub border border-border-soft",
        "rounded-full font-medium px-4 py-1.5 shadow-button-sm",
        "hover:bg-background-soft hover:text-text-main",
        "transition-[color,background-color] duration-100",
        "focus-visible:outline-2 focus-visible:outline-brand outline-offset-2",
        "inline-flex items-center gap-1.5 text-sm/[150%]",
        "disabled:opacity-50"
      )}
    >
      <RefreshCw className={cn("h-3.5 w-3.5", isPending && "animate-spin")} />
      {isPending ? "Refreshing..." : "Refresh"}
    </button>
  );
}
