/**
 * src/app/lokasyonlar/[slug]/page.tsx — Bölgesel SEO sayfaları
 *
 * Örnekler:
 *   /lokasyonlar/milas-rent-a-car
 *   /lokasyonlar/marmaris-rent-a-car
 *   /lokasyonlar/akyaka-rent-a-car
 *
 * generateStaticParams → bilinen slug'lar build anında pre-render edilir.
 * Bilinmeyenler runtime'da oluşturulur (dynamicParams = true).
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { tumAraclar } from "@/lib/cars";
import FleetExplorer from "@/components/fleet/FleetExplorer";
import { CarIcon } from "@/components/ui/icons";

/* ---- Slug → okunabilir şehir adı ---- */
function slugTanBolge(slug: string): string {
  // "milas-rent-a-car" → "Milas"
  // "bodrum-havaalani-rent-a-car" → "Bodrum Havaalanı"
  return slug
    .replace(/-rent-a-car$/, "")        // sonundaki "-rent-a-car" kaldır
    .replace(/-/g, " ")                  // kalan tire → boşluk
    .replace(/\b\w/g, (c) => c.toUpperCase()) // her kelimenin baş harfi büyük
    .replace(/\bI\b/g, "İ")              // Türkçe "i" → "İ"
    .replace(/\bi\b/g, "i");
}

/* ---- Statik parametreler (pre-render edilecek slug'lar) ---- */
export function generateStaticParams() {
  return LOKASYONLAR.map((slug) => ({ slug }));
}

export const dynamicParams = true; // bilinmeyen slug'lar runtime'da oluşturulsun
export const dynamic = "force-dynamic"; // DB bağlantısı — her istekte render

/* ---- Dinamik metadata ---- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bolge = slugTanBolge(slug);
  return {
    title: `${bolge} Rent a Car — Auriga`,
    description: `${bolge} bölgesinde uygun fiyatlı araç kiralama. Otomatik, manuel, dizel, hibrit seçenekler. 7/24 yol yardımı.`,
    alternates: {
      canonical: `/lokasyonlar/${slug}`,
    },
  };
}

/* ---- Sayfa ---- */
export default async function LokasyonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bolge = slugTanBolge(slug);
  const araclar = await tumAraclar();

  return (
    <main>
      <Header />

      {/* Hero bandı */}
      <section className="relative bg-ink pb-12 pt-32 sm:pt-36">
        <div className="headlight-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-semibold text-white/50">
            <a href="/" className="transition hover:text-white">Ana Sayfa</a>
            <span className="px-1.5">/</span>
            <a href="/araclar" className="transition hover:text-white">Araçlarımız</a>
            <span className="px-1.5">/</span>
            <span className="text-amber">{bolge}</span>
          </nav>

          {/* Başlık */}
          <div className="mt-3 flex items-start gap-4">
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber text-ink">
              <CarIcon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {bolge} Rent a Car
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {bolge} bölgesinde uygun fiyatlı, bakımlı araçlar sizi bekliyor.
                Filtreleri kullanarak ihtiyacınıza en uygun aracı bulun.
              </p>
            </div>
          </div>

          {/* SEO için lokasyon avantajları — inline metin */}
          <div className="mt-6 flex flex-wrap gap-3">
            {["Ücretsiz Teslimat", "7/24 Yol Yardımı", "Depozitosuz Seçenekler", "Anlık Rezervasyon"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Araç listesi — filtreleme ile birlikte */}
      {araclar.length === 0 ? (
        <section className="bg-mist py-20 text-center">
          <p className="text-sm text-muted">
            Henüz araç eklenmemiş. Admin panelinden araç ekleyin.
          </p>
        </section>
      ) : (
        <FleetExplorer araclar={araclar} />
      )}

      {/* SEO metin bloğu */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            {bolge} Bölgesinde Araç Kiralama
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Auriga olarak {bolge} ve çevresinde güvenli, konforlu araç kiralama hizmeti sunuyoruz.
            Ekonomik sınıftan premium segmente kadar geniş filomuz, her bütçeye ve ihtiyaca uygun
            seçenekler barındırıyor. {bolge} havalimanı transferi, otel teslimatı ve şehir merkezi
            ofisimizden araç teslimi seçeneklerimizle yanınızdayız.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            Tüm araçlarımız düzenli bakım ve detaylı temizlik süreçlerinden geçmektedir.
            7/24 yol yardımı hizmetimiz ve şeffaf fiyatlandırma politikamızla {bolge} seyahatinizi
            konforlu hale getiriyoruz.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---- Pre-render edilecek lokasyonlar ---- */
const LOKASYONLAR = [
  "milas-rent-a-car",
  "marmaris-rent-a-car",
  "akyaka-rent-a-car",
  "bodrum-rent-a-car",
  "fethiye-rent-a-car",
  "mugla-rent-a-car",
  "izmir-rent-a-car",
  "kusadasi-rent-a-car",
  "cesme-rent-a-car",
  "didim-rent-a-car",
];
