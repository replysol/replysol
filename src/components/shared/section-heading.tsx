"use client"

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "space-y-4",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="section-title font-bold tracking-tight">{title}</h2>
      {description ? (
        <p className="section-description text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
