"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const SoftwareEngineerSection = () => {
  const { t } = useI18n();

  return (
    <section id="sobre" className="section-space relative border-t border-border/50">
      <div className="container section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              eyebrow={t.software.eyebrow}
              title={
                <>
                  {t.software.titleLines[0]}
                  <br />
                  {t.software.titleLines[1]}
                  <br />
                  {t.software.titleLines[2]}
                </>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {t.software.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-8 sm:gap-8">
              {t.software.stats.map(([value, label]) => (
                <div key={label}>
                  <p className="font-mono text-xl font-bold text-foreground sm:text-2xl">{value}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mt-1 uppercase">
                    {label}
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

export default SoftwareEngineerSection;
