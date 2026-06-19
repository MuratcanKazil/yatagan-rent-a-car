/**
 * src/app/sss/page.tsx — Sıkça Sorulan Sorular (iskelet)
 * Sorular yer tutucudur; cevapları Hakan abiyle doldurun.
 * FAQ yapısı SEO için değerlidir (ileride FAQ schema eklenebilir).
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { CarIcon } from "@/components/ui/icons";
import { MARKA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Sıkça Sorulan Sorular — ${MARKA}`,
  description:
    "Araç kiralama şartları, ödeme, depozito, yaş sınırı ve teslim hakkında merak edilenler.",
  alternates: { canonical: "/sss" },
};

// Yer tutucu sorular — cevaplar sonra doldurulacak
const SORULAR: { soru: string; cevap: string }[] = [
  {
    soru: "Araç kiralamak için kaç yaşında olmam gerekiyor?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
  {
    soru: "Depozito alınıyor mu?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
  {
    soru: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
  {
    soru: "Aracı farklı bir şehirde teslim edebilir miyim?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
  {
    soru: "Kilometre sınırı var mı?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
  {
    soru: "Sigorta dahil mi?",
    cevap: "Bu sorunun cevabı yakında eklenecektir.",
  },
];

export default function SSSPage() {
  return (
    <main>
      <Header />

      <section className="relative bg-ink pb-16 pt-32 sm:pt-36">
        <div className="headlight-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-start gap-4">
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber text-ink">
              <CarIcon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Sıkça Sorulan Sorular
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Aklınıza takılanlar burada. Cevabını bulamadığınız sorular için
                bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="space-y-3">
            {SORULAR.map((s, i) => (
              <details
                key={i}
                className="group rounded-xl2 border border-black/5 bg-white p-5 shadow-card"
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-bold text-ink">
                  {s.soru}
                  <span className="ml-4 text-amber transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.cevap}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Not: Bu sorular örnek olarak eklenmiştir; cevaplar yakında
            güncellenecektir.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
