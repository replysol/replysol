"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";

type AppProvidersProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

const AppProviders = ({ children, initialLocale }: AppProvidersProps) => {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme={false}>
        <TooltipProvider>
          <Toaster />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default AppProviders;
