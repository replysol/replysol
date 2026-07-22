import type { MetadataRoute } from "next";
import { appRoutes } from "@/config/routes";
import { getAbsoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl(appRoutes.home),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(appRoutes.nova),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(appRoutes.softwareDevelopment),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(appRoutes.mobileDevelopment),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl(appRoutes.pentest),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
