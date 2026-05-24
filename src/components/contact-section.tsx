"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/locale-provider";

const ContactSection = () => {
  const { t } = useI18n();
  const contact = {
    email: "contato@replysolutions.com",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.contact.subject} - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `${t.contact.bodyLabels.name}: ${formData.name}\n${t.contact.bodyLabels.company}: ${formData.company}\n${t.contact.bodyLabels.email}: ${formData.email}\n\n${formData.message}`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contact" className="section-space relative border-t border-border/50">
      <div className="container section-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              eyebrow={t.contact.eyebrow}
              title={
                <>
                  {t.contact.heading[0]}
                  <br />
                  {t.contact.heading[1]}
                </>
              }
              description={t.contact.description}
            />

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 break-all font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {contact.email}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {[
              { key: "name", label: t.contact.labels.name, type: "text" },
              { key: "email", label: t.contact.labels.email, type: "email" },
              { key: "company", label: t.contact.labels.company, type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="eyebrow-label block mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.key !== "company"}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full bg-transparent border-b border-border/70 pb-3 text-sm text-foreground outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30 font-mono"
                />
              </div>
            ))}
            <div>
              <label className="eyebrow-label block mb-2">
                {t.contact.labels.message}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full bg-transparent border-b border-border/70 pb-3 text-sm text-foreground outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/30 font-mono resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-foreground px-8 py-3.5 font-mono text-xs tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90 sm:w-auto"
            >
              {t.contact.submit}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
