import { NextResponse } from "next/server";

type Body = {
  createdAt?: string;
  customer?: { name?: string; phone?: string };
  totalUsd?: number;
  lines?: unknown[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.customer?.name?.trim();
  const phone = body.customer?.phone?.trim();
  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!phone || !/^05\d{8}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
  }
  if (typeof body.totalUsd !== "number" || !Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ ok: false, error: "Invalid cart" }, { status: 400 });
  }

  const url = process.env.CHECKOUT_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Server missing CHECKOUT_WEBHOOK_URL" },
      { status: 500 },
    );
  }

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { ok: false, error: "Webhook failed", detail: text.slice(0, 200) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
