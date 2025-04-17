// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
