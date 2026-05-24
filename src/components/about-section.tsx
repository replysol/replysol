"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const AboutSection = () => {
  const { t } = useI18n();
  const about = t.aboutSection;

  return (
    <section id="about" className="section-space relative overflow-hidden border-t border-border/50 bg-card/10">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent/0 via-accent/70 to-accent/0" />
      <div className="container section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.title}
              description={about.description}
              className="max-w-2xl"
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {about.pills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-sm border border-border/60 bg-background/70 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {pill}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-border/60 bg-background/85 p-6 shadow-[0_24px_70px_hsl(var(--foreground)/0.06)] backdrop-blur-md sm:p-8">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.22em] text-muted-foreground">
                {about.kicker}
              </p>
              <div className="mt-5 space-y-5">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {about.stats.map(([label, detail]) => (
                <div key={label} className="rounded-lg border border-border/60 bg-card/80 p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
