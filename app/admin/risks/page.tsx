import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Risks | Reply Solutions",
  description: "Saude dos projetos, alertas, bloqueios e riscos operacionais.",
  path: appRoutes.adminRisks,
  noIndex: true,
});

export default function AdminRisksPage() {
  return <WorkspaceApp view="admin-risks" />;
}
