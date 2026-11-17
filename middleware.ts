import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Request id for staging/debug correlation (safe, non-sensitive)
  response.headers.set("X-Request-Id", crypto.randomUUID());

  // Block common probe paths early
  const path = request.nextUrl.pathname.toLowerCase();
  if (
    path.includes("wp-admin") ||
    path.includes("wp-login") ||
    path.includes(".php") ||
    path.includes("/.env")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
