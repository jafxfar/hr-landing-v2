"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./reducedMotion";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
};

function formatValue(n: number, decimals: number, suffix: string) {
  return `${n.toFixed(decimals)}${suffix}`;
}

export function CountUp({
  value,
  suffix = "",
  duration = 0.8,
  className = "",
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const label = formatValue(value, decimals, suffix);
  const [text, setText] = useState(() => formatValue(0, decimals, suffix));

  useEffect(() => {
    if (reduced || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setText(formatValue(latest, decimals, suffix));
      },
    });

    return () => controls.stop();
  }, [decimals, duration, inView, reduced, suffix, value]);

  return (
    <span ref={ref} className={className} aria-label={label}>
      {reduced ? label : text}
    </span>
  );
}
