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
  inverse?: boolean;
};

const Brand = ({ href = "/", className, textClassName, inverse = false }: BrandProps) => {
  return (
    <Link href={href} className={cn("flex items-center gap-3", className)} aria-label="Reply Solutions">
      {inverse ? (
        <Image src={logoLight} alt="" className="h-9 w-auto" aria-hidden="true" priority />
      ) : (
        <>
          <Image src={logoDark} alt="" className="block h-9 w-auto dark:hidden" aria-hidden="true" priority />
          <Image src={logoLight} alt="" className="hidden h-9 w-auto dark:block" aria-hidden="true" priority />
        </>
      )}
      <span className={cn("text-sm font-extrabold tracking-[-0.025em] text-foreground", inverse && "text-white", textClassName)}>
        REPLY<span className="font-medium text-accent"> / </span>SOLUTIONS
      </span>
    </Link>
  );
};

export default Brand;
