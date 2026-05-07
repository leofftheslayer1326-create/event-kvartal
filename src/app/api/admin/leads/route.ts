import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const leads = await db.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ leads });
}
