import Link from "next/link";
import { headers } from "next/headers";
import { appRoutes } from "@/config/routes";
import { dictionaries } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function NotFound() {
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-reply-locale");
  const locale = isLocale(localeHeader) ? localeHeader : defaultLocale;
  const t = dictionaries[locale].notFound;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.title}</p>
        <Link href={appRoutes.home} className="text-primary underline hover:text-primary/90">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
