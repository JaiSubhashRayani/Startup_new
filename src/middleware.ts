import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require auth
  const publicPaths = ["/", "/login", "/signup", "/api/webhooks"];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Delivery pages are public (access via token)
  const isDeliveryPage = pathname.startsWith("/d/");

  if (isPublicPath || isDeliveryPage) {
    return NextResponse.next();
  }

  // For dashboard routes, check for Supabase session
  // TODO: Implement actual Supabase auth check
  // For now, allow all requests through

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
