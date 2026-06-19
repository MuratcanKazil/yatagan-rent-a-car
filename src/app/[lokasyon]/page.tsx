/**
 * ============================================================
 *  src/app/[lokasyon]/page.tsx — Kök dizin SEO lokasyon sayfaları
 *  ------------------------------------------------------------
 *  URL örnekleri (anahtar kelime URL'de → güçlü SEO):
 *    /marmaris-rent-a-car
 *    /milas-rent-a-car
 *    /mugla-rent-a-car
 *    /akyaka-rent-a-car
 *    /yatagan-rent-a-car
 *
 *  Sadece "{slug}-rent-a-car" biçimindeki ve tanımlı lokasyonlara
 *  ait URL'ler kabul edilir; diğerleri 404 döner (notFound).
 *
 *  Her sayfa:
 *   - O lokasyona göre FİLTRELENMİŞ araç listesi gösterir
 *   - Lokasyona özel başlık, açıklama, canonical ve JSON-LD içerir
 * ============================================================
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { tumAraclar } from "@/lib/cars";
import FleetExplorer from "@/components/fleet/FleetExplorer";
import { CarIcon, PhoneIcon } from "@/components/ui/icons";
import { LOKASYONLAR, lokasyonBul } from "@/lib/locations";
import { MARKA, SITE_URL } from "@/lib/site";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

/** "marmaris-rent-a-car" → "marmaris" (değilse null) */
function slugCozumle(param: string): string | null {
  if (!param.endsWith("-rent-a-car")) return null;
  const slug = param.replace(/-rent-a-car$/, "");
  return lokasyonBul(slug) ? slug : null;
}

/* ---- Pre-render edilecek URL'ler ---- */
export function generateStaticParams() {
  return LOKASYONLAR.map((l) => ({ lokasyon: `${l.slug}-rent-a-car` }));
}

// Tanımlı slug'lar dışındakiler 404
export const dynamicParams = true;
export const dynamic = "force-dynamic"; // DB'den taze veri

/* ---- Dinamik SEO metadata ---- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lokasyon: string }>;
}): Promise<Metadata> {
  const { lokasyon } = await params;
  const slug = slugCozumle(lokasyon);
  if (!slug) return {};

  const lok = lokasyonBul(slug)!;
  const baslik = `${lok.ad} Rent a Car | Araç Kiralama — ${MARKA}`;
  const aciklama = `${lok.ad} rent a car: ${lok.aciklama} Uygun fiyatlı, bakımlı araçlar ve 7/24 yol yardımı.`;

  return {
    title: baslik,
    description: aciklama,
    keywords: [
      `${lok.ad} rent a car`,
      `${lok.ad} araç kiralama`,
      `${lok.ad} oto kiralama`,
      `${lok.ad} araba kiralama`,
    ],
    alternates: {
      canonical: `/${lokasyon}`,
    },
    openGraph: {
      title: baslik,
      description: aciklama,
      url: `${SITE_URL}/${lokasyon}`,
      type: "website",
      locale: "tr_TR",
      siteName: MARKA,
    },
  };
}

/* ---- Sayfa ---- */
export default async function LokasyonRentACarPage({
  params,
}: {
  params: Promise<{ lokasyon: string }>;
}) {
  const { lokasyon } = await params;
  const slug = slugCozumle(lokasyon);
  if (!slug) notFound();

  const lok = lokasyonBul(slug)!;
  const tumu = await tumAraclar();
  // O lokasyonda müsait araç var mı? (yine de tümünü gönderip filtreyi
  // FleetExplorer'da o lokasyona kilitliyoruz)
  const lokasyondakiler = tumu.filter((a) => (a.lokasyonlar ?? []).includes(slug));

  // Arama motoru için yapılandırılmış veri (LocalBusiness + AutoRental)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: `${MARKA} — ${lok.ad}`,
    description: lok.aciklama,
    areaServed: lok.ad,
    url: `${SITE_URL}/${lokasyon}`,
    telephone: PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      addressLocality: lok.ad,
      addressRegion: "Muğla",
      addressCountry: "TR",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero bandı */}
      <section className="relative bg-ink pb-12 pt-32 sm:pt-36">
        <div className="headlight-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-semibold text-white/50">
            <Link href="/" className="transition hover:text-white">
              Ana Sayfa
            </Link>
            <span className="px-1.5">/</span>
            <span className="text-amber">{lok.ad} Rent a Car</span>
          </nav>

          {/* Başlık */}
          <div className="mt-3 flex items-start gap-4">
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber text-ink">
              <CarIcon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {lok.ad} Rent a Car
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {lok.aciklama}
              </p>
            </div>
          </div>

          {/* Avantaj rozetleri + telefon */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {["Ücretsiz Teslimat", "7/24 Yol Yardımı", "Depozitosuz Seçenekler", "Anlık Rezervasyon"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
                >
                  {tag}
                </span>
              )
            )}
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-1.5 text-xs font-bold text-ink transition hover:bg-amber-deep"
            >
              <PhoneIcon className="h-4 w-4" strokeWidth={2.2} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Araç listesi — o lokasyona kilitli filtre ile */}
      {lokasyondakiler.length === 0 ? (
        <section className="bg-mist py-20 text-center">
          <p className="text-sm text-muted">
            {lok.ad} için şu an müsait araç bulunmuyor. Lütfen bizimle iletişime geçin
            ya da{" "}
            <Link href="/araclar" className="font-semibold text-amber-deep hover:underline">
              tüm filoyu görüntüleyin
            </Link>
            .
          </p>
        </section>
      ) : (
        <FleetExplorer araclar={tumu} baslangicLokasyon={slug} />
      )}

      {/* SEO metin bloğu */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            {lok.ad} Bölgesinde Araç Kiralama
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            {MARKA} olarak {lok.ad} ve çevresinde güvenli, konforlu araç kiralama
            hizmeti sunuyoruz. Ekonomik sınıftan üst segmente kadar geniş filomuz,
            her bütçeye ve ihtiyaca uygun seçenekler barındırıyor. {lok.ad} otel
            teslimatı ve şehir merkezi ofisimizden araç teslimi seçeneklerimizle
            yanınızdayız.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            Tüm araçlarımız düzenli bakım ve detaylı temizlik süreçlerinden
            geçmektedir. 7/24 yol yardımı hizmetimiz ve şeffaf fiyatlandırma
            politikamızla {lok.ad} seyahatinizi konforlu hale getiriyoruz. Hemen{" "}
            <a href={`tel:${PHONE_TEL}`} className="font-semibold text-amber-deep hover:underline">
              {PHONE_DISPLAY}
            </a>{" "}
            numarasından bize ulaşın.
          </p>

          {/* Diğer lokasyonlara iç linkler (SEO için) */}
          <div className="mt-8 border-t border-black/5 pt-6">
            <p className="text-sm font-bold text-ink">Diğer Lokasyonlarımız</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LOKASYONLAR.filter((l) => l.slug !== slug && l.aktif).map((l) => (
                <a
                  key={l.slug}
                  href={`/${l.slug}-rent-a-car`}
                  className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-amber hover:text-ink"
                >
                  {l.ad} Rent a Car
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
