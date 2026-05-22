import type { Metadata } from "next";
import { appRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import Footer from "@/components/footer-section";

import Script from "next/script";
import Navbar from "@/components/shared/navbar";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import HeroSection from "@/components/hero-section";
import ClientsSection from "@/components/clients-section";
import ServicesSection from "@/components/services-section";
import TeamCarouselSection from "@/components/team-carousel-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import PentestSection from "@/components/pentest-section";
import SoftwareEngineerSection from "@/components/software-engineer-section";
import MethodologySection from "@/components/methodology-section";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: appRoutes.home,
});

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
    sameAs: [siteConfig.social.linkedin],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
  };


  return (
    <div className="min-h-dvh bg-background">
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <WhatsAppButton/>
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <SoftwareEngineerSection />
      <TeamCarouselSection/>
      <PentestSection />
      <ClientsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}