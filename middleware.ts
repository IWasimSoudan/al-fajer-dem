import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  const lang = pathname.split("/")[1] ?? "";
  const response = NextResponse.next();
  if (locales.includes(lang)) {
    response.headers.set("x-lang", lang);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|logo.jpg|favicon.ico).*)"],
};
