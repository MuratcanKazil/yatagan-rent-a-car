/**
 * src/app/araclar/page.tsx — Araçlarımız sayfası (Server Component)
 * Tüm araçları DB'den çeker, client FleetExplorer'a prop geçer.
 */

import type { Metadata } from "next";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import FleetExplorer from "@/components/fleet/FleetExplorer";
import { tumAraclar } from "@/lib/cars";
<<<<<<< HEAD
import { LOKASYON_SLUGLARI } from "@/lib/locations";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

// DB bağlantısı gerektirdiği için build anında değil, her istekte render edilir
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Araçlarımız — Hakan Topçu Rent a Car",
=======
  title: "Araçlarımız — Auriga Rent a Car",
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  description:
    "Ekonomiden lükse geniş filomuzu keşfedin. Vites, yakıt ve fiyata göre filtreleyin, dakikalar içinde rezervasyon yapın.",
};

<<<<<<< HEAD
export default async function AraclarPage({
  searchParams,
}: {
  searchParams: Promise<{ lokasyon?: string }>;
}) {
  const araclar = await tumAraclar();
  const { lokasyon } = await searchParams;
  // Query'den gelen lokasyon geçerliyse filtreyi onunla başlat
  const baslangicLokasyon =
    lokasyon && LOKASYON_SLUGLARI.includes(lokasyon) ? lokasyon : "";
=======
export default async function AraclarPage() {
  const araclar = await tumAraclar();
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

  return (
    <main>
      <Header />

      <section className="relative bg-ink pb-12 pt-32 sm:pt-36">
        <div className="headlight-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <nav className="text-xs font-semibold text-white/50">
<<<<<<< HEAD
            <Link href="/" className="transition hover:text-white">Ana Sayfa</Link>
=======
            <a href="/" className="transition hover:text-white">Ana Sayfa</a>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            <span className="px-1.5">/</span>
            <span className="text-amber">Araçlarımız</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Araçlarımız
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            İhtiyacına uygun aracı soldaki filtrelerle daralt; liste anında güncellensin.
          </p>
        </div>
      </section>

<<<<<<< HEAD
      <FleetExplorer araclar={araclar} baslangicLokasyon={baslangicLokasyon} />
=======
      <FleetExplorer araclar={araclar} />
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

      <Footer />
    </main>
  );
}
