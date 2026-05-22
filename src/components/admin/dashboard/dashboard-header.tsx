"use client";

import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import Brand from "@/components/shared/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { appRoutes } from "@/config/routes";
import type { AdminSession } from "@/lib/admin-auth";
import { useI18n } from "@/i18n/locale-provider";

type AdminDashboardHeaderProps = {
  session: AdminSession | null;
  onLogout: () => void;
};

const AdminDashboardHeader = ({ session, onLogout }: AdminDashboardHeaderProps) => {
  const { t } = useI18n();
  const initials = (session?.name ?? "Admin")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="flex flex-col gap-5 rounded-lg border border-border/60 bg-card/75 px-4 py-5 backdrop-blur-xl sm:px-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <Brand href={appRoutes.home} />

        <Separator orientation="vertical" className="hidden h-10 md:block" />

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {t.adminDashboard.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{t.adminDashboard.title}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/70 px-4 py-3">
          <Avatar className="h-10 w-10 border border-border/60">
            <AvatarFallback className="bg-accent/10 font-mono text-xs text-accent">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-foreground">{session?.name ?? t.adminDashboard.anonymousName}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {session?.role ?? "Admin"}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild variant="outline" className="font-mono text-xs uppercase tracking-[0.18em]">
            <Link href={appRoutes.home}>
              <ArrowLeft />
              {t.adminDashboard.back}
            </Link>
          </Button>
          <Button onClick={onLogout} className="font-mono text-xs uppercase tracking-[0.18em]">
            <LogOut />
            {t.adminDashboard.logout}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
