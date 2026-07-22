"use client";

import { Smartphone } from "lucide-react";
import ServiceDetailPage from "@/components/service-detail-page";
import { useI18n } from "@/i18n/locale-provider";

export default function MobileDevelopmentPageView() {
  const { locale, t } = useI18n();
  const pt = locale === "pt-br";
  const page = t.mobileDevelopmentPage;

  const differentiators = pt
    ? [
        ["Experiência orientada ao uso", "Fluxos e interações desenhados para o contexto real de quem utiliza o aplicativo."],
        ["Integrações confiáveis", "Comunicação segura com APIs, sistemas internos, pagamentos e serviços do dispositivo."],
        ["Publicação assistida", "Preparação de builds, políticas, materiais e submissões para App Store e Google Play."],
        ["Evolução após o lançamento", "Monitoramento, correções, analytics e novas versões conduzidos de forma contínua."],
      ]
    : [
        ["Usage-driven experience", "Flows and interactions designed around the real context of app users."],
        ["Reliable integrations", "Secure communication with APIs, internal systems, payments and device services."],
        ["Assisted publishing", "Builds, policies, assets and submissions prepared for the App Store and Google Play."],
        ["Post-launch evolution", "Monitoring, fixes, analytics and new versions delivered continuously."],
      ];

  return (
    <ServiceDetailPage
      hero={{
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        cta: page.primaryCta,
        icon: Smartphone,
        mark: "APP.02",
      }}
      overview={{
        eyebrow: pt ? "Produto mobile" : "Mobile product",
        title: pt ? "Da primeira interação à operação em produção." : "From the first interaction to production operations.",
        paragraphs: [...page.paragraphs],
      }}
      highlights={{
        eyebrow: page.pillarsEyebrow,
        title: page.pillarsTitle,
        items: page.pillars.map(([title, description]) => ({ title, description })),
      }}
      reasons={{
        eyebrow: page.outcomesEyebrow,
        title: pt ? "Um aplicativo preparado para usuários, lojas e evolução." : "An application prepared for users, stores and evolution.",
        items: [...page.outcomes],
      }}
      statement={{
        eyebrow: pt ? "Produto e operação" : "Product and operations",
        title: pt ? "Um aplicativo só gera valor quando toda a jornada funciona." : "An application only creates value when the entire journey works.",
        description: page.finalText,
      }}
      scope={{
        eyebrow: page.capabilitiesEyebrow,
        title: page.capabilitiesTitle,
        description: page.description,
        items: page.capabilities.map(([title, description]) => ({ title, description })),
      }}
      process={{
        eyebrow: t.methodology.eyebrow.replaceAll("[", "").replaceAll("]", "").trim(),
        title: pt ? "5 passos até um produto mobile sustentável." : "5 steps to a sustainable mobile product.",
        items: t.methodology.steps.slice(0, 5).map(([, title, description], index) => ({
          number: String(index + 1).padStart(2, "0"),
          title,
          description,
        })),
      }}
      differentiators={{
        eyebrow: pt ? "Desenvolvimento de ponta a ponta" : "End-to-end development",
        title: pt ? "Produto, engenharia e operação no mesmo fluxo." : "Product, engineering and operations in one workflow.",
        description: pt
          ? "A entrega considera a experiência do usuário, a base técnica, as integrações, as exigências das lojas e a sustentação do aplicativo."
          : "Delivery covers user experience, technical foundations, integrations, store requirements and ongoing application support.",
        items: differentiators.map(([title, description]) => ({ title, description })),
      }}
    />
  );
}
