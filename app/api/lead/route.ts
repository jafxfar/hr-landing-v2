import { NextResponse } from "next/server";
import { brand, cta } from "@/content/landing";
import { leadApiSchema } from "@/lib/leadSchema";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type RateEntry = { count: number; resetAt: number };

const rateMap = new Map<string, RateEntry>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: cta.form.rateLimitError },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректное тело запроса." },
      { status: 400 },
    );
  }

  const parsed = leadApiSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: cta.form.validationError },
      { status: 400 },
    );
  }

  // Honeypot filled → silent success
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Уведомления не настроены на сервере." },
      { status: 503 },
    );
  }

  const { name, company, contact, companySize } = parsed.data;

  const text = [
    `<b>${escapeHtml(cta.telegramLeadTitle)}</b>`,
    "",
    `<b>${escapeHtml(cta.form.name)}:</b> ${escapeHtml(name)}`,
    `<b>${escapeHtml(cta.form.company)}:</b> ${escapeHtml(company)}`,
    `<b>${escapeHtml(cta.form.contact)}:</b> ${escapeHtml(contact)}`,
    `<b>${escapeHtml(cta.form.companySize)}:</b> ${escapeHtml(companySize)}`,
  ].join("\n");

  const recipients = chatId
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  try {
    const results = await Promise.all(
      recipients.map((id) =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: id,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        }).then(async (tgRes) => {
          const tgJson = (await tgRes.json()) as {
            ok?: boolean;
            description?: string;
          };
          return { ok: tgRes.ok && !!tgJson.ok, description: tgJson.description };
        }),
      ),
    );

    if (!results.some((r) => r.ok)) {
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить уведомление." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, product: brand.full });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ошибка сети при отправке уведомления." },
      { status: 502 },
    );
  }
}
