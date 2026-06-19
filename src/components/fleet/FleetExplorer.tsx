"use client";

/**
 * ============================================================
 *  src/components/fleet/FleetExplorer.tsx
 *  Filo sayfasının STATE SAHİBİ (tek kaynak). Filtreleri burada
 *  tutar, saf araclariFiltrele() ile listeyi türetir ve sunumsal
 *  FilterSidebar + CarList bileşenlerini besler.
 *
 *  Veri prop olarak gelir → ileride server component'te DB'den
 *  çekip buraya geçebilirsin; bu bileşeni değiştirmen gerekmez.
 * ============================================================ */

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import FilterSidebar from "./FilterSidebar";
import CarList from "./CarList";
import type { CarDTO } from "@/models/Car";
import {
  araclariFiltrele,
  fiyatAraligi,
  varsayilanFiltreler,
  type FleetFilters,
  type VitesTipi,
  type YakitTipi,
} from "@/lib/fleet";

<<<<<<< HEAD
export default function FleetExplorer({
  araclar,
  baslangicLokasyon = "",
}: {
  araclar: CarDTO[];
  baslangicLokasyon?: string;
}) {
=======
export default function FleetExplorer({ araclar }: { araclar: CarDTO[] }) {
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  // Fiyat sınırları veriden türetilir (slider aralığı)
  const { min: fiyatMin, max: fiyatMax } = useMemo(() => fiyatAraligi(araclar), [araclar]);

  // TEK state: tüm filtreler burada
<<<<<<< HEAD
  const [filters, setFilters] = useState<FleetFilters>(() => ({
    ...varsayilanFiltreler(araclar),
    lokasyon: baslangicLokasyon,
  }));
=======
  const [filters, setFilters] = useState<FleetFilters>(() => varsayilanFiltreler(araclar));
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

  // Türetilmiş liste (saf fonksiyon) — filtre değişince yeniden hesaplanır
  const filtrelenmis = useMemo(() => araclariFiltrele(araclar, filters), [araclar, filters]);

  // --- Handler'lar (state'i immutable güncelle) ---
  const setFiyat = (fiyatMin: number, fiyatMax: number) =>
    setFilters((f) => ({ ...f, fiyatMin, fiyatMax }));

  const toggleVites = (v: VitesTipi) =>
    setFilters((f) => ({
      ...f,
      vites: f.vites.includes(v) ? f.vites.filter((x) => x !== v) : [...f.vites, v],
    }));

  const toggleYakit = (y: YakitTipi) =>
    setFilters((f) => ({
      ...f,
      yakit: f.yakit.includes(y) ? f.yakit.filter((x) => x !== y) : [...f.yakit, y],
    }));

<<<<<<< HEAD
  const setLokasyon = (lokasyon: string) =>
    setFilters((f) => ({ ...f, lokasyon }));

  const clear = () =>
    setFilters({ ...varsayilanFiltreler(araclar), lokasyon: baslangicLokasyon });
=======
  const clear = () => setFilters(varsayilanFiltreler(araclar));
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

  return (
    <section className="bg-mist py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sol: filtreler */}
          <FilterSidebar
            filters={filters}
            fiyatMin={fiyatMin}
            fiyatMax={fiyatMax}
            onFiyatChange={setFiyat}
            onVitesToggle={toggleVites}
            onYakitToggle={toggleYakit}
<<<<<<< HEAD
            onLokasyonChange={setLokasyon}
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            onClear={clear}
          />

          {/* Sağ: liste */}
          <CarList araclar={filtrelenmis} toplam={araclar.length} onClear={clear} />
        </div>
      </Container>
    </section>
  );
}
