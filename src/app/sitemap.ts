import type { MetadataRoute } from "next";
import { services } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://event-kvartal.ru";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
