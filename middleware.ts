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
  // Skip static assets so Node is not involved on every image/css/js/video hit (speed + stability on live)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|css|js|ico|woff2?)$).*)",
  ],
};
