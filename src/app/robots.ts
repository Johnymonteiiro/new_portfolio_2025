import { SITE_URL } from "@/config/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE = SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
