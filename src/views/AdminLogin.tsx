"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, LockKeyhole, ShieldCheck } from "lucide-react";
import AdminShell from "@/components/admin/shell";
import Brand from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { appRoutes } from "@/config/routes";
import { loginAdmin, MOCK_ADMIN_CREDENTIALS } from "@/lib/admin-auth";
import { useI18n } from "@/i18n/locale-provider";

const AdminLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const fillMockCredentials = async () => {
    setFormData({
      email: MOCK_ADMIN_CREDENTIALS.email,
      password: MOCK_ADMIN_CREDENTIALS.password,
    });

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API indisponível");
      }

      await navigator.clipboard.writeText(`${MOCK_ADMIN_CREDENTIALS.email} | ${MOCK_ADMIN_CREDENTIALS.password}`);
      toast({
        title: t.adminLogin.copiedTitle,
        description: t.adminLogin.copiedDescription,
      });
    } catch {
      toast({
        title: t.adminLogin.filledTitle,
        description: t.adminLogin.filledDescription,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const session = loginAdmin(formData.email, formData.password);

    if (!session) {
      setIsSubmitting(false);
      toast({
        title: t.adminLogin.invalidTitle,
        description: t.adminLogin.invalidDescription
          .replace("{{email}}", MOCK_ADMIN_CREDENTIALS.email)
          .replace("{{password}}", MOCK_ADMIN_CREDENTIALS.password),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t.adminLogin.successTitle,
      description: t.adminLogin.successDescription.replace("{{name}}", session.name),
    });
    router.replace(appRoutes.adminDashboard);
  };

  return (
    <AdminShell className="justify-between">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={appRoutes.home}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t.adminLogin.back}
        </Link>

        <Brand href={appRoutes.home} />
      </div>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-12">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
            {t.adminLogin.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            {t.adminLogin.title}
            <span className="block text-gradient-accent">{t.adminLogin.highlightedTitle}</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.adminLogin.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.adminLogin.features.map(([title, description], index) => {
              const Icon = index === 0 ? ShieldCheck : LockKeyhole;

              return (
              <div
                key={title}
                className="rounded-lg border border-border/60 bg-card/55 p-5 backdrop-blur-md"
              >
                <Icon className="mb-4 h-5 w-5 text-accent" />
                <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                  {title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
              );
            })}
          </div>
        </div>

        <Card className="border-border/60 bg-card/75 shadow-[0_30px_80px_hsl(var(--foreground)/0.08)] backdrop-blur-xl">
          <CardHeader className="space-y-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-sm border border-border/60 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5 text-accent" />
              {t.adminLogin.panelTag}
            </div>
            <CardTitle className="text-3xl">{t.adminLogin.panelTitle}</CardTitle>
            <CardDescription>{t.adminLogin.panelDescription}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-lg border border-border/60 bg-background/70 p-4">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {t.adminLogin.demoCredentials}
                    </p>
                    <p className="mt-2 text-sm text-foreground">{MOCK_ADMIN_CREDENTIALS.email}</p>
                    <p className="font-mono text-xs text-accent">{MOCK_ADMIN_CREDENTIALS.password}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={fillMockCredentials}>
                    <Copy />
                    {t.adminLogin.fill}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="admin-email"
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                >
                  {t.adminLogin.email}
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@replysolutions.com"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  className="h-12 border-border/70 bg-background/70 font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label
                    htmlFor="admin-password"
                    className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
                  >
                    {t.adminLogin.password}
                  </Label>
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: t.adminLogin.forgotTitle,
                        description: t.adminLogin.forgotDescription,
                      })
                    }
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-foreground"
                  >
                    {t.adminLogin.forgot}
                  </button>
                </div>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                  className="h-12 border-border/70 bg-background/70 font-mono"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 w-full font-mono text-xs uppercase tracking-[0.2em]"
              >
                {isSubmitting ? t.adminLogin.submitting : t.adminLogin.submit}
              </Button>

              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                {t.adminLogin.helperText}
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  );
};

export default AdminLogin;
