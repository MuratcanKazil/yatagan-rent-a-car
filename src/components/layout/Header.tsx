"use client";

/**
 * ============================================================
 *  components/layout/Header.tsx
 *  Üst navigasyon + dil (TR/EN) ve para birimi (₺/€/$) seçicileri
 *  + mobil açılır menü. Dil/para birimi değişimi AppContext'e yazılır,
 *  böylece Hero ve diğer bileşenler anında güncellenir.
 *
 *  Client component → açılır menü ve seçiciler interaktif.
 * ============================================================
 */

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import Container from "@/components/ui/Container";
import { CarIcon, MenuIcon, PinIcon } from "@/components/ui/icons";
import { aktifLokasyonlar } from "@/lib/locations";
import type { Lang } from "@/lib/i18n";
import type { Currency } from "@/lib/currency";

// Navigasyon linkleri tek yerde — eklemek/çıkarmak kolay olsun
const NAV_ITEMS: { key: "nav.fleet" | "nav.transfer" | "nav.blog" | "nav.faq" | "nav.terms"; href: string }[] = [
  { key: "nav.fleet", href: "/araclar" },
  { key: "nav.transfer", href: "/transfer" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.faq", href: "/sss" },
  { key: "nav.terms", href: "/kiralama-kosullari" },
];

export default function Header() {
  const { t, lang, setLang, currency, setCurrency } = useApp();
  const [open, setOpen] = useState(false); // mobil menü durumu
  const [lokAcik, setLokAcik] = useState(false); // lokasyonlar dropdown
  const lokasyonlar = aktifLokasyonlar();

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <Container>
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
              <CarIcon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">HAKAN TOPÇU</span>
          </Link>

          {/* Masaüstü navigasyon */}
          <ul className="hidden items-center gap-8 text-sm font-medium text-white/80 lg:flex">
            {/* Filo */}
            <li>
              <Link href="/araclar" className="transition hover:text-white">
                {t("nav.fleet")}
              </Link>
            </li>

            {/* Lokasyonlar dropdown (SEO sayfalarına linkler) */}
            <li
              className="relative"
              onMouseEnter={() => setLokAcik(true)}
              onMouseLeave={() => setLokAcik(false)}
            >
              <button className="flex items-center gap-1 transition hover:text-white">
                Lokasyonlar
                <svg
                  className={`h-3.5 w-3.5 transition ${lokAcik ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {lokAcik && (
                <div className="absolute left-0 top-full w-56 pt-3">
                  <ul className="overflow-hidden rounded-xl2 border border-black/5 bg-white py-2 shadow-float">
                    {lokasyonlar.map((lok) => (
                      <li key={lok.slug}>
                        <a
                          href={`/${lok.slug}-rent-a-car`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist"
                        >
                          <PinIcon className="h-4 w-4 text-amber" />
                          {lok.ad} Rent a Car
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Diğer linkler (transfer, blog, sss, kosullar) */}
            {NAV_ITEMS.filter((i) => i.key !== "nav.fleet").map((item) => (
              <li key={item.key}>
                <a href={item.href} className="transition hover:text-white">
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Sağ kontroller */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dil seçici */}
            <div className="hidden items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold text-white/70 sm:flex">
              {(["tr", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2.5 py-1 uppercase transition ${
                    lang === l ? "bg-amber text-ink" : "hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Para birimi seçici */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="hidden rounded-full border border-white/15 bg-transparent px-2.5 py-1.5 text-xs font-semibold text-white/80 outline-none focus:border-amber sm:block"
            >
              <option className="text-ink" value="TRY">₺ TRY</option>
              <option className="text-ink" value="EUR">€ EUR</option>
              <option className="text-ink" value="USD">$ USD</option>
            </select>

            {/* Üye girişi */}
            <Link
              href="/admin"
              className="hidden rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:inline-block"
            >
              {t("nav.login")}
            </Link>

            {/* Mobil menü tetiği */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menü"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobil açılır menü */}
      {open && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur lg:hidden">
          <Container className="py-4">
            <ul className="flex flex-col gap-1 text-white/85">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="block rounded-lg px-3 py-2.5 hover:bg-white/10">
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobil lokasyon linkleri */}
            <div className="mt-2 border-t border-white/10 pt-2">
              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white/40">
                Lokasyonlar
              </p>
              <ul className="flex flex-col gap-1 text-white/85">
                {lokasyonlar.map((lok) => (
                  <li key={lok.slug}>
                    <a
                      href={`/${lok.slug}-rent-a-car`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-white/10"
                    >
                      <PinIcon className="h-4 w-4 text-amber" />
                      {lok.ad} Rent a Car
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              {(["tr", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase ${
                    lang === l ? "bg-amber text-ink" : "text-white/80"
                  }`}
                >
                  {l}
                </button>
              ))}
              <Link href="/admin" className="ml-auto rounded-full bg-amber px-4 py-1.5 text-xs font-bold text-ink">
                {t("nav.login")}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
