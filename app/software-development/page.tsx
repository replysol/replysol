import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import SoftwareDevelopmentPageView from "@/views/SoftwareDevelopmentPage";

export const metadata: Metadata = createPageMetadata({
  title: "Desenvolvimento Web | Reply Solutions",
  description:
    "Desenvolvimento web sob medida, modernizacao de sistemas, APIs, plataformas internas e sustentacao tecnica para empresas que nao podem parar.",
  path: appRoutes.softwareDevelopment,
});

export default function SoftwareDevelopmentPage() {
  return <SoftwareDevelopmentPageView />;
}
