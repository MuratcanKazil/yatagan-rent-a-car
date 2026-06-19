"use client";

/**
 * src/app/admin/login/page.tsx — Admin giriş ekranı
 *
 * Şifre doğru girilirse /api/admin/login POST isteği atar,
 * sunucu cookie set eder ve /admin'e yönlendirir.
 */

import { useState } from "react";
import { CarIcon } from "@/components/ui/icons";

export default function AdminLoginPage() {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setHata(null);
    setYukleniyor(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: sifre }),
      });

      if (res.ok) {
        // Cookie set edildi, admin paneline git
        window.location.href = "/admin";
      } else {
        const veri = await res.json().catch(() => ({}));
        setHata(veri?.error ?? "Hatalı şifre.");
        setSifre("");
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink">
      <div className="headlight-glow pointer-events-none absolute inset-0" />

      <div className="relative w-full max-w-sm rounded-xl2 border border-white/10 bg-surface p-8 shadow-float">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber text-ink shadow-card">
            <CarIcon className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div className="text-center">
<<<<<<< HEAD
            <p className="font-display text-lg font-bold text-white">HAKAN TOPÇU</p>
=======
            <p className="font-display text-lg font-bold text-white">AURIGA</p>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            <p className="text-sm text-white/50">Yönetim Paneli</p>
          </div>
        </div>

        <form onSubmit={gonder} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Şifre
            </label>
            <input
              type="password"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              placeholder="••••••••"
              autoFocus
              required
              className="w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/20"
            />
          </div>

          {hata && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400">
              {hata}
            </p>
          )}

          <button
            type="submit"
            disabled={yukleniyor || !sifre}
            className="w-full rounded-lg bg-amber px-4 py-3 text-sm font-bold text-ink shadow-card transition hover:bg-amber-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {yukleniyor ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/30">
          Bu sayfa yalnızca yetkili personele açıktır.
        </p>
      </div>
    </main>
  );
}
