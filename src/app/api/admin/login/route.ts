/**
 * src/app/api/admin/login/route.ts — Şifre doğrulama ucu
 *
 * POST /api/admin/login  { password: string }
 *   → Doğruysa httpOnly cookie set eder, 200 döner
 *   → Yanlışsa 401 döner
 *
 * DELETE /api/admin/login
 *   → Cookie'yi siler (çıkış)
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 saat

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "Sunucu yapılandırması eksik. .env.local dosyasını kontrol edin." },
      { status: 500 }
    );
  }

  if (!password || password !== adminPassword) {
    // Kaba kuvvet saldırılarını yavaşlatmak için küçük gecikme
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Hatalı şifre." }, { status: 401 });
  }

  // Şifre doğru: session cookie set et
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionSecret, {
    httpOnly: true,     // JS ile okunamaz
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ ok: true }, { status: 200 });
}
