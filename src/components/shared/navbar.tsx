"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Globe2 } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import Brand from "@/components/shared/brand";
import { appRoutes, sectionRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const mainNavigation = [
    { label: t.nav.services, href: sectionRoutes.services },
    { label: t.nav.aiReviewer, href: appRoutes.aiCodeReviewerSecurity },
    { label: t.nav.technologies, href: sectionRoutes.technologies },
    { label: t.nav.about, href: sectionRoutes.about },
    { label: t.nav.contact, href: sectionRoutes.contact },
  ] as const;

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setMobileOpen(false);
  };

  const LanguageSelector = ({ compact = false }: { compact?: boolean }) => (
    <label className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
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
        <Brand href="/" textClassName="text-xs sm:text-sm" />

        <div className="hidden lg:flex items-center gap-8">
          {mainNavigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <LanguageSelector compact />
          <a
            href={sectionRoutes.contact}
            className="font-mono text-xs tracking-[0.15em] px-5 py-2 border border-foreground/20 rounded-sm text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
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
            {mainNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
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
                className="flex-1 font-mono text-xs tracking-[0.15em] px-5 py-3 border border-foreground/20 rounded-sm text-foreground text-center hover:bg-foreground hover:text-background transition-all"
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
