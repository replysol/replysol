"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useState } from "react";
import RioInnovationWeek from "../assets/events/rio-innovation-week.png";
import BrazilianArmyOne from "../assets/events/brazilian-army-01.png";
import BrazilianArmyTwo from "../assets/events/brazilian-army-02.png";
import Image from "next/image";
import { useI18n } from "@/i18n/locale-provider";

const images = [
  BrazilianArmyOne,
  RioInnovationWeek,
  BrazilianArmyTwo
];

const TeamCarouselSection = () => {
  const [index, setIndex] = useState(0);
  const { t } = useI18n();

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="section-space relative border-t border-border/50 bg-card/20">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative container section-shell">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/70 backdrop-blur-md">
              <Image src={images[index]} alt={t.team.imageAlt} className="w-full h-[500px] object-cover" />
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
              <button
                type="button"
                aria-label={t.team.previous}
                onClick={prev}
                className="p-2 rounded-full border border-border/60 bg-background/80 hover:border-accent/40 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label={t.team.next}
                onClick={next}
                className="p-2 rounded-full border border-border/60 bg-background/80 hover:border-accent/40 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-accent">
              <Users className="h-4 w-4" />
              {t.team.eyebrow}
            </div>

            <h3 className="text-2xl font-semibold text-foreground">
              {t.team.title}
            </h3>

            <p className="text-md leading-relaxed text-muted-foreground">
              {t.team.paragraphs[0]}
            </p>

            <p className="text-md leading-relaxed text-muted-foreground">
              {t.team.paragraphs[1]}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-accent/30 via-border to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamCarouselSection;
