"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDot,
  Code2,
  Gauge,
  Layers3,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer-section";
import Navbar from "@/components/shared/navbar";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { sectionRoutes } from "@/config/routes";

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceStep = {
  number: string;
  title: string;
  description: string;
};

export type ServiceDetailPageProps = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    icon: LucideIcon;
    mark: string;
  };
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  highlights: {
    eyebrow: string;
    title: string;
    items: ServiceFeature[];
  };
  reasons: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  statement: {
    eyebrow: string;
    title: string;
    description: string;
  };
  scope: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceFeature[];
  };
  process: {
    eyebrow: string;
    title: string;
    items: ServiceStep[];
  };
  differentiators: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceFeature[];
  };
};

const featureIcons = [Target, Layers3, Gauge, Radar, ShieldCheck, Code2] as const;

export default function ServiceDetailPage({
  hero,
  overview,
  highlights,
  reasons,
  statement,
  scope,
  process,
  differentiators,
}: ServiceDetailPageProps) {
  const HeroIcon = hero.icon;

  return (
    <div className="min-h-dvh bg-background">
      <Navbar />
      <WhatsAppButton />

      <main>
        <section className="relative isolate overflow-hidden bg-[#030a10] text-white">
          <Image src={heroBg} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(3,10,16,0.99)_0%,rgba(4,18,27,0.95)_54%,rgba(4,24,35,0.72)_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(34,211,238,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.12)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(90deg,transparent,black_58%,black)]" />

          <div className="section-shell grid min-h-[590px] items-center gap-14 py-20 lg:grid-cols-[1fr_0.8fr] lg:py-24">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">
                <span className="h-px w-9 bg-cyan-300" />{hero.eyebrow}
              </p>
              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                {hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{hero.description}</p>
              <Link href={sectionRoutes.contact} className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 border border-cyan-300 bg-cyan-300 px-6 text-sm font-bold text-[#031019] transition hover:bg-cyan-200">
                {hero.cta}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative hidden h-[390px] lg:block" aria-hidden="true">
              <div className="absolute inset-8 rounded-full border border-cyan-300/15" />
              <div className="absolute inset-20 rounded-full border border-cyan-300/20" />
              <div className="absolute inset-32 rounded-full border border-cyan-300/30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_58%)]" />
              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-cyan-300/40 bg-[#061a25]/90 text-cyan-300 shadow-[0_0_70px_rgba(34,211,238,0.18)]">
                <HeroIcon className="h-16 w-16" strokeWidth={1.2} />
              </div>
              {["left-8 top-1/2", "right-8 top-1/2", "left-1/2 top-8", "bottom-8 left-1/2"].map((position) => (
                <span key={position} className={`absolute ${position} h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]`} />
              ))}
              <p className="absolute bottom-4 right-0 font-mono text-7xl font-semibold tracking-[-0.08em] text-white/[0.06]">{hero.mark}</p>
            </div>
          </div>
        </section>

        <section className="section-space relative overflow-hidden bg-white text-[#102134]">
          <div className="section-shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">
            <div className="relative border-l-2 border-cyan-500 pl-6 sm:pl-8">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-600">{overview.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">{overview.title}</h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-slate-600">
              {overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="section-space bg-[#02070b] text-white">
          <div className="section-shell">
            <div className="mb-12 text-center">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">{highlights.eyebrow}</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{highlights.title}</h2>
            </div>
            <div className="grid border-y border-white/10 md:grid-cols-2 lg:grid-cols-4">
              {highlights.items.map((item, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <article key={item.title} className="relative border-b border-white/10 p-6 last:border-b-0 md:border-r lg:border-b-0 lg:last:border-r-0 sm:p-8">
                    <Icon className="h-7 w-7 text-cyan-300" strokeWidth={1.5} />
                    <h3 className="mt-8 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space bg-white text-[#102134]">
          <div className="section-shell">
            <div className="mb-12 max-w-4xl">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-600">{reasons.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{reasons.title}</h2>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.items.map((item, index) => (
                <div key={item} className="flex items-start gap-4 border-t border-slate-200 pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-cyan-600"><CheckCircle2 className="h-6 w-6" strokeWidth={1.5} /></span>
                  <div>
                    <span className="font-mono text-[0.65rem] text-slate-400">0{index + 1}</span>
                    <p className="mt-1 text-sm font-semibold leading-6">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space relative isolate overflow-hidden bg-[#07131b] text-white">
          <Image src={heroBg} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,10,16,0.98),rgba(3,10,16,0.75))]" />
          <div className="section-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">{statement.eyebrow}</p>
            <div>
              <h2 className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">{statement.title}</h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">{statement.description}</p>
            </div>
          </div>
        </section>

        <section className="section-space bg-white text-[#102134]">
          <div className="section-shell">
            <div className="mb-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-600">{scope.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{scope.title}</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">{scope.description}</p>
            </div>
            <div className="grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {scope.items.map((item, index) => (
                <article key={item.title} className="border-b border-r border-slate-200 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-8 w-8 items-center justify-center border border-cyan-500 text-cyan-600"><Check className="h-4 w-4" /></span>
                    <span className="font-mono text-[0.65rem] text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-base font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space relative overflow-hidden bg-[#010507] text-white">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] [background-size:100%_72px]" />
          <div className="section-shell relative">
            <div className="mb-12 text-center">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">{process.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{process.title}</h2>
            </div>
            <div className={`grid gap-px bg-white/10 md:grid-cols-2 ${process.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
              {process.items.map((step) => (
                <article key={`${step.number}-${step.title}`} className="min-h-64 bg-[#010507] p-6 sm:p-7">
                  <p className="font-mono text-5xl font-semibold tracking-[-0.06em] text-white/20">{step.number}</p>
                  <div className="mt-6 h-0.5 w-10 bg-cyan-300" />
                  <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.06em] text-white">{step.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{step.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href={sectionRoutes.contact} className="inline-flex min-h-11 items-center gap-3 border border-cyan-300 px-6 text-sm font-bold text-cyan-300 transition hover:bg-cyan-300 hover:text-[#031019]">
                {hero.cta}<ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-space border-t border-white/10 bg-[#031019] text-white">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">{differentiators.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{differentiators.title}</h2>
              <p className="mt-6 text-sm leading-6 text-slate-400">{differentiators.description}</p>
            </div>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {differentiators.items.map((item, index) => (
                <article key={item.title} className="border-l border-cyan-300/50 pl-5">
                  <div className="flex items-center gap-3 text-cyan-300">
                    {index % 2 === 0 ? <Sparkles className="h-5 w-5" /> : <CircleDot className="h-5 w-5" />}
                    <h3 className="text-sm font-bold uppercase tracking-[0.04em]">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
