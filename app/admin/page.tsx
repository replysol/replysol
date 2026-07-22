import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Admin | Reply Solutions",
  description: "Dashboard administrativo com projetos, financeiro e usuarios.",
  path: appRoutes.admin,
  noIndex: true,
});

export default function AdminDashboardPage() {
  return <WorkspaceApp view="admin-dashboard" />;
}
