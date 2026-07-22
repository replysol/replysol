import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Finance | Reply Solutions",
  description: "Controle financeiro com entradas, previsoes e saidas.",
  path: appRoutes.adminFinance,
  noIndex: true,
});

export default function FinancePage() {
  return <WorkspaceApp view="finance" />;
}
