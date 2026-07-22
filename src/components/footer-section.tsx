"use client";

import Link from "next/link";
import Brand from "@/components/shared/brand";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/locale-provider";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/10 bg-[#051522] text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
        <div>
          <Brand inverse />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">{t.footer.description}</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-white">{t.footer.solutions}</p>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block transition hover:text-cyan-300" href={appRoutes.softwareDevelopment}>{t.nav.softwareDevelopment}</Link>
            <Link className="block transition hover:text-cyan-300" href={appRoutes.mobileDevelopment}>{t.nav.mobileDevelopment}</Link>
            <Link className="block transition hover:text-cyan-300" href={appRoutes.pentest}>{t.nav.pentest}</Link>
            <Link className="block transition hover:text-cyan-300" href={appRoutes.nova}>{t.nav.aiReviewer}</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-white">{t.footer.company}</p>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block transition hover:text-cyan-300" href={sectionRoutes.about}>{t.nav.about}</Link>
            <Link className="block transition hover:text-cyan-300" href={sectionRoutes.contact}>{t.nav.contact}</Link>
            <a className="block transition hover:text-cyan-300" href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-slate-500">© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}. {t.footer.rights}</p>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.08em] text-slate-500">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
