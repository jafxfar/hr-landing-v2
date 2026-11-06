import { cn } from "@/lib/cn";

type GlowBlobColor = "brand" | "accent";
type GlowBlobPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type GlowBlobProps = {
  color?: GlowBlobColor;
  position?: GlowBlobPosition;
  opacity?: number;
  blur?: 80 | 100 | 120;
  size?: string;
  className?: string;
};

const positionClass: Record<GlowBlobPosition, string> = {
  "top-left": "left-[-8%] top-[-18%]",
  "top-right": "right-[-10%] top-[-16%]",
  "bottom-left": "bottom-[-20%] left-[-8%]",
  "bottom-right": "bottom-[-18%] right-[-10%]",
};

const blurClass: Record<NonNullable<GlowBlobProps["blur"]>, string> = {
  80: "blur-[80px]",
  100: "blur-[100px]",
  120: "blur-[120px]",
};

export function GlowBlob({
  color = "brand",
  position = "top-right",
  opacity = 0.22,
  blur = 100,
  size = "18rem",
  className,
}: GlowBlobProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "glow-blob pointer-events-none absolute rounded-full",
        positionClass[position],
        blurClass[blur],
        color === "brand" ? "bg-brand-500" : "bg-accent-500",
        className,
      )}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    />
  );
}
