"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import { Bug, CloudCog, Code2, Gauge, Network, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServicesSection = () => {
  const { t } = useI18n();
  const icons = [Code2, CloudCog, ShieldCheck, Network, Gauge, Bug] as const;

  return (
    <section id="servicos" className="section-space relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative container section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {t.services.items.map((service, index) => {
            const Icon = icons[index];

            return (
            <motion.div
              key={service.title}
              variants={item}
              className="rounded-lg border border-border/60 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:shadow-[0_24px_60px_hsl(var(--foreground)/0.06)] sm:p-6"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300 mb-6" />
              <h3 className="font-mono text-md font-semibold tracking-wide text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
