"use client";

/**
 * src/components/admin/AdminHeader.tsx
 * Admin paneli üst bar — logo, site linki ve çıkış butonu.
 */

import { useState } from "react";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import { CarIcon } from "@/components/ui/icons";

export default function AdminHeader() {
  const [cikisYapiliyor, setCikisYapiliyor] = useState(false);

  async function cikisYap() {
    setCikisYapiliyor(true);
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="relative bg-ink">
      <div className="headlight-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        {/* Logo */}
<<<<<<< HEAD
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
            <CarIcon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">HAKAN TOPÇU</span>
          <span className="ml-1 hidden text-sm font-medium text-white/50 sm:inline">
            Yönetim Paneli
          </span>
        </Link>

        {/* Sağ butonlar */}
        <div className="flex items-center gap-2">
          <Link
=======
        <a href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
            <CarIcon className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">AURIGA</span>
          <span className="ml-1 hidden text-sm font-medium text-white/50 sm:inline">
            Yönetim Paneli
          </span>
        </a>

        {/* Sağ butonlar */}
        <div className="flex items-center gap-2">
          <a
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            href="/araclar"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Siteyi Gör
<<<<<<< HEAD
          </Link>
=======
          </a>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
          <button
            onClick={cikisYap}
            disabled={cikisYapiliyor}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-50"
          >
            {cikisYapiliyor ? "Çıkılıyor…" : "Çıkış"}
          </button>
        </div>
      </div>
    </header>
  );
}
