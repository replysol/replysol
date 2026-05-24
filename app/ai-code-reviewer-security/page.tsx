import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { createPageMetadata } from "@/lib/metadata";
import AICodeReviewerSecurity from "@/views/AICodeReviewerSecurity";

export const metadata: Metadata = createPageMetadata({
  title: "IA Code Reviewer Security | Reply Solutions",
  description:
    "Software de IA para revisar codigo localmente antes do commit, identificar vulnerabilidades, sugerir correcoes e consolidar indicadores de seguranca para lideres tecnicos.",
  path: appRoutes.aiCodeReviewerSecurity,
});

export default function AICodeReviewerSecurityPage() {
  return <AICodeReviewerSecurity />;
}
