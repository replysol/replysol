"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe2, Mail, Menu, X } from "lucide-react";
import Brand from "@/components/shared/brand";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const developmentNavigation = [
    { label: t.nav.softwareDevelopment, description: t.nav.softwareDevelopmentDescription, href: appRoutes.softwareDevelopment },
  ];
  const securityNavigation = [
    { label: t.nav.pentest, description: t.nav.pentestDescription, href: appRoutes.pentest },
  ];
  const solutionsNavigation = [...developmentNavigation, ...securityNavigation];
  const mainNavigation = [
    { label: t.nav.about, href: sectionRoutes.about },
    { label: t.nav.contact, href: sectionRoutes.contact },
  ];

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setMobileOpen(false);
  };

  const solutionGroups = [
    { label: locale === "pt-br" ? "Desenvolvimento" : "Development", items: developmentNavigation },
    { label: locale === "pt-br" ? "Segurança" : "Security", items: securityNavigation },
  ];

  const SolutionsDropdown = () => (
    <div className="group static flex h-full items-center">
      <button type="button" className="nav-link flex h-full items-center gap-1.5" aria-haspopup="menu">
        {t.nav.solutions}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute inset-x-0 top-full translate-y-1 border-t border-cyan-500 bg-white opacity-0 shadow-[0_28px_60px_rgba(5,25,40,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:bg-[#071724]">
        <div className="section-shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
          {solutionGroups.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex > 0 ? "border-l border-border pl-10" : ""}>
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.08em] text-[#123a5d] dark:text-white">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="group/link block py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#087bb9] transition group-hover/link:text-cyan-600">
                      {item.label}<span className="h-px w-0 bg-cyan-500 transition-all group-hover/link:w-5" />
                    </span>
                    <span className="mt-1 block max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky inset-x-0 top-0 z-50 shadow-[0_4px_24px_rgba(5,25,40,0.05)]">
      <div className="hidden h-8 bg-[#061827] text-slate-300 lg:block">
        <div className="section-shell flex h-full items-center justify-between text-[0.68rem]">
          <p className="font-semibold [letter-spacing:0.02em]">{t.nav.institutionalLine}</p>
          <a href="mailto:contato@replysolutions.com" className="flex items-center gap-2 transition-colors hover:text-white">
            <Mail className="h-3 w-3 text-cyan-400" /> contato@replysolutions.com
          </a>
        </div>
      </div>
      <nav className="relative h-[76px] border-b border-border bg-white dark:bg-background">
        <div className="section-shell flex h-full items-center justify-between gap-6">
          <Brand textClassName="text-sm xl:text-base" />

          <div className="hidden h-full items-center gap-7 lg:flex xl:gap-9">
            <SolutionsDropdown />
            {mainNavigation.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link flex h-full items-center">{item.label}</Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <label className="flex h-10 items-center gap-1.5 border border-border px-2.5 text-muted-foreground" title={t.nav.language}>
              <Globe2 className="h-4 w-4" />
              <select
                value={locale}
                onChange={(event) => handleLocaleChange(event.target.value as Locale)}
                className="bg-transparent text-xs font-semibold uppercase text-foreground outline-none"
                aria-label={t.nav.language}
              >
                <option value="pt-br">PT</option>
                <option value="en">EN</option>
              </select>
            </label>
            <Link href={sectionRoutes.contact} className="nav-action flex h-10 items-center bg-primary px-4 text-white transition hover:bg-primary/90">
              {t.nav.talk}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center border border-border text-foreground lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-border bg-background lg:hidden">
          <div className="section-shell py-6">
            <p className="meta-label mb-3 text-accent">{t.nav.solutions}</p>
            {solutionsNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block border-b border-border py-3 text-sm font-semibold">
                {item.label}
              </Link>
            ))}
            {mainNavigation.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="mt-4 block text-sm font-semibold uppercase">
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => handleLocaleChange(locale === "pt-br" ? "en" : "pt-br")} className="h-10 border border-border px-4 text-xs font-semibold">
                {locale === "pt-br" ? "English" : "Português"}
              </button>
              <Link href={sectionRoutes.contact} onClick={() => setMobileOpen(false)} className="flex h-10 flex-1 items-center justify-center bg-primary px-4 text-xs font-bold text-white">
                {t.nav.talk}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
