import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Users | Reply Solutions",
  description: "Gestao de usuarios, contatos, perfis e status.",
  path: appRoutes.adminUsers,
  noIndex: true,
});

export default function UsersPage() {
  return <WorkspaceApp view="users" />;
}
