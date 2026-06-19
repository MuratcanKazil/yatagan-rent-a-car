/**
 * src/components/FeaturedCars.tsx
 * Öne çıkan araçlar bölümü. Veriyi prop olarak alır (server component'ten gelir).
 * "use client" direktifi kaldırıldı — artık salt sunumsal bir server component.
 * Para birimi/dil: context yerine her kart kendi formatını yönetir.
 */

<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import Container from "@/components/ui/Container";
import {
  CarIcon,
  PassengerIcon,
  LuggageIcon,
  GearIcon,
  FuelIcon,
} from "@/components/ui/icons";
import CarImage from "@/components/ui/CarImage";
import type { CarDTO } from "@/models/Car";

// Para birimi ve dil burada sabit (TRY/tr) — context client gerektirir.
// İleride dil/döviz özelliği gerekirse bu bileşen "use client" alır ve
// useApp() hook'u tekrar eklenir. Şimdilik server-friendly tutalım.
function fiyatTL(n: number): string {
  return "₺" + n.toLocaleString("tr-TR");
}

export default function FeaturedCars({ araclar }: { araclar: CarDTO[] }) {
  return (
    <section className="bg-mist pb-20 pt-44 sm:pt-52">
      <Container>
        {/* Başlık */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">
              Öne Çıkan Filo
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Her yolculuğa uygun bir araç
            </h2>
          </div>
<<<<<<< HEAD
          <Link
=======
          <a
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            href="/araclar"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ink transition hover:text-amber-deep"
          >
            Tüm filoyu gör
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
<<<<<<< HEAD
          </Link>
=======
          </a>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
        </div>

        {araclar.length === 0 ? (
          <p className="mt-10 text-sm text-muted">
            Henüz araç eklenmemiş. Admin panelinden araç ekleyin.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {araclar.map((arac) => (
              <CarCard key={arac.id} arac={arac} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function CarCard({ arac }: { arac: CarDTO }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-float">
      {/* Görsel */}
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
        <p className="font-mono text-xs text-muted">{arac.yakit_tipi}</p>

        <div className="mt-4 grid grid-cols-2 gap-y-2.5 border-t border-black/5 pt-4">
          <Spec icon={<PassengerIcon className="h-4 w-4" />} label={`${arac.yolcu_kapasitesi} Yolcu`} />
          <Spec icon={<LuggageIcon className="h-4 w-4" />} label={`${arac.bagaj_hacmi} Bagaj`} />
          <Spec icon={<GearIcon className="h-4 w-4" />} label={arac.vites_tipi} />
          <Spec icon={<FuelIcon className="h-4 w-4" />} label={arac.yakit_tipi} />
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <span className="font-display text-2xl font-bold text-ink">
              {fiyatTL(arac.gunluk_fiyat)}
            </span>
            <span className="text-sm text-muted"> / gün</span>
          </div>
<<<<<<< HEAD
          <Link
=======
          <a
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
            href="/araclar"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber hover:text-ink"
          >
            Hemen Kirala
<<<<<<< HEAD
          </Link>
=======
          </a>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted">
      {icon}
      <span className="font-mono text-[13px] font-bold text-ink/80">{label}</span>
    </div>
  );
}
