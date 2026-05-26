"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code2,
  Gauge,
  LockKeyhole,
  ShieldCheck,
  TerminalSquare,
  UsersRound,
} from "lucide-react";
import Footer from "@/components/footer-section";
import Navbar from "@/components/shared/navbar";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const reviewFlow = [
  {
    icon: TerminalSquare,
    title: "Executa antes do commit",
    description:
      "A IA roda localmente no ambiente do desenvolvedor e revisa o diff antes que a mudanca avance para o repositorio.",
  },
  {
    icon: AlertTriangle,
    title: "Aponta risco e contexto",
    description:
      "Vulnerabilidades, validacoes ausentes e erros de logica sao explicados com impacto, severidade e trecho relacionado.",
  },
  {
    icon: CheckCircle2,
    title: "Sugere a correcao",
    description:
      "O desenvolvedor recebe uma recomendacao objetiva para corrigir o problema sem perder o fluxo de trabalho.",
  },
  {
    icon: Activity,
    title: "Consolida na dashboard",
    description:
      "O lider acompanha vulnerabilidades encontradas, corrigidas e recorrentes por membro da equipe.",
  },
] as const;

const dashboardRows = [
  { name: "Ana", found: 18, fixed: 17, rate: "94%" },
  { name: "Bruno", found: 11, fixed: 10, rate: "91%" },
  { name: "Carla", found: 23, fixed: 22, rate: "96%" },
] as const;

const aiReviewPanels = [
  {
    title: "model.scan(diff)",
    rows: ["embedding: auth-flow", "cwe: broken-access-control", "confidence: 0.94"],
  },
  {
    title: "semantic graph",
    rows: ["source -> controller", "policy gap detected", "sink: payment.update"],
  },
  {
    title: "risk ranking",
    rows: ["severity: high", "exploitability: medium", "fix: ownership check"],
  },
] as const;

