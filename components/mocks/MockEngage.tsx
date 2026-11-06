"use client";

import { Heart } from "lucide-react";
import { mockEngage } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockEngage({ className }: { className?: string }) {
  return (
    <MockShell className={className}>
      {({ active, reduced }) => (
        <div className="relative flex h-full flex-col gap-2 overflow-hidden bg-surface p-3">
          {mockEngage.posts.map((post) => (
            <div
              key={post.id}
              className="rounded-md border border-line bg-surface-card p-2.5 shadow-sm"
            >
              <p className="text-[10px] font-semibold text-ink">{post.author}</p>
              <p className="mt-1 text-[10px] leading-snug text-muted">{post.text}</p>
              <div className="mt-2 flex gap-2">
                {post.reactions.map((count, i) => (
                  <span
                    key={`${post.id}-r-${i}`}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-medium text-brand-700"
                  >
                    <Heart className="h-2.5 w-2.5 fill-current" aria-hidden />
                    {count}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 rounded-md border border-accent-500/30 bg-accent-500/10 px-3 py-2 shadow-sm backdrop-blur-sm transition duration-500 ease-out",
              active || reduced
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0",
            )}
          >
            <p className="text-[10px] font-semibold text-accent-600">
              {mockEngage.awardLabel}
            </p>
            <p className="text-[10px] text-ink">{mockEngage.awardText}</p>
          </div>
        </div>
      )}
    </MockShell>
  );
}
