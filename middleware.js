import {NextResponse} from "next/server"
let defaultLocale = "en";
let locales = ["en", "bn"];

export default function middleware(request) {
  const pathname = request.nextUrl.pathname; //checking if user entered address with locale
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startWith(`/${locale}`) && !pathname.startWith(`/${locale}/`)
  );//making sure pathname doesn't have any locale
  if (pathnameIsMissingLocale) {
   //detect users preferecne
  }
  return NextResponse.next()
}

/**
 * first I need to detect if the user entered address with locale e.g /en/contact
 *  

*/
