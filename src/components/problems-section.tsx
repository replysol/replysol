"use client";

import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const ProblemsSection = () => {
  const { t } = useI18n();
  return (
    <section className="section-space bg-background">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <SectionHeading eyebrow={t.problems.eyebrow} title={t.problems.title} className="relative border-l-2 border-cyan-500 pl-6" />
          <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">{t.problems.description}</p>
        </div>
        <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
          {t.problems.items.map(([title, description], index) => {
            return (
              <article key={title} className="border-b border-border p-6 sm:border-r lg:border-b-0 lg:last:border-r-0 sm:p-7">
                <span className="font-mono text-[0.68rem] text-cyan-600">0{index + 1}</span>
                <div className="mt-5 h-0.5 w-8 bg-cyan-500" />
                <h3 className="mt-5 text-base font-semibold tracking-[-0.015em] text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
