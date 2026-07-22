import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import NovaPage from "@/views/NovaPage";

export const metadata: Metadata = createPageMetadata({
  title: "NOVA | Reply Solutions",
  description:
    "Software de IA para revisar codigo localmente antes do commit, identificar vulnerabilidades, sugerir correcoes e consolidar indicadores de seguranca para lideres tecnicos.",
  path: appRoutes.nova,
});

export default function Nova() {
  return <NovaPage />;
}
