/**
 * src/app/blog/page.tsx — Blog sayfası (iskelet)
 * Yazılar sonra eklenecek; liste yapısı ve SEO hazır.
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { CarIcon } from "@/components/ui/icons";
import { MARKA } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog — ${MARKA}`,
  description:
    "Araç kiralama ipuçları, bölge rehberleri ve seyahat önerileri. Muğla ve çevresinde gezilecek yerler.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
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
                Blog
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Araç kiralama rehberleri, bölge önerileri ve seyahat ipuçları.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="rounded-xl2 border border-dashed border-black/15 bg-white p-10">
            <h2 className="font-display text-xl font-bold text-ink">
              İlk yazılarımız çok yakında
            </h2>
            <p className="mt-2 text-sm text-muted">
              Bölge rehberleri ve kiralama ipuçları içeren içerikler hazırlanıyor.
              Takipte kalın.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
