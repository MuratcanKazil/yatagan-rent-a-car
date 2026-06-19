"use client";

/**
 * ============================================================
 *  src/components/fleet/CarList.tsx
 *  Sunumsal liste: filtrelenmiş araçları grid ile gösterir,
 *  sonuç sayısını ve boş durumu yönetir. State tutmaz.
 * ============================================================ */

import FleetCarCard from "./FleetCarCard";
import type { CarDTO } from "@/models/Car";

interface Props {
  araclar: CarDTO[];
  toplam: number;
  onClear: () => void;
}

export default function CarList({ araclar, toplam, onClear }: Props) {
  return (
    <div>
      {/* Sonuç sayısı */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          <span className="font-bold text-ink">{araclar.length}</span> / {toplam} araç gösteriliyor
        </p>
      </div>

      {/* Boş durum */}
      {araclar.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-black/15 bg-white p-12 text-center">
          <h3 className="font-display text-lg font-bold text-ink">Sonuç bulunamadı</h3>
          <p className="mt-1 text-sm text-muted">
            Seçtiğin filtrelere uygun araç yok. Filtreleri gevşetmeyi dene.
          </p>
          <button
            onClick={onClear}
            className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-amber hover:text-ink"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {araclar.map((arac) => (
            <FleetCarCard key={arac.id} arac={arac} />
          ))}
        </div>
      )}
    </div>
  );
}