const AICodeReviewerSecurity = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <WhatsAppButton />

      <main>
        <section className="relative flex min-h-dvh items-center overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-grid opacity-[0.16]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent)/0.18),transparent_28%),radial-gradient(circle_at_88%_68%,hsl(var(--glow-secondary)/0.12),transparent_24%),linear-gradient(180deg,hsl(var(--background)/0.8),hsl(var(--background)))]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(45deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute right-0 top-14 hidden h-[76%] w-[56%] overflow-hidden lg:block">
            <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black_18%,black_76%,transparent)]">
              <div className="absolute left-10 top-8 h-80 w-80 rounded-full border border-accent/15 bg-accent/10 blur-3xl" />
              <div className="absolute right-8 top-10 h-[28rem] w-[28rem] rounded-full border border-accent/10" />
              <div className="absolute right-20 top-24 h-72 w-72 rounded-full border border-accent/15" />
              <div className="absolute right-32 top-36 h-48 w-48 rounded-full border border-border/30" />

              <div className="absolute right-24 top-28 grid h-56 w-56 grid-cols-5 gap-5 rounded-full p-8">
                {Array.from({ length: 25 }).map((_, index) => {
                  const isActive = [2, 6, 8, 12, 16, 18, 22].includes(index);

                  return (
                    <span
                      key={index}
                      className={isActive ? "h-2 w-2 rounded-full bg-accent/70 shadow-[0_0_20px_hsl(var(--accent)/0.25)]" : "h-1.5 w-1.5 rounded-full bg-accent/22"}
                    />
                  );
                })}
              </div>

              <div className="absolute left-0 top-16 grid w-[62%] grid-cols-1 gap-4">
                {aiReviewPanels.map((panel, index) => (
                  <div
                    key={panel.title}
                    className={index === 1 ? "ml-16 rounded-lg border border-border/35 bg-card/30 p-4 font-mono text-[0.68rem] leading-5 text-accent/55 backdrop-blur-sm" : "rounded-lg border border-border/35 bg-card/30 p-4 font-mono text-[0.68rem] leading-5 text-accent/55 backdrop-blur-sm"}
                  >
                    <div className="mb-3 flex items-center gap-2 border-b border-border/30 pb-3 text-foreground/45">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                      <span>{panel.title}</span>
                    </div>
                    <div className="space-y-2">
                      {panel.rows.map((row) => (
                        <p key={row} className="whitespace-nowrap">
                          <span className="text-foreground/25">&gt;</span> {row}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-20 left-16 right-20 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
              <div className="absolute bottom-20 left-16 top-28 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
              <div className="absolute bottom-40 left-44 right-28 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <div className="absolute right-32 top-40 h-40 w-px bg-gradient-to-b from-accent/25 via-border/40 to-transparent" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />

          <div className="container hero-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="mb-6 eyebrow-label">
                {t.ai.eyebrow}
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gradient sm:text-5xl lg:text-7xl">
                {t.ai.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t.ai.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={sectionRoutes.contact}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90"
                >
                  {t.ai.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/20 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-all duration-300 hover:border-foreground/50"
                >
                  {t.ai.secondaryCta}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-lg border border-border/70 bg-card/80 p-4 shadow-[0_28px_80px_hsl(var(--foreground)/0.08)] backdrop-blur-md"
            >
              <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <p className="eyebrow-label">
                    {t.ai.scan.label}
                  </p>
                  <p className="mt-1 font-mono text-sm text-foreground">feature/payment-rules</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-3">
                  <p className="mb-2 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    {t.ai.scan.severity}
                  </p>
                  <p className="text-muted-foreground">
                    {t.ai.scan.risk}
                  </p>
                </div>
                <div className="rounded-lg border border-accent/25 bg-accent/10 p-3">
                  <p className="mb-2 flex items-center gap-2 text-accent">
                    <Code2 className="h-4 w-4" />
                    {t.ai.scan.suggestionTitle}
                  </p>
                  <p className="text-muted-foreground">
                    {t.ai.scan.suggestion}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {t.ai.scan.metrics.map(([value, label]) => (
                    <div key={label} className="rounded-lg border border-border/60 bg-background/70 p-3">
                      <p className="text-lg font-bold text-foreground">{value}</p>
                      <p className="mt-1 meta-label">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="como-funciona" className="section-space relative">
          <div className="absolute inset-0 bg-grid opacity-25" />
          <div className="container section-shell relative">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
              <div>
              <p className="mb-4 eyebrow-label">
                {t.ai.flowEyebrow}
              </p>
              <h2 className="section-title font-bold tracking-tight text-foreground">
                {t.ai.flowTitle}
              </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {t.ai.description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {reviewFlow.map((step, index) => {
                const Icon = step.icon;

                return (
                <article key={step.title} className="min-h-64 rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md transition hover:border-accent/35">
                  <div className="mb-10 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="meta-label">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 font-mono text-sm font-semibold text-foreground">{t.ai.flow[index][0]}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.ai.flow[index][1]}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space border-t border-border/50 bg-card/20">
          <div className="container section-shell">
            <div className="mb-12 max-w-4xl">
              <p className="mb-4 eyebrow-label">
                {t.ai.coverageEyebrow}
              </p>
              <h2 className="section-title font-bold tracking-tight text-foreground">
                {t.ai.coverageTitle}
              </h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
                {t.ai.coverageDescription}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
              {t.ai.languageCoverage.map(([language, frameworks]) => (
                <div key={language} className="bg-background/90 p-5 transition hover:bg-card/80">
                  <Code2 className="mb-6 h-5 w-5 text-accent" />
                  <p className="font-mono text-sm font-semibold text-foreground">{language}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{frameworks}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space border-t border-border/50">
          <div className="container section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-4 eyebrow-label">
                {t.ai.leadershipEyebrow}
              </p>
              <h2 className="section-title font-bold tracking-tight text-foreground">
                {t.ai.leadershipTitle}
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {t.ai.leadershipDescription}
              </p>
            </div>

            <div className="rounded-lg border border-border/70 bg-card/75 p-4 backdrop-blur-md">
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: LockKeyhole, value: t.ai.dashboardMetrics[0][0], label: t.ai.dashboardMetrics[0][1] },
                  { icon: CheckCircle2, value: t.ai.dashboardMetrics[1][0], label: t.ai.dashboardMetrics[1][1] },
                  { icon: Gauge, value: t.ai.dashboardMetrics[2][0], label: t.ai.dashboardMetrics[2][1] },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-border/60 bg-background/70 p-4">
                    <metric.icon className="mb-4 h-4 w-4 text-accent" />
                    <p className="font-mono text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="mt-1 meta-label">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto rounded-lg border border-border/60">
                <div className="min-w-[34rem]">
                  <div className="grid grid-cols-4 bg-secondary/60 px-4 py-3 meta-label">
                    {t.ai.tableHeaders.map((header) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>
                  {dashboardRows.map((row) => (
                    <div
                      key={row.name}
                      className="grid grid-cols-4 border-t border-border/60 px-4 py-3 font-mono text-xs text-foreground"
                    >
                      <span>{row.name}</span>
                      <span>{row.found}</span>
                      <span>{row.fixed}</span>
                      <span className="text-accent">{row.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-t border-border/50">
          <div className="container section-shell">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-4 eyebrow-label">
                  {t.ai.impactEyebrow}
                </p>
                <h2 className="section-title font-bold tracking-tight text-foreground">
                  {t.ai.impactTitle}
                </h2>
              </div>

              <div className="space-y-3">
                {t.ai.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/75 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
              <div>
                <p className="meta-label">
                  Reply Solutions
                </p>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  {t.ai.finalText}
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90"
              >
                {t.ai.finalCta}
                <UsersRound className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AICodeReviewerSecurity;
