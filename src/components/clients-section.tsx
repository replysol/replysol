"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/section-heading";
import SouthAmericaServersLogo from "@/assets/clients/south-america-servers.svg";
import { useI18n } from "@/i18n/locale-provider";

const logos = {
  "south-america-servers": SouthAmericaServersLogo,
};

const ClientsSection = () => {
  const { t } = useI18n();

  return (
    <section id="clientes" className="relative border-t border-border/50 py-20 sm:py-24">
      <div className="container section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <SectionHeading eyebrow={t.clients.eyebrow} title={t.clients.title} centered />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6"
        >
          {Object.keys(logos).map((client, i) => {
            const Logo = logos[client.toLowerCase() as keyof typeof logos];

            return (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center justify-center py-6"
              >
                <Logo className="h-20 text-muted-foreground hover:text-foreground transition-colors opacity-70 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
