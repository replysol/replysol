import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import MobileDevelopmentPageView from "@/views/MobileDevelopmentPage";

export const metadata: Metadata = createPageMetadata({
  title: "Desenvolvimento Mobile | Reply Solutions",
  description:
    "Desenvolvimento mobile sob medida para iOS e Android, com aplicativos nativos, multiplataforma, integrações, publicação e evolução contínua.",
  path: appRoutes.mobileDevelopment,
});

export default function MobileDevelopmentPage() {
  return <MobileDevelopmentPageView />;
}
