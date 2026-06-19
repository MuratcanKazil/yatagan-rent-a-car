"use client";

/**
 * ============================================================
 *  components/sections/Hero.tsx
 *  Sayfanın tezi: "gece sürüşü" atmosferi + hızlı rezervasyon.
 *  Koyu zemin, far parıltısı (headlight-glow), mono fontlu güven
 *  istatistikleri ve hero'ya taşan Rezervasyon modülü (BookingWidget).
 *
 *  Client component → çeviriyi (useApp) okuyor.
 *  Not: BookingWidget'i mutlak konumla hero'nun altına taşırıyoruz;
 *  alttaki bölüm (örn. Öne Çıkan Araçlar) üst boşluğunu (pt-*) bu
 *  taşmayı telafi edecek şekilde verir.
 * ============================================================
 */

import { useApp } from "@/context/AppContext";
import Container from "@/components/ui/Container";
import BookingWidget from "./BookingWidget";

// Güven istatistikleri — mono font "veri" rolünü temsil eder
const STATS: { value: string; key: "hero.stat1" | "hero.stat2" | "hero.stat3" }[] = [
  { value: "4.9", key: "hero.stat1" },
  { value: "120+", key: "hero.stat2" },
  { value: "7/24", key: "hero.stat3" },
];

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="relative bg-ink pb-44 pt-28 sm:pb-52 sm:pt-32">
      {/* İmza: far parıltısı */}
      <div className="headlight-glow pointer-events-none absolute inset-0" />
      {/* İnce ızgara dokusu */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative">
        <div className="max-w-2xl">
          {/* Konum/teslim rozeti */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-available" />
            {t("hero.badge")}
          </span>

          {/* Başlık */}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {t("hero.title1")}
            <br />
            <span className="text-amber">{t("hero.title2")}</span>
          </h1>

          {/* Alt metin */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {t("hero.sub")}
          </p>

          {/* Güven istatistikleri */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-white/75">
            {STATS.map((s, i) => (
              <div key={s.key} className="flex items-center gap-x-7">
                {i > 0 && <div className="hidden h-8 w-px bg-white/15 sm:block" />}
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-white">{s.value}</span>
                  <span className="text-sm">{t(s.key)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/*
        Rezervasyon modülü — hero'nun alt kenarına oturup içeriğe taşar.
        bottom-0 + translate-y-1/2 ile panelin yarısı hero'nun dışına çıkar.
        Alttaki bölüm üst boşluğunu (pt-*) bu taşmayı telafi edecek şekilde verir.
      */}
      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2">
        <Container>
          <div className="mx-auto max-w-5xl">
            <BookingWidget />
          </div>
        </Container>
      </div>
    </section>
  );
}
