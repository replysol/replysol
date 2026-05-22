import type { Metadata } from "next";
import { PublicAdminRoute } from "@/components/admin/route-guards";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import AdminLogin from "@/views/AdminLogin";

export const metadata: Metadata = createPageMetadata({
  title: "Login Administrativo | Reply Solutions",
  description: "Acesso ao painel administrativo mockado da Reply Solutions.",
  path: appRoutes.adminLogin,
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <PublicAdminRoute>
      <AdminLogin />
    </PublicAdminRoute>
  );
}
