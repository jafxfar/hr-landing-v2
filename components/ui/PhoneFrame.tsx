import type { ReactNode } from "react";
import clsx from "clsx";

type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
};

export function PhoneFrame({
  children,
  className = "",
  size = "md",
}: PhoneFrameProps) {
  const shell =
    size === "sm"
      ? "w-[148px] rounded-[1.65rem] p-[7px]"
      : "w-[200px] rounded-[2rem] p-2 md:w-[220px]";

  return (
    <div
      className={clsx(
        "relative mx-auto bg-phone-shell shadow-[0_24px_48px_rgba(15,15,15,0.22)]",
        shell,
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-phone-notch md:h-[18px] md:w-[72px]" />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.45rem] bg-phone-screen md:rounded-[1.6rem]">
        {children}
      </div>
    </div>
  );
}
