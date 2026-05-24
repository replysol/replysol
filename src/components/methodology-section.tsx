"use client";

import { motion } from "framer-motion";
import { Award, CalendarDays, ChevronDown, ChevronUp, GitBranch } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import { MethodologyItem } from "@/types/methodology.types";
import { useI18n } from "@/i18n/locale-provider";

const VISIBLE_ITEMS = 4;

const MethodologySection = () => {
  const { t } = useI18n();
  const methodologySteps: MethodologyItem[] = t.methodology.steps.map(([category, title, description]) => ({
    category,
    title,
    description,
  }));

  const [startIndex, setStartIndex] = useState(0);
  const visibleMethodology = methodologySteps.slice(startIndex, startIndex + VISIBLE_ITEMS);
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + VISIBLE_ITEMS < methodologySteps.length;

  return (
    <section id="technologies" className="section-space relative border-t border-border/50 bg-card/20">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative container section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <SectionHeading
            eyebrow={t.methodology.eyebrow}
            title={t.methodology.title}
            description={t.methodology.description}
            centered
          />
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <button
            type="button"
            aria-label={t.methodology.previous}
            onClick={() => setStartIndex((current) => Math.max(0, current - 1))}
            disabled={!canGoUp}
            className="absolute left-3 md:left-1/2 top-0 z-20 inline-flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground backdrop-blur transition-all duration-300 hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={t.methodology.next}
            onClick={() => setStartIndex((current) => Math.min(methodologySteps.length - VISIBLE_ITEMS, current + 1))}
            disabled={!canGoDown}
            className="absolute left-3 md:left-1/2 bottom-0 z-20 inline-flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground backdrop-blur transition-all duration-300 hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          <div className="absolute left-3 md:left-1/2 top-5 bottom-5 w-px -translate-x-1/2 bg-gradient-to-b from-accent/20 via-accent to-border" />

          <div className="space-y-8 py-10 transition-all duration-300 sm:space-y-12">
            {visibleMethodology.map((item, index) => {
              const isReversed = index % 2 === 0;

              return (
                <motion.article
                  key={`${item.title}-${startIndex}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={cn(
                    "relative flex flex-col gap-5 md:flex-row md:gap-8",
                    isReversed && "md:flex-row-reverse",
                  )}
                >
                  <div className="absolute left-3 md:left-1/2 top-8 -translate-x-1/2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-accent/50 bg-background shadow-[0_0_0_6px_hsl(var(--background))]">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "ml-10 md:ml-0 md:w-1/2",
                      isReversed ? "md:pr-12" : "md:pl-12",
                    )}
                  >
                    <div className="rounded-lg border border-border/60 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:shadow-[0_24px_60px_hsl(var(--foreground)/0.06)] sm:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                          <Award className="h-4 w-4" />
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mb-3 text-lg font-semibold text-foreground sm:text-xl">{item.title}</h3>

                      {item.period ? (
                        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {item.period}
                          </span>
                        </div>
                      ) : null}

                      <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                        {item.description}
                      </p>

                      <div className="h-px w-full bg-gradient-to-r from-accent/30 via-border to-transparent" />
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex max-w-full items-center gap-3 rounded-lg border border-border/60 bg-card/65 px-4 py-4 text-center backdrop-blur-md sm:px-6">
            <GitBranch className="h-4 w-4 text-accent" />
            <p className="meta-label">
              {t.methodology.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologySection;
