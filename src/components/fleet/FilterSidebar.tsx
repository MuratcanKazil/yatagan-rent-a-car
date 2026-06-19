"use client";

/**
 * ============================================================
 *  src/components/fleet/FilterSidebar.tsx
 *  Sunumsal (kontrollü) filtre paneli. Kendi state'i YOKTUR;
 *  mevcut filtreleri prop olarak alır, değişiklikleri yukarı
 *  (FleetExplorer'a) bildirir. Bu, state'in tek yerde kalmasını
 *  ve ileride taşınmasını kolaylaştırır.
 * ============================================================ */

import PriceRange from "./PriceRange";
<<<<<<< HEAD
import { aktifLokasyonlar } from "@/lib/locations";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import {
  VITES_SECENEKLERI,
  YAKIT_SECENEKLERI,
  type FleetFilters,
  type VitesTipi,
  type YakitTipi,
} from "@/lib/fleet";

interface Props {
  filters: FleetFilters;
  fiyatMin: number;
  fiyatMax: number;
  onFiyatChange: (min: number, max: number) => void;
  onVitesToggle: (v: VitesTipi) => void;
  onYakitToggle: (y: YakitTipi) => void;
<<<<<<< HEAD
  onLokasyonChange: (slug: string) => void;
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  onClear: () => void;
}

export default function FilterSidebar({
  filters,
  fiyatMin,
  fiyatMax,
  onFiyatChange,
  onVitesToggle,
  onYakitToggle,
<<<<<<< HEAD
  onLokasyonChange,
  onClear,
}: Props) {
  const lokasyonlar = aktifLokasyonlar();

=======
  onClear,
}: Props) {
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  return (
    <aside className="rounded-xl2 border border-black/5 bg-white p-6 shadow-card lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Filtrele</h2>
        <button
          onClick={onClear}
          className="text-xs font-bold text-amber-deep transition hover:underline"
        >
          Filtreleri Temizle
        </button>
      </div>

<<<<<<< HEAD
      {/* Lokasyon (teslim noktası) */}
      <FilterGroup baslik="Teslim Noktası">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onLokasyonChange("")}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              filters.lokasyon === ""
                ? "bg-ink text-white"
                : "bg-mist text-muted hover:text-ink"
            }`}
          >
            Tümü
          </button>
          {lokasyonlar.map((lok) => (
            <button
              key={lok.slug}
              onClick={() => onLokasyonChange(lok.slug)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                filters.lokasyon === lok.slug
                  ? "bg-amber text-ink"
                  : "bg-mist text-muted hover:text-ink"
              }`}
            >
              {lok.ad}
            </button>
          ))}
        </div>
      </FilterGroup>

=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
      {/* Fiyat aralığı */}
      <FilterGroup baslik="Günlük Fiyat">
        <PriceRange
          min={fiyatMin}
          max={fiyatMax}
          valueMin={filters.fiyatMin}
          valueMax={filters.fiyatMax}
          onChange={onFiyatChange}
        />
      </FilterGroup>

      {/* Vites tipi */}
      <FilterGroup baslik="Vites Tipi">
        <div className="space-y-2.5">
          {VITES_SECENEKLERI.map((v) => (
            <CheckRow
              key={v}
              label={v}
              checked={filters.vites.includes(v)}
              onChange={() => onVitesToggle(v)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Yakıt tipi */}
      <FilterGroup baslik="Yakıt Tipi">
        <div className="space-y-2.5">
          {YAKIT_SECENEKLERI.map((y) => (
            <CheckRow
              key={y}
              label={y}
              checked={filters.yakit.includes(y)}
              onChange={() => onYakitToggle(y)}
            />
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

/* ---- Filtre grubu (başlık + içerik) ---- */
function FilterGroup({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-black/5 pt-5">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">{baslik}</h3>
      {children}
    </div>
  );
}

/* ---- Checkbox satırı ---- */
function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-black/20 accent-amber"
      />
      {label}
    </label>
  );
}
