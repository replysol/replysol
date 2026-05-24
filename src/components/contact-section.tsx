"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[] | undefined>;
      } | null;

      if (!response.ok || !data?.ok) {
        const fieldError = data?.fieldErrors ? Object.values(data.fieldErrors).flat().find(Boolean) : undefined;
        throw new Error(fieldError || data?.error || t.contact.error);
      }

      setSubmitState("success");
      setFeedbackMessage(t.contact.success);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setSubmitState("error");
      setFeedbackMessage(error instanceof Error ? error.message : t.contact.error);
    }
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
                <label className="eyebrow-label block mb-2">{field.label}</label>
                <Input
                  type={field.type}
                  required={field.key !== "company"}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="h-12 rounded-sm border-0 border-b border-border/70 bg-transparent px-0 pb-3 text-sm text-foreground shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/30 font-mono"
                  autoComplete={field.key === "company" ? "organization" : field.key}
                />
              </div>
            ))}
            <div>
              <label className="eyebrow-label block mb-2">
                {t.contact.labels.message}
              </label>
              <Textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="min-h-32 rounded-sm border-0 border-b border-border/70 bg-transparent px-0 pb-3 text-sm text-foreground shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/30 font-mono resize-none"
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="mt-4 w-full rounded-sm bg-foreground px-8 py-3.5 font-mono text-xs tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {submitState === "sending" ? t.contact.sending : t.contact.submit}
              </button>
              {feedbackMessage ? (
                <p
                  className={`font-mono text-xs uppercase tracking-[0.08em] ${
                    submitState === "success" ? "text-emerald-600" : "text-destructive"
                  }`}
                  aria-live="polite"
                >
                  {feedbackMessage}
                </p>
              ) : null}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
