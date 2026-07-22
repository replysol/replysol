import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contracts | Reply Solutions",
  description: "Clientes, valores contratados, custos, margem e responsaveis.",
  path: appRoutes.adminContracts,
  noIndex: true,
});

export default function AdminContractsPage() {
  return <WorkspaceApp view="admin-contracts" />;
}
