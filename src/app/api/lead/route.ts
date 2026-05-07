import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { notifyTelegram } from "@/lib/notify";

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().optional().or(z.literal("")),
  format: z.string().max(80).optional(),
  date: z.string().max(40).optional(),
  kids: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  // Honeypot triggered — молчим, как будто всё ок
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const data = parsed.data;
  const headers = req.headers;

  try {
    const lead = await db.lead.create({
      data: {
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email || null,
        format: data.format || null,
        date: data.date || null,
        kids: data.kids || null,
        message: data.message || null,
        userAgent: headers.get("user-agent") || null,
        referrer: headers.get("referer") || null,
        ip:
          headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          headers.get("x-real-ip") ||
          null,
      },
    });

    // Не блокируем ответ ради Telegram — fire-and-forget
    notifyTelegram(lead).catch((e) => console.error("[notify]", e));

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("[lead/create]", e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
