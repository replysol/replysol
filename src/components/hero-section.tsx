"use client";

import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import heroBgLight from "@/assets/hero-bg-light.jpg";
import { useI18n } from "@/i18n/locale-provider";

const HeroSection = () => {
  const { t } = useI18n();
  const hero = t.hero;

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 hidden dark:block"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 block dark:hidden"
        style={{ backgroundImage: `url(${heroBgLight.src})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background dark:from-background/10 dark:via-background/60" />

      <div className="relative z-10 container hero-shell text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase sm:mb-8 sm:text-xs"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-title mb-5 font-bold tracking-tight text-gradient leading-[0.95] sm:mb-6"
        >
          {hero.titleLines[0]}
          <br />
          {hero.titleLines[1]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mb-10 max-w-xl font-mono text-sm tracking-wide text-muted-foreground sm:mb-12 sm:text-base"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#servicos"
            className="w-full rounded-sm bg-foreground px-8 py-3.5 font-mono text-xs tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90 sm:w-auto"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#contato"
            className="w-full rounded-sm border border-foreground/20 px-8 py-3.5 font-mono text-xs tracking-[0.15em] text-foreground transition-all duration-300 hover:border-foreground/50 sm:w-auto"
          >
            {hero.secondaryCta}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent animate-glow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
