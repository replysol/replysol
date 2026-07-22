"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const solutionRoutes = [
  appRoutes.softwareDevelopment,
  appRoutes.pentest,
] as const;

const HeroSection = () => {
  const { t } = useI18n();
  const hero = t.hero;

  return (
    <section className="relative isolate overflow-hidden bg-[#030b12] text-white">
      <Image src={heroBg} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,10,17,0.99)_0%,rgba(3,15,25,0.92)_48%,rgba(3,15,25,0.28)_100%)]" />

      <div className="section-shell flex min-h-[590px] items-center py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cyan-300">
            <span className="h-px w-9 bg-cyan-300" />{hero.eyebrow}
          </p>
          <h1 className="mt-7 max-w-[760px] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            {hero.titleLines[0]} {hero.titleLines[1]}
          </h1>
          <div className="mt-7 h-0.5 w-28 bg-cyan-300" />
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{hero.offer}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={sectionRoutes.contact} className="inline-flex min-h-12 items-center justify-center gap-3 border border-cyan-300 bg-cyan-300 px-6 text-sm font-bold text-[#031019] transition hover:bg-cyan-200">
              {hero.primaryCta}<ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={sectionRoutes.services} className="inline-flex min-h-12 items-center justify-center border border-white/35 px-6 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200">
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/45 backdrop-blur-sm">
        <div className="section-shell grid sm:grid-cols-2">
          {t.homeServices.items.map((item, index) => {
            const title = item[0];
            return (
              <Link key={title} href={solutionRoutes[index] ?? sectionRoutes.services} className="group flex min-h-20 items-center justify-between gap-4 border-b border-white/10 py-4 last:border-b-0 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.65rem] text-cyan-300">0{index + 1}</span>
                  <span className="text-sm font-semibold text-white">{title}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
