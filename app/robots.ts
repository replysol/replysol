import type { MetadataRoute } from "next";
import { appRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [appRoutes.adminLogin, appRoutes.adminDashboard, appRoutes.adminDashboardAlias, appRoutes.adminLoginAlias],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
