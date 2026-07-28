import type { Metadata } from "next";
import Script from "next/script";
import { appRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import FirstWebsitePageView from "@/views/FirstWebsitePage";

export const metadata: Metadata = createPageMetadata({
  title: "Seu Primeiro Site Profissional | Oferta a partir de R$ 600",
  description:
    "Oferta para seu primeiro site profissional: de R$ 1.000 a R$ 2.000 por R$ 600 a R$ 1.500. Página responsiva, contato por WhatsApp e estrutura para buscadores.",
  path: appRoutes.firstWebsite,
});

export default function FirstWebsitePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Criação do primeiro site profissional",
    description:
      "Criação de sites profissionais para micro e pequenos negócios, com layout responsivo, canais de contato e estrutura básica para buscadores.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "BR",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "600",
      highPrice: "1500",
      priceCurrency: "BRL",
      offerCount: "1",
    },
  };

  return (
    <>
      <Script
        id="first-website-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <FirstWebsitePageView />
    </>
  );
}
