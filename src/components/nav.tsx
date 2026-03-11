"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/ideas", label: "Ideas" },
  { href: "/ventures", label: "Ventures" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border-surface bg-background-main/90 backdrop-blur-[6px]">
      <div className="max-w-[1022px] mx-auto px-6 md:px-8 flex items-center h-14">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-background-invert flex items-center justify-center">
              <span className="text-text-invert font-semibold text-xs">K</span>
            </div>
            <span className="font-semibold text-text-main tracking-[-0.3px]">Kivo</span>
          </Link>
          <div className="flex items-center gap-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm/[150%] font-medium rounded-full",
                    "transition-[color,background-color] duration-100",
                    active
                      ? "bg-background-soft text-text-main"
                      : "text-text-sub hover:bg-background-soft hover:text-text-main"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
