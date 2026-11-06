import { ImageResponse } from "next/og";
import { site } from "@/content/landing";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(165deg, #eef2ff 0%, #f8fafc 45%, #e0e7ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#4338ca",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            J
          </div>
          <div
            style={{
              color: "#4338ca",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#0f172a",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            HR-система для компаний с филиалами
          </div>
          <div
            style={{
              color: "#475569",
              fontSize: 26,
              lineHeight: 1.4,
              maxWidth: 860,
            }}
          >
            {site.description}
          </div>
        </div>
        <div
          style={{
            height: 6,
            width: 96,
            borderRadius: 999,
            background: "linear-gradient(90deg, #4f46e5, #14b8a6)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
