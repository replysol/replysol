import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Productivity | Reply Solutions",
  description: "Fluxo do kanban, gargalos e carga por desenvolvedor.",
  path: appRoutes.adminProductivity,
  noIndex: true,
});

export default function AdminProductivityPage() {
  return <WorkspaceApp view="admin-productivity" />;
}
