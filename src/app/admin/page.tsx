import { db } from "@/lib/db";
import { AdminBoard } from "./admin-board";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return <AdminBoard initialLeads={JSON.parse(JSON.stringify(leads))} />;
}
