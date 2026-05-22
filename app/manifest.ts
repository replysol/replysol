import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e7edf3",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "128x128",
        type: "image/x-icon",
      },
    ],
  };
}
