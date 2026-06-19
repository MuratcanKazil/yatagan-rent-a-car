/**
 * src/app/page.tsx — Ana sayfa (Server Component)
 * DB'den ilk 4 aracı çekip FeaturedCars'a prop olarak geçer.
 */

import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import { onecikaranAraclar } from "@/lib/cars";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const araclar = await onecikaranAraclar(4);

  return (
    <main>
      <Header />
      <Hero />
      <FeaturedCars araclar={araclar} />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
