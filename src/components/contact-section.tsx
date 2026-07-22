"use client";

import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/i18n/locale-provider";

const ContactSection = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");
    setFeedbackMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string[] | undefined> } | null;
      if (!response.ok || !data?.ok) {
        const fieldError = data?.fieldErrors ? Object.values(data.fieldErrors).flat().find(Boolean) : undefined;
        throw new Error(fieldError || data?.error || t.contact.error);
      }
      setSubmitState("success");
      setFeedbackMessage(t.contact.success);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      setSubmitState("error");
      setFeedbackMessage(error instanceof Error ? error.message : t.contact.error);
    }
  };

  return (
    <section id="contact" className="section-space relative overflow-hidden bg-[#071b2d] text-white">
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-400/[0.08] blur-3xl" />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:pt-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-300">{t.contact.eyebrow}</p>
          <h2 className="section-title mt-4 max-w-xl font-semibold text-white">{t.contact.heading[0]} {t.contact.heading[1]}</h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">{t.contact.description}</p>
          <div className="mt-8 space-y-3">
            {t.contact.nextSteps.map((item) => (
              <p key={item} className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />{item}
              </p>
            ))}
          </div>
          <a href="mailto:contato@replysolutions.com" className="mt-9 flex items-center gap-3 text-sm font-semibold text-white transition hover:text-cyan-300">
            <Mail className="h-5 w-5 text-cyan-300" /> contato@replysolutions.com
          </a>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-xs font-bold uppercase text-slate-400 [letter-spacing:0.08em]">{t.contact.responseTime}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 border border-white/15 bg-white p-6 text-[#14263a] shadow-[0_28px_80px_rgba(0,0,0,0.2)] sm:grid-cols-2 sm:p-9">
          {[
            { key: "name", label: t.contact.labels.name, type: "text" },
            { key: "email", label: t.contact.labels.email, type: "email" },
            { key: "company", label: t.contact.labels.company, type: "text" },
          ].map((field) => (
            <label key={field.key} className={field.key === "company" ? "sm:col-span-2" : ""}>
              <span className="mb-2 block text-xs font-bold text-slate-600">{field.label}</span>
              <Input
                type={field.type}
                required={field.key !== "company"}
                value={formData[field.key as keyof typeof formData]}
                onChange={(event) => setFormData((previous) => ({ ...previous, [field.key]: event.target.value }))}
                className="h-12 rounded-none border-slate-300 bg-slate-50 text-[#14263a] focus-visible:border-cyan-600 focus-visible:ring-cyan-600"
                autoComplete={field.key === "company" ? "organization" : field.key}
              />
            </label>
          ))}
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-bold text-slate-600">{t.contact.labels.message}</span>
            <Textarea required rows={5} value={formData.message} onChange={(event) => setFormData((previous) => ({ ...previous, message: event.target.value }))} className="min-h-32 resize-none rounded-none border-slate-300 bg-slate-50 text-[#14263a] focus-visible:border-cyan-600 focus-visible:ring-cyan-600" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" disabled={submitState === "sending"} className="flex min-h-12 w-full items-center justify-center gap-3 bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto">
              {submitState === "sending" ? t.contact.sending : t.contact.submit}<ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-4 text-xs leading-5 text-slate-500">{t.contact.privacyNote}</p>
            {feedbackMessage && <p className={`mt-3 text-xs ${submitState === "success" ? "text-emerald-700" : "text-red-700"}`} aria-live="polite">{feedbackMessage}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
