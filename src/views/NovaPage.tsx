"use client";

import { ScanSearch } from "lucide-react";
import ServiceDetailPage from "@/components/service-detail-page";
import { useI18n } from "@/i18n/locale-provider";

export default function NovaPage() {
  const { locale, t } = useI18n();
  const pt = locale === "pt-br";
  const page = t.ai;

  const differentiators = pt
    ? [
        ["Antes do repositório", "A revisão acontece localmente antes do commit, quando corrigir ainda custa menos e interrompe menos."],
        ["Contexto no achado", "Cada risco apresenta severidade, impacto, trecho relacionado e recomendação objetiva de correção."],
        ["Visibilidade para liderança", "Indicadores por equipe e pessoa revelam padrões recorrentes e evolução da postura de segurança."],
        ["Aprendizado no fluxo", "O desenvolvedor recebe orientação no momento da mudança, reforçando boas práticas continuamente."],
      ]
    : [
        ["Before the repository", "Review happens locally before commit, when fixes cost less and cause less disruption."],
        ["Context in every finding", "Each risk includes severity, impact, related code and objective remediation guidance."],
        ["Leadership visibility", "Team and individual indicators reveal recurring patterns and security posture progress."],
        ["Learning in the workflow", "Developers receive guidance while making changes, continuously reinforcing good practices."],
      ];

  return (
    <ServiceDetailPage
      hero={{
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        cta: page.primaryCta,
        icon: ScanSearch,
        mark: "AI.SEC",
      }}
      overview={{
        eyebrow: pt ? "Segurança no desenvolvimento" : "Security in development",
        title: pt ? "Risco identificado quando o código ainda está nascendo." : "Risk identified while code is still being written.",
        paragraphs: [page.description, pt
          ? "A NOVA aproxima revisão de segurança, orientação técnica e governança sem criar uma etapa isolada no fim do ciclo."
          : "NOVA brings security review, technical guidance and governance together without creating an isolated stage at the end of the cycle."],
      }}
      highlights={{
        eyebrow: page.flowEyebrow,
        title: page.flowTitle,
        items: page.flow.map(([title, description]) => ({ title, description })),
      }}
      reasons={{
        eyebrow: page.impactEyebrow,
        title: page.impactTitle,
        items: [...page.benefits],
      }}
      statement={{
        eyebrow: page.leadershipEyebrow,
        title: page.leadershipTitle,
        description: page.leadershipDescription,
      }}
      scope={{
        eyebrow: page.coverageEyebrow,
        title: page.coverageTitle,
        description: page.coverageDescription,
        items: page.languageCoverage.map(([language, frameworks]) => ({ title: language, description: frameworks })),
      }}
      process={{
        eyebrow: page.flowEyebrow,
        title: pt ? "4 passos para antecipar o risco." : "4 steps to anticipate risk.",
        items: page.flow.map(([title, description], index) => ({
          number: String(index + 1).padStart(2, "0"),
          title,
          description,
        })),
      }}
      differentiators={{
        eyebrow: pt ? "NOVA no fluxo real" : "NOVA in the real workflow",
        title: pt ? "Segurança que orienta a equipe e informa a liderança." : "Security that guides the team and informs leadership.",
        description: page.finalText,
        items: differentiators.map(([title, description]) => ({ title, description })),
      }}
    />
  );
}
