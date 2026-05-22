"use client"

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/locale-provider";

const WhatsAppButton = () => {
  const { t } = useI18n();
  const phone = "5521999999999";
  const message = t.whatsapp;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative flex items-center justify-center h-14 w-14 rounded-full border border-border/60 bg-card/80 backdrop-blur-md shadow-lg">
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/40"
          animate={{
            scale: [1, 1.4],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        <MessageCircle className="h-6 w-6 text-accent relative z-10" />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
