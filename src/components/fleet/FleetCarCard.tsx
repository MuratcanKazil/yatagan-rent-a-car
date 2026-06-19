"use client";

/**
 * ============================================================
 *  src/components/fleet/FleetCarCard.tsx
 *  Filo sayfası için detaylı araç kartı. Ana sayfadaki tasarım
 *  diliyle tutarlı, ama daha fazla bilgi: klima, bagaj, yolcu,
 *  min. kiralama yaşı, vites, yakıt — şık ikonlarla.
 * ============================================================ */

import { useCallback, useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import {
  CarIcon,
  PassengerIcon,
  LuggageIcon,
  GearIcon,
  FuelIcon,
  PinIcon,
} from "@/components/ui/icons";
import CarImage from "@/components/ui/CarImage";
import ReservationModal from "@/components/sections/ReservationModal";
import { LOKASYONLAR } from "@/lib/locations";
import type { CarDTO } from "@/models/Car";

/** slug listesini okunaklı lokasyon adlarına çevirir */
function lokasyonAdlari(sluglar: string[]): string {
  return sluglar
    .map((s) => LOKASYONLAR.find((l) => l.slug === s)?.ad ?? s)
    .join(", ");
}

/** YYYY-MM-DD biçimi (varsayılan tarih aralığı için) */
function toInputDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function FleetCarCard({ arac }: { arac: CarDTO }) {
  const { lang, currency } = useApp();
  const [modalAcik, setModalAcik] = useState(false);

  // Varsayılan: bugün → +3 gün. (İleride takvimden seçilen aralık prop/state
  // olarak buraya bağlanabilir; modal proplardan beslenir.)
  const baslangicTarihi = useMemo(() => toInputDate(new Date()), []);
  const bitisTarihi = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return toInputDate(d);
  }, []);

  const handleCloseModal = useCallback(() => setModalAcik(false), []);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-float">
      {/* Görsel (yoksa degrade yer tutucu) */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-surface to-ink">
        <div className="headlight-glow absolute inset-0 opacity-60" />
        <div className="absolute inset-0 grid place-items-center text-white/25">
          <CarIcon className="h-20 w-20" strokeWidth={1.2} />
        </div>
        <CarImage
          src={arac.resim_url}
          alt={`${arac.marka} ${arac.model}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink">
          {arac.yil}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold text-available backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-available" />
          Müsait
        </span>
      </div>

      {/* Gövde */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          {arac.marka} {arac.model}
        </h3>
        <p className="font-mono text-xs text-muted">
          {arac.vites_tipi} · {arac.yakit_tipi}
        </p>

        {/* Detaylı spec ızgarası */}
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-black/5 pt-4">
          <Spec icon={<PassengerIcon className="h-4 w-4" />} label={`${arac.yolcu_kapasitesi} Yolcu`} />
          <Spec icon={<LuggageIcon className="h-4 w-4" />} label={`${arac.bagaj_hacmi} Bagaj`} />
          <Spec icon={<GearIcon className="h-4 w-4" />} label={arac.vites_tipi} />
          <Spec icon={<FuelIcon className="h-4 w-4" />} label={arac.yakit_tipi} />
          <Spec icon={<SnowflakeIcon className="h-4 w-4" />} label={arac.klima ? "Klima" : "Klima yok"} />
          <Spec icon={<AgeIcon className="h-4 w-4" />} label={`${arac.min_kiralama_yasi}+ yaş`} />
        </div>

        {/* Müsait lokasyonlar */}
        {arac.lokasyonlar && arac.lokasyonlar.length > 0 && (
          <div className="mt-3 flex items-start gap-1.5 text-xs text-muted">
            <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
            <span className="font-semibold text-ink/70">
              {lokasyonAdlari(arac.lokasyonlar)}
            </span>
          </div>
        )}

        {/* Fiyat + CTA */}
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <span className="font-display text-2xl font-bold text-ink">
              {formatPrice(arac.gunluk_fiyat, currency, lang)}
            </span>
            <span className="text-sm text-muted"> / gün</span>
          </div>
          <button
            onClick={() => setModalAcik(true)}
            className="rounded-lg bg-amber px-4 py-2.5 text-sm font-bold text-ink shadow-card transition hover:bg-amber-deep"
          >
            Rezervasyon Yap
          </button>
        </div>
      </div>

      <ReservationModal
        open={modalAcik}
        onClose={handleCloseModal}
        arac={{ marka: arac.marka, model: arac.model, yil: arac.yil }}
        baslangicTarihi={baslangicTarihi}
        bitisTarihi={bitisTarihi}
      />
    </article>
  );
}

/* ---- Spec satırı ---- */
function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted">
      {icon}
      <span className="font-mono text-[13px] font-bold text-ink/80">{label}</span>
    </div>
  );
}

/* ---- Bu karta özel ikonlar ---- */
type IconProps = React.SVGProps<SVGSVGElement>;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function SnowflakeIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 5l-2.5 2M12 5l2.5 2M12 19l-2.5-2M12 19l2.5-2M5 12l2-2.5M5 12l2 2.5M19 12l-2-2.5M19 12l-2 2.5" />
    </svg>
  );
}
function AgeIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.2" />
      <path d="M14 10h4M14 14h4" />
    </svg>
  );
}
