"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  CloudCog,
  Code2,
  DatabaseZap,
  Gauge,
  GitBranch,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Footer from "@/components/footer-section";
import Navbar from "@/components/shared/navbar";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const capabilityIcons = [Code2, CloudCog, ShieldCheck, Network, Gauge, Wrench] as const;
const pillarIcons = [Blocks, DatabaseZap, GitBranch, Wrench] as const;

export default function SoftwareDevelopmentPageView() {
  const { t } = useI18n();
  const page = t.softwareDevelopmentPage;
  const methodologySteps = t.methodology.steps.slice(0, 6);

  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <WhatsAppButton />

      <main>
        <section className="relative min-h-dvh overflow-hidden border-b border-border/50">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-25 dark:block" style={{ backgroundImage: `url(${heroBg.src})` }} />
          <div className="absolute inset-0 bg-grid opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />

          <div className="container hero-shell relative z-10 grid min-h-dvh items-center gap-12 pt-28 lg:grid-cols-[1fr_0.72fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
              <p className="mb-6 eyebrow-label">
                {page.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight text-gradient sm:text-6xl lg:text-7xl">
                {page.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={sectionRoutes.contact} className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90">
                  {page.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#metodologia" className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/20 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:border-foreground/50">
                  {t.methodology.title}
                </a>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-border/60 pt-8">
                {t.software.stats.map(([value, label]) => (
                  <div key={label}>
                    <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
                    <p className="mt-1 meta-label">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-lg border border-border/60 bg-card/70 p-5 backdrop-blur-md">
              <p className="eyebrow-label">Engineering brief</p>
              <div className="mt-6 space-y-6">
                {t.software.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-accent/40 via-border to-transparent" />
              <div className="mt-6 grid gap-3">
                {page.outcomes.slice(0, 3).map((outcome) => (
                  <div key={outcome} className="flex items-center gap-3 rounded-sm border border-border/50 bg-background/60 px-3 py-3">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="section-space relative border-b border-border/50">
          <div className="container section-shell">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 eyebrow-label">{page.pillarsEyebrow}</p>
                <h2 className="section-title font-bold tracking-tight text-foreground">{page.pillarsTitle}</h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {page.description}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {page.pillars.map(([title, description], index) => {
                const Icon = pillarIcons[index] ?? Code2;

                return (
                  <article key={title} className="min-h-64 rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md transition hover:border-accent/35">
                    <div className="mb-10 flex items-center justify-between">
                      <Icon className="h-5 w-5 text-accent" />
                      <span className="meta-label">0{index + 1}</span>
                    </div>
                    <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space border-b border-border/50 bg-card/20">
          <div className="container section-shell">
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 eyebrow-label">{t.services.eyebrow}</p>
              <h2 className="section-title font-bold tracking-tight text-foreground">{t.services.title}</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 md:grid-cols-2 lg:grid-cols-3">
              {t.services.items.map((service, index) => {
                const Icon = capabilityIcons[index] ?? Code2;

                return (
                  <div key={`capability-${index}`} className="bg-background/90 p-6 transition hover:bg-card/80">
                    <Icon className="mb-8 h-5 w-5 text-accent" />
                    <h3 className="font-mono text-sm font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="metodologia" className="section-space border-b border-border/50">
          <div className="container section-shell">
            <div className="mb-14 max-w-4xl">
              <p className="mb-4 eyebrow-label">{t.methodology.eyebrow}</p>
              <h2 className="section-title font-bold tracking-tight text-foreground">{t.methodology.title}</h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{t.methodology.description}</p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-border to-transparent md:block" />
              <div className="grid gap-4">
                {methodologySteps.map(([step, title, description], index) => (
                  <article key={step} className="grid gap-4 rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md md:grid-cols-[120px_1fr] md:pl-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-background font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="meta-label">{step}</span>
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 rounded-lg border border-border/60 bg-card/70 p-5 backdrop-blur-md">
              <GitBranch className="h-5 w-5 shrink-0 text-accent" />
              <p className="meta-label">{t.methodology.note}</p>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container section-shell">
            <div className="grid gap-10 rounded-lg border border-border/60 bg-card/75 p-6 backdrop-blur-md sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="mb-4 eyebrow-label">{page.outcomesEyebrow}</p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{page.finalText}</h2>
              </div>
              <Link href={sectionRoutes.contact} className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90">
                {page.finalCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
