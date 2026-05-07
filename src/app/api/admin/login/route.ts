import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkPassword, createSessionCookie } from "@/lib/auth";

const schema = z.object({ password: z.string().min(1).max(200) });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "bad" }, { status: 400 });
  }

  if (!checkPassword(parsed.data.password)) {
    // Небольшая задержка чтобы тормозить брутфорс
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "wrong" }, { status: 401 });
  }

  const { name, value } = await createSessionCookie();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
