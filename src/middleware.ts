import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";
import { cookies } from "next/headers";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localeCookie = request.cookies.get("NEXT_LOCALE");
  const locale = localeCookie ? localeCookie.value : "vi";

  // Handle the root path, redirect based on the cookie locale
  if (pathname === "/") {
    if (locale === "vi") {
      request.nextUrl.pathname = "/vi";
    } else if (locale === "en") {
      const response = NextResponse.redirect(new URL("/en", request.url));
      return response;
    }
  }

  // Set cookie for "/vi" path and redirect to "/"
  if (pathname === "/vi") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("NEXT_LOCALE", "vi");
    return response;
  }

  // Set cookie for "/en" path and redirect to "/"
  if (pathname === "/en" && locale !== "en") {
    const response = NextResponse.redirect(new URL("/en", request.url));
    response.cookies.set("NEXT_LOCALE", "en");
    return response;
  }

  // Redirect paths starting with "/vi"
  if (pathname.startsWith("/vi")) {
    const newPathname = pathname.replace(/^\/vi/, "");
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // Ensure paths have "/vi" if the locale is Vietnamese
  if (locale === "vi" && !pathname.startsWith("/vi")) {
    request.nextUrl.pathname = `/vi${pathname}`;
  }

  // Ensure paths have "/en" if the locale is English
  if (locale === "en" && !pathname.startsWith("/en")) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
