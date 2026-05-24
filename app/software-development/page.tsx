import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import SoftwareDevelopmentPageView from "@/views/SoftwareDevelopmentPage";

export const metadata: Metadata = createPageMetadata({
  title: "Desenvolvimento de Software | Reply Solutions",
  description:
    "Desenvolvimento de software sob medida, modernizacao, APIs, plataformas web, sustentacao tecnica e evolucao continua para empresas que nao podem parar.",
  path: appRoutes.softwareDevelopment,
});

export default function SoftwareDevelopmentPage() {
  return <SoftwareDevelopmentPageView />;
}

