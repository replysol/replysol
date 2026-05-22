"use client";

import {
  useRouter,
} from "next/navigation";
import AdminShell from "@/components/admin/shell";
import AdminDashboardHeader from "@/components/admin/dashboard/dashboard-header";
import AdminHighlightsSection from "@/components/admin/dashboard/highlights-section";
import AdminOperationsPanel from "@/components/admin/dashboard/operations-panel";
import AdminOverviewCards from "@/components/admin/dashboard/overview-cards";
import AdminPerformancePanel from "@/components/admin/dashboard/performance-panel";
import { useToast } from "@/components/ui/use-toast";
import { appRoutes } from "@/config/routes";
import { getAdminSession, logoutAdmin } from "@/lib/admin-auth";
import {
  activityFeed,
  highlightItems,
  overviewCards,
  performanceData,
  projectStages,
  recentProjects,
  teamCapacity,
} from "@/data/admin-dashboard";
import { useI18n } from "@/i18n/locale-provider";

const AdminDashboard = () => {
  const router = useRouter();
  const session = getAdminSession();
  const { toast } = useToast();
  const { t } = useI18n();

  const handleLogout = () => {
    logoutAdmin();
    toast({
      title: t.adminDashboard.logoutTitle,
      description: t.adminDashboard.logoutDescription,
    });
    router.replace(appRoutes.adminLogin);
  };

  return (
    <AdminShell>
      <AdminDashboardHeader session={session} onLogout={handleLogout} />
      <AdminOverviewCards cards={overviewCards} />
      <AdminPerformancePanel performanceData={performanceData} projectStages={projectStages} />
      <AdminOperationsPanel
        recentProjects={recentProjects}
        activityFeed={activityFeed}
        teamCapacity={teamCapacity}
      />
      <AdminHighlightsSection highlightItems={highlightItems} />
    </AdminShell>
  );
};

export default AdminDashboard;
