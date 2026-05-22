"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/i18n/locale-provider";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-sm border border-border/60" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="p-2 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
      aria-label={dark ? t.theme.light : t.theme.dark}
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
