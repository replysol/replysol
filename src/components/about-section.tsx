"use client";

import { Check } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const AboutSection = () => {
  const { t } = useI18n();
  const about = t.aboutSection;
  return (
    <section id="about" className="section-space bg-background">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />

          <div className="border-l-2 border-cyan-500 pl-6 sm:pl-8">
            <p className="text-lg leading-8 text-foreground">{about.description}</p>
            <p className="mt-6 text-base leading-7 text-muted-foreground">{about.paragraphs[0]}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{about.paragraphs[1]}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 border-t border-border pt-8 md:grid-cols-3">
          {about.pills.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-foreground">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-cyan-500 text-cyan-600"><Check className="h-3.5 w-3.5" /></span>
              {item}
            </div>
          ))}
        </div>

        <div className="mt-12 grid border-y border-border md:grid-cols-3">
              {about.stats.map(([label, detail]) => (
                <div key={label} className="border-b border-border py-6 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 sm:py-7">
                  <div className="mb-4 h-0.5 w-8 bg-cyan-500" />
                  <p className="text-sm font-bold text-primary">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
