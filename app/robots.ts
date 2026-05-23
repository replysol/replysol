import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
