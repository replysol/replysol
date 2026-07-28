"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  MessageCircleMore,
  Search,
  Smartphone,
  Store,
} from "lucide-react";
import { appRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";

const featureIcons = [Store, Smartphone, MessageCircleMore, Search] as const;

const FirstWebsiteSection = () => {
  const { t } = useI18n();
  const content = t.firstWebsite;

  return (
    <section className="relative overflow-hidden bg-[#eaf7fa] py-16 text-[#071b2d] sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(8,145,178,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div aria-hidden="true" className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="section-shell relative">
        <div className="grid overflow-hidden border border-cyan-900/10 bg-white shadow-[0_30px_90px_rgba(8,47,73,0.12)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-[#071b2d]">
              {content.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {content.features.map(([title, description], index) => {
                const Icon = featureIcons[index] ?? Check;
                return (
                  <div key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-cyan-50 text-cyan-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#0a2940]">{title}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="relative flex flex-col justify-between bg-[#08283e] p-7 text-white sm:p-10 lg:p-12">
            <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 border-b border-l border-white/10" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-300">
                {content.investmentLabel}
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-400 line-through decoration-slate-500">
                {content.originalPrice}
              </p>
              <p className="mt-5 font-mono text-[clamp(2.3rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-white">
                R$ 600
              </p>
              <div className="my-3 flex items-center gap-3 text-sm text-slate-400">
                <span className="h-px w-8 bg-cyan-400" />
                {content.to}
              </div>
              <p className="font-mono text-[clamp(2.3rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-cyan-300">
                R$ 1.500
              </p>
              <p className="mt-5 inline-flex bg-cyan-300 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-[#062238]">
                {content.savings}
              </p>
              <p className="mt-6 max-w-sm text-sm leading-6 text-slate-300">
                {content.priceNote}
              </p>
            </div>

            <div className="relative mt-10 border-t border-white/15 pt-7">
              <p className="mb-5 flex items-start gap-3 text-sm leading-6 text-slate-200">
                <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                {content.reassurance}
              </p>
              <Link
                href={appRoutes.firstWebsite}
                className="group flex min-h-12 w-full items-center justify-between bg-cyan-300 px-5 text-sm font-bold text-[#062238] transition hover:bg-white"
              >
                {content.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FirstWebsiteSection;
