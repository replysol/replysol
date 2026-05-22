import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, getLocaleFromCountry, isLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code");
  const locale = isLocale(cookieLocale) ? cookieLocale : getLocaleFromCountry(country);

  requestHeaders.set("x-reply-locale", locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!isLocale(cookieLocale)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)"],
};
