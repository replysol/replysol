"use client"

import Image from "next/image";
import Link from "next/link";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { cn } from "@/lib/utils";

type BrandProps = {
  href?: string;
  className?: string;
  textClassName?: string;
};

const Brand = ({ href = "/", className, textClassName }: BrandProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-2", className)} aria-label="Reply Solutions">
      <Image src={logoDark} alt="" className="block h-8 w-auto dark:hidden" aria-hidden="true" priority />
      <Image src={logoLight} alt="" className="hidden h-8 w-auto dark:block" aria-hidden="true" priority />
      <span className={cn("font-mono text-sm font-bold tracking-wider text-foreground", textClassName)}>
        REPLY<span className="text-gradient-accent">_</span>SOLUTIONS
      </span>
    </Link>
  );
};

export default Brand;
