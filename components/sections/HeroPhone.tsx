"use client";

import { useEffect, useState } from "react";
import { productScreens } from "@/content/productScreens";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ScreenImage } from "@/components/ui/ScreenImage";

const mobileShot = productScreens.mobileHome;

/** Renders only from md up — skips image download on mobile LCP profiles. */
export function HeroPhone() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setShow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute bottom-0 right-2 w-[148px] md:w-[160px] lg:-right-2 lg:bottom-2 xl:right-0">
      <PhoneFrame size="sm" className="!mx-0 shadow-lg">
        <ScreenImage
          src={mobileShot.src}
          alt={mobileShot.alt}
          fill
          sizes="160px"
          imgClassName="object-cover object-top"
        />
      </PhoneFrame>
    </div>
  );
}
