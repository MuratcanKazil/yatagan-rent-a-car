/**
 * src/app/transfer/page.tsx — Havalimanı Transfer sayfası (iskelet)
 * İçerik Hakan abiyle sonra doldurulacak; tasarım ve SEO yapısı hazır.
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { CarIcon, PhoneIcon } from "@/components/ui/icons";
import { MARKA } from "@/lib/site";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export const metadata: Metadata = {
  title: `Havalimanı Transfer — ${MARKA}`,
  description:
    "Muğla, Milas-Bodrum ve Dalaman havalimanı transfer hizmeti. Konforlu, güvenli ve zamanında karşılama.",
  alternates: { canonical: "/transfer" },
};

export default function TransferPage() {
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
                Havalimanı Transfer
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Milas-Bodrum ve Dalaman havalimanlarından otelinize, konforlu ve
                güvenli transfer hizmeti. Detaylı bilgi ve fiyat için bizi arayın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik gelecek alanı */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="rounded-xl2 border border-dashed border-black/15 bg-white p-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Transfer hizmetimiz çok yakında detaylanıyor
            </h2>
            <p className="mt-2 text-sm text-muted">
              Bu sayfanın içeriği hazırlanıyor. Şimdilik transfer talepleriniz için
              doğrudan bize ulaşabilirsiniz.
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber px-5 py-3 text-sm font-bold text-ink shadow-card transition hover:bg-amber-deep"
            >
              <PhoneIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
