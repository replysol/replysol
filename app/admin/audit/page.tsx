import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Audit | Reply Solutions",
  description: "Historico de atividades relevantes do workspace.",
  path: appRoutes.adminAudit,
  noIndex: true,
});

export default function AdminAuditPage() {
  return <WorkspaceApp view="admin-audit" />;
}
