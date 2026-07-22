import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects | Reply Solutions",
  description: "Projects, stacks, deadlines and kanban access for each delivery.",
  path: appRoutes.projects,
  noIndex: true,
});

export default function ProjectsPage() {
  return <WorkspaceApp view="projects" />;
}
