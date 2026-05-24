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
        disallow: [
          appRoutes.login,
          appRoutes.dashboard,
          appRoutes.projects,
          appRoutes.admin,
          appRoutes.adminRisks,
          appRoutes.adminProductivity,
          appRoutes.adminFinance,
          appRoutes.adminContracts,
          appRoutes.adminUsers,
          appRoutes.adminAudit,
        ],
      },
    ],
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
