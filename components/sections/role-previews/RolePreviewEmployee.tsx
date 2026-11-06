"use client";

import { Clock, Newspaper } from "lucide-react";
import { mockEmployeePhone } from "@/content/mocks";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

export function RolePreviewEmployee() {
  const { checkIn, leave, feedTitle, feed } = mockEmployeePhone;

  return (
    <div className="flex items-center justify-center rounded-lg border border-line bg-gradient-to-br from-brand-50 to-surface px-4 py-5">
      <PhoneFrame size="sm" className="!mx-0 shadow-lg">
        <div className="flex flex-col gap-2 overflow-hidden bg-white px-2.5 pb-3 pt-7">
          <div className="rounded-lg border border-line bg-brand-50 p-2">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-brand-600" aria-hidden />
              <p className="text-[9px] font-semibold text-brand-700">
                {checkIn.label}
              </p>
            </div>
            <p className="mt-1 text-[10px] font-semibold text-ink">
              {checkIn.status}
            </p>
            <p className="text-[9px] text-muted">{checkIn.time}</p>
            <span className="mt-1.5 inline-block rounded-md bg-brand-600 px-2 py-1 text-[8px] font-semibold text-white">
              {checkIn.action}
            </span>
          </div>

          <div className="rounded-lg border border-line bg-white p-2 shadow-sm">
            <p className="text-[9px] font-semibold text-ink">{leave.label}</p>
            <p className="mt-0.5 text-[9px] text-muted">{leave.dates}</p>
            <span className="mt-1 inline-block rounded bg-accent-500/15 px-1.5 py-0.5 text-[8px] font-semibold text-accent-600">
              {leave.status}
            </span>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-1">
              <Newspaper className="h-3 w-3 text-muted" aria-hidden />
              <p className="text-[9px] font-semibold text-ink">{feedTitle}</p>
            </div>
            <ul className="space-y-1.5">
              {feed.map((item) => (
                <li
                  key={item.id}
                  className="rounded-md border border-line bg-surface px-2 py-1.5"
                >
                  <p className="truncate text-[9px] font-medium text-ink">
                    {item.title}
                  </p>
                  <p className="text-[8px] text-muted">{item.meta}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
