export const LOCALE_COOKIE = "reply_locale";

export const locales = ["pt-br", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "pt-br" || value === "en";
}

export function getLocaleFromCountry(country: string | undefined | null): Locale {
  if (!country) {
    return defaultLocale;
  }

  return country.toUpperCase() === "BR" ? "pt-br" : "en";
}
