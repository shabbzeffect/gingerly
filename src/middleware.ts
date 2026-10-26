import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

const ADMIN_ROUTES = ["/admin"];
const LOGIN_ROUTE = "/admin/login";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = ADMIN_ROUTES.some((p) => path.startsWith(p));
  if (!isAdminRoute) return NextResponse.next();

  // Allow login page and auth API
  if (path === LOGIN_ROUTE || path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("gingerly_admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(path)}`, request.url));
  }

  try {
    const session = await getSession(token);
    if (!session) {
      return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(path)}`, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(path)}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/admin/:path*"],
};
