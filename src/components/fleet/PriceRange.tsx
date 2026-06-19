"use client";

/**
 * ============================================================
 *  src/components/fleet/PriceRange.tsx
 *  Çift kollu (min-max) fiyat aralığı kaydırıcısı. Harici kütüphane
 *  kullanmadan iki üst üste range input + dolu bir bağlantı çubuğu ile.
 *  Değerler TL cinsinden; etiketler seçili para birimiyle gösterilir.
 * ============================================================ */

import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";

interface Props {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step?: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceRange({
  min,
  max,
  valueMin,
  valueMax,
  step = 50,
  onChange,
}: Props) {
  const { lang, currency } = useApp();
  const pct = (v: number) => (max === min ? 0 : ((v - min) / (max - min)) * 100);

  return (
    <div>
      {/* Seçili aralık etiketleri */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-mist px-2 py-1 font-mono text-xs font-bold text-ink">
          {formatPrice(valueMin, currency, lang)}
        </span>
        <span className="rounded-md bg-mist px-2 py-1 font-mono text-xs font-bold text-ink">
          {formatPrice(valueMax, currency, lang)}
        </span>
      </div>

      {/* Kaydırıcı */}
      <div className="relative h-5">
        {/* Boş ray */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/10" />
        {/* Dolu kısım */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-amber"
          style={{ left: `${pct(valueMin)}%`, right: `${100 - pct(valueMax)}%` }}
        />
        {/* Min kol */}
        <input
          type="range"
          aria-label="Minimum fiyat"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChange(Math.min(Number(e.target.value), valueMax - step), valueMax)}
          className="price-range-input"
        />
        {/* Max kol */}
        <input
          type="range"
          aria-label="Maksimum fiyat"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => onChange(valueMin, Math.max(Number(e.target.value), valueMin + step))}
          className="price-range-input"
        />
      </div>

      {/* Range thumb stilleri (Tailwind pseudo-element'leri kolay hedefleyemediği için) */}
      <style>{`
        .price-range-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          background: transparent;
          pointer-events: none;
          -webkit-appearance: none;
          appearance: none;
        }
        .price-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          height: 18px; width: 18px;
          border-radius: 9999px;
          background: #fff;
          border: 2px solid var(--color-amber);
          box-shadow: 0 1px 3px rgba(11,17,32,.25);
          cursor: pointer;
        }
        .price-range-input::-moz-range-thumb {
          pointer-events: auto;
          height: 18px; width: 18px;
          border-radius: 9999px;
          background: #fff;
          border: 2px solid var(--color-amber);
          box-shadow: 0 1px 3px rgba(11,17,32,.25);
          cursor: pointer;
        }
        .price-range-input::-webkit-slider-runnable-track { background: transparent; }
        .price-range-input::-moz-range-track { background: transparent; }
      `}</style>
    </div>
  );
}
