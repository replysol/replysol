"use client";

import { Code2 } from "lucide-react";
import ServiceDetailPage from "@/components/service-detail-page";
import { useI18n } from "@/i18n/locale-provider";

export default function SoftwareDevelopmentPageView() {
  const { locale, t } = useI18n();
  const pt = locale === "pt-br";
  const page = t.softwareDevelopmentPage;

  const differentiators = pt
    ? [
        ["Decisão com contexto", "Arquitetura e prioridades definidas a partir da operação, dos usuários e dos objetivos do negócio."],
        ["Qualidade incorporada", "Revisão técnica, automação e critérios de aceite fazem parte do desenvolvimento, não de uma etapa tardia."],
        ["Visibilidade de entrega", "Marcos, riscos, decisões e evolução acompanhados com comunicação executiva e técnica."],
        ["Continuidade planejada", "Código, documentação e conhecimento preparados para manutenção e evolução após a publicação."],
      ]
    : [
        ["Context-driven decisions", "Architecture and priorities defined around operations, users and business goals."],
        ["Built-in quality", "Technical review, automation and acceptance criteria are part of development, not a late stage."],
        ["Delivery visibility", "Milestones, risks, decisions and progress tracked through executive and technical communication."],
        ["Planned continuity", "Code, documentation and knowledge prepared for maintenance and evolution after release."],
      ];

  return (
    <ServiceDetailPage
      hero={{
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        cta: page.primaryCta,
        icon: Code2,
        mark: "WEB.01",
      }}
      overview={{
        eyebrow: pt ? "Engenharia sob medida" : "Custom engineering",
        title: pt ? "Software construído para a operação real." : "Software built for real operations.",
        paragraphs: [...t.software.paragraphs],
      }}
      highlights={{
        eyebrow: page.pillarsEyebrow,
        title: page.pillarsTitle,
        items: page.pillars.map(([title, description]) => ({ title, description })),
      }}
      reasons={{
        eyebrow: page.outcomesEyebrow,
        title: page.outcomesTitle,
        items: [...page.outcomes],
      }}
      statement={{
        eyebrow: pt ? "Tecnologia e continuidade" : "Technology and continuity",
        title: pt ? "Aplicações críticas precisam evoluir sem comprometer a operação." : "Critical applications must evolve without compromising operations.",
        description: page.finalText,
      }}
      scope={{
        eyebrow: t.services.eyebrow.replaceAll("[", "").replaceAll("]", "").trim(),
        title: t.services.title,
        description: page.description,
        items: t.services.items.map((item) => ({ title: item.title, description: item.description })),
      }}
      process={{
        eyebrow: t.methodology.eyebrow.replaceAll("[", "").replaceAll("]", "").trim(),
        title: t.methodology.title,
        items: t.methodology.steps.slice(0, 5).map(([step, title, description], index) => ({
          number: String(index + 1).padStart(2, "0"),
          title,
          description: `${step} · ${description}`,
        })),
      }}
      differentiators={{
        eyebrow: pt ? "Como entregamos" : "How we deliver",
        title: pt ? "Engenharia responsável do escopo à evolução." : "Responsible engineering from scope to evolution.",
        description: pt
          ? "O trabalho combina visão de negócio, disciplina técnica e responsabilidade sobre o comportamento da solução em produção."
          : "Our work combines business context, technical discipline and accountability for how the solution behaves in production.",
        items: differentiators.map(([title, description]) => ({ title, description })),
      }}
    />
  );
}
