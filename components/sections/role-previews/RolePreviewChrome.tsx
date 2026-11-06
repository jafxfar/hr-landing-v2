import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RolePreviewChromeProps = {
  caption: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function RolePreviewChrome({
  caption,
  children,
  className,
  bodyClassName,
}: RolePreviewChromeProps) {
  return (
    <div
      className={cn(
        "flex max-h-[440px] flex-col overflow-hidden rounded-lg border border-line bg-surface-card shadow-md",
        className,
      )}
    >
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line bg-surface px-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-yellow" />
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-green" />
        <span className="ml-3 truncate text-[11px] font-medium text-muted">
          {caption}
        </span>
      </div>
      <div className={cn("overflow-hidden bg-surface", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
