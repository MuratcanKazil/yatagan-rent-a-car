/**
 * src/proxy.ts — Admin şifre koruması (Next.js 16 Proxy)
 *
 * /admin ve /admin/* rotalarına gelen her isteği kontrol eder.
 * "admin_session" cookie'si yoksa /admin/login'e yönlendirir.
 * Login sayfası ve API rotaları bu kontrolün dışındadır.
 *
 * .env.local'a ekle:
 *   ADMIN_PASSWORD=güçlü_bir_şifre
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login sayfasını koruma dışında bırak (sonsuz döngü olmasın)
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Yalnızca /admin ve /admin/* rotalarını koru
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  // Cookie yoksa veya secret ile eşleşmiyorsa login'e yönlendir
  if (!session || !secret || session !== secret) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
