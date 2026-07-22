import type { Metadata } from "next";
import WorkspaceApp from "@/views/WorkspaceApp";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Login | Reply Solutions",
  description: "Acesso ao workspace interno da Reply Solutions.",
  path: appRoutes.login,
  noIndex: true,
});

export default function LoginPage() {
  return <WorkspaceApp view="login" />;
}
