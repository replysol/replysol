"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import Brand from "@/components/shared/brand";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const serviceNavigation = [
    { label: t.nav.softwareDevelopment, href: appRoutes.softwareDevelopment },
    { label: t.nav.aiReviewer, href: appRoutes.aiCodeReviewerSecurity },
    { label: t.nav.pentest, href: appRoutes.pentest },
  ] as const;
  const mainNavigation = [
    { label: t.nav.about, href: sectionRoutes.about },
    { label: t.nav.contact, href: sectionRoutes.contact },
  ] as const;

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setMobileOpen(false);
  };

  const LanguageSelector = ({ compact = false }: { compact?: boolean }) => (
    <label className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 nav-action text-muted-foreground">
      <Globe2 className="h-4 w-4" />
      <span className={compact ? "sr-only" : ""}>{t.nav.language}</span>
      <select
        value={locale}
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
        className="bg-transparent text-foreground outline-none"
        aria-label={t.nav.language}
      >
        <option value="pt-br">{t.nav.portuguese}</option>
        <option value="en">{t.nav.english}</option>
      </select>
    </label>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
    >
      <div className="container flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Brand href="/" textClassName="text-sm sm:text-base" />

        <div className="hidden lg:flex items-center gap-6">
          <div className="group relative">
            <button
              type="button"
              className="nav-link flex items-center gap-1 appearance-none border-0 bg-transparent p-0"
              aria-haspopup="menu"
            >
              {t.nav.services}
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-3 rounded-lg border border-border/60 bg-background/95 p-2 opacity-0 shadow-[0_24px_70px_hsl(var(--foreground)/0.12)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
              {serviceNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-sm px-4 py-3 nav-link transition hover:bg-card hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {mainNavigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector compact />
          <a
            href={sectionRoutes.contact}
            className="nav-action px-4 py-2 border border-foreground/20 rounded-sm text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {t.nav.talk}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-foreground transition-all ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col p-6 gap-4">
            <div className="space-y-3">
              <p className="nav-link text-foreground">
                {t.nav.services}
              </p>
              <div className="grid gap-2 pl-3">
                {serviceNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="nav-link"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {mainNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 mt-2">
              <ThemeToggle />
              <LanguageSelector compact />
              <a
                href={sectionRoutes.contact}
                onClick={() => setMobileOpen(false)}
                className="flex-1 nav-action px-5 py-3 border border-foreground/20 rounded-sm text-foreground text-center hover:bg-foreground hover:text-background transition-all"
              >
                {t.nav.talk}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
