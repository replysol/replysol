"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Gauge, GitBranch, UsersRound } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const icons = [Gauge, GitBranch, UsersRound, AlertTriangle] as const;

const ProblemsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-space relative">
      <div className="container section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading eyebrow={t.problems.eyebrow} title={t.problems.title} />
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {t.problems.items.map(([title, description], index) => {
              const Icon = icons[index] ?? Gauge;

              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-lg border border-border/60 bg-card/70 p-5 backdrop-blur-md"
                >
                  <Icon className="mb-5 h-5 w-5 text-accent" />
                  <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;

