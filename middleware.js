import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
let defaultLocale = "en";
let locales = ["en", "bn"];

function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export default function middleware(request) {
  const pathname = request.nextUrl.pathname; //checking if user entered address with locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  ); //making sure pathname doesn't have any locale
  
  if (pathnameIsMissingLocale) {
    //detect user's preference & redirect with a locale with a pathname, e.g- /en/contact
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
  return NextResponse.next();
}

/**
 * First I need to detect if the user entered address with locale e.g /en/contact
 * If the address doesn't have any locale then detect user's preference and redirect with a locale with a pathname, e.g- /en/contact
 */

export const config = {
   matcher: ["/((?!_next).*)"],
};