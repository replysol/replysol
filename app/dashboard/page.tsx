import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Developer Dashboard | Reply Solutions",
  description: "Developer panel with projects and team cards.",
  path: appRoutes.dashboard,
  noIndex: true,
});

export default function DeveloperDashboardPage() {
  return <WorkspaceApp view="developer-dashboard" />;
}
