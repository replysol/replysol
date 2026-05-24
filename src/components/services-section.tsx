"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const serviceLinks = [
  { href: appRoutes.softwareDevelopment, icon: Code2 },
  { href: appRoutes.aiCodeReviewerSecurity, icon: Sparkles },
  { href: appRoutes.pentest, icon: ShieldCheck },
] as const;

const ServicesSection = () => {
  const { t } = useI18n();

  return (
    <section id="services" className="section-space relative border-t border-border/50 bg-card/20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative container section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-4xl"
        >
          <SectionHeading eyebrow={t.homeServices.eyebrow} title={t.homeServices.title} />
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {t.homeServices.items.map(([title, description, cta], index) => {
            const service = serviceLinks[index];
            const Icon = service?.icon ?? Code2;

            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex min-h-80 flex-col rounded-lg border border-border/60 bg-card/75 p-6 backdrop-blur-md transition hover:border-accent/40"
              >
                <div className="mb-10 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="meta-label">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <Link
                  href={service?.href ?? sectionRoutes.contact}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent transition group-hover:gap-3"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
