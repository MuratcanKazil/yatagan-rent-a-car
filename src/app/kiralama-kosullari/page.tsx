/**
 * src/app/kiralama-kosullari/page.tsx — Kiralama Koşulları (iskelet)
 * Madde metinleri Hakan abiyle doldurulacak; yapı hazır.
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { CarIcon } from "@/components/ui/icons";
import { MARKA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Kiralama Koşulları — ${MARKA}`,
  description:
    "Araç kiralama şartları, gerekli belgeler, yaş ve ehliyet koşulları, depozito ve iptal politikası.",
  alternates: { canonical: "/kiralama-kosullari" },
};

// Yer tutucu başlıklar — içerik sonra doldurulacak
const BOLUMLER: { baslik: string }[] = [
  { baslik: "Gerekli Belgeler" },
  { baslik: "Yaş ve Ehliyet Koşulları" },
  { baslik: "Depozito ve Ödeme" },
  { baslik: "Sigorta ve Teminat" },
  { baslik: "Yakıt Politikası" },
  { baslik: "İptal ve İade" },
  { baslik: "Teslim ve İade Şartları" },
];

export default function KiralamaKosullariPage() {
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
                Kiralama Koşulları
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Araç kiralama sürecimize dair tüm şartlar ve gerekli bilgiler.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="space-y-6">
            {BOLUMLER.map((b, i) => (
              <div
                key={i}
                className="rounded-xl2 border border-black/5 bg-white p-6 shadow-card"
              >
                <h2 className="font-display text-lg font-bold text-ink">
                  {i + 1}. {b.baslik}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Bu bölümün içeriği yakında eklenecektir.
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Not: Koşul metinleri hazırlanmaktadır; güncel şartlar için bizimle
            iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
