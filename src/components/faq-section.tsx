"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "./shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useI18n();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section-space border-t border-border bg-card">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">{t.faq.description}</p>
        </div>

        <div className="overflow-hidden border border-border bg-card">
          {t.faq.items.map(([question, answer], index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden border-b border-border last:border-b-0"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-5 bg-card px-5 py-6 text-left transition hover:bg-secondary/40 sm:px-6"
                >
                  <span className="text-base font-semibold leading-6 tracking-[-0.01em] text-foreground">{question}</span>

                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-accent transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-border bg-secondary/25 px-5 py-5 text-sm leading-7 text-muted-foreground sm:px-6">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
