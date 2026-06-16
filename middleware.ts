import { NextRequest, NextResponse } from "next/server";
import { csrfCookieName } from "@/lib/csrf";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(csrfCookieName)) {
    response.cookies.set(csrfCookieName, crypto.randomUUID().replace(/-/g, ""), {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24
    });
  }

  response.headers.set("X-XSS-Protection", "0");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|design-references).*)"]
};
