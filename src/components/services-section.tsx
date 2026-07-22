"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const serviceLinks = [
  appRoutes.softwareDevelopment,
  appRoutes.pentest,
] as const;

const ServicesSection = () => {
  const { t } = useI18n();
  return (
    <section id="services" className="section-space border-y border-white/10 bg-[#02070b] text-white">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading eyebrow={t.homeServices.eyebrow} title={t.homeServices.title} className="[&_h2]:text-white" />
          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">{t.homeServices.description}</p>
        </div>

        <div className="border-t border-white/15">
          {t.homeServices.items.map(([title, description, cta], index) => {
            return (
              <article key={title} className="group grid gap-5 border-b border-white/15 py-8 sm:grid-cols-[70px_0.65fr_1fr_auto] sm:items-start sm:gap-6">
                <div>
                  <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                  <div className="mt-3 h-0.5 w-8 bg-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{title}</h3>
                <p className="max-w-xl text-sm leading-6 text-slate-400">{description}</p>
                <Link href={serviceLinks[index] ?? sectionRoutes.contact} aria-label={`${cta}: ${title}`} className="flex h-10 w-10 items-center justify-center border border-white/25 text-cyan-300 transition group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:text-[#031019]">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
