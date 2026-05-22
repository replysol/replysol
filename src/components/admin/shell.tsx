import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: ReactNode;
  className?: string;
};

const AdminShell = ({ children, className }: AdminShellProps) => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent)/0.12),_transparent_32%)]" />

      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-6 sm:px-6 sm:py-8",
          className,
        )}
      >
        {children}
      </div>
    </main>
  );
};

export default AdminShell;
