"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/config/routes";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type GuardProps = {
  children: ReactNode;
};

const GuardFallback = () => <div className="min-h-dvh bg-background" aria-hidden="true" />;

const useAdminAccessState = (requiresAuthentication: boolean) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);
    setIsReady(true);

    if (requiresAuthentication && !authenticated) {
      router.replace(appRoutes.adminLogin);
    }

    if (!requiresAuthentication && authenticated) {
      router.replace(appRoutes.adminDashboard);
    }
  }, [requiresAuthentication, router]);

  return { isReady, isAuthenticated };
};

export const ProtectedAdminRoute = ({ children }: GuardProps) => {
  const { isReady, isAuthenticated } = useAdminAccessState(true);

  if (!isReady || !isAuthenticated) {
    return <GuardFallback />;
  }

  return children;
};

export const PublicAdminRoute = ({ children }: GuardProps) => {
  const { isReady, isAuthenticated } = useAdminAccessState(false);

  if (!isReady) {
    return <GuardFallback />;
  }

  if (isAuthenticated) {
    return <GuardFallback />;
  }

  return children;
};

export const AdminEntryRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(isAdminAuthenticated() ? appRoutes.adminDashboard : appRoutes.adminLogin);
  }, [router]);

  return <GuardFallback />;
};
