import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

type ProjectKanbanPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Project Kanban | Reply Solutions",
  description: "Project kanban with editable cards for team members.",
  path: appRoutes.projects,
  noIndex: true,
});

export default async function ProjectKanbanPage({ params }: ProjectKanbanPageProps) {
  const { projectId } = await params;

  return <WorkspaceApp view="project-kanban" projectId={projectId} />;
}
