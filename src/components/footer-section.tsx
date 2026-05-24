"use client";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/locale-provider";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 py-10 sm:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left">
        <p className="meta-label">
          © {new Date().getFullYear()} {siteConfig.name.toUpperCase()}. {t.footer.rights}
        </p>
        <p className="meta-label text-muted-foreground/50">
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
