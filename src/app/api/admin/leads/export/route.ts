import { db } from "@/lib/db";

export async function GET() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  const headers = [
    "id",
    "createdAt",
    "status",
    "name",
    "phone",
    "email",
    "format",
    "date",
    "kids",
    "message",
    "notes",
    "source",
  ];

  const rows = leads.map((l) =>
    headers
      .map((h) => csvCell(String((l as Record<string, unknown>)[h] ?? "")))
      .join(",")
  );

  const csv = "﻿" + [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}

function csvCell(v: string) {
  if (/[",\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}
