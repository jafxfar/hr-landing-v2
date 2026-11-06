export type AnalyticsEvent =
  | "demo_click"
  | "lead_submit"
  | "telegram_click"
  | (string & {});

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      ...args: Array<string | Record<string, unknown>>
    ) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function ymId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YM_ID?.trim();
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

/** Fire product analytics: Yandex Metrika goals + optional GA4. */
export function track(
  event: AnalyticsEvent,
  payload?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload ?? {});
  }

  const id = ymId();
  if (id && typeof window.ym === "function") {
    window.ym(id, "reachGoal", event);
  }

  if (process.env.NEXT_PUBLIC_GA_ID && typeof window.gtag === "function") {
    window.gtag("event", event, payload ?? {});
  }
}
