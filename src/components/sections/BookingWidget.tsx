"use client";

/**
 * ============================================================
 *  components/sections/BookingWidget.tsx
 *  İMZA ÖĞESİ — Hero ile içerik arasına taşan "cam panel".
 *  Araç Kiralama / Transfer sekmeleri, alış-dönüş yeri,
 *  tarih+saat alanları ve "farklı konum" frictionless geçişi.
 *
 *  Tüm form mantığı buraya kapsüllendi (reusable). Konumlar
 *  prop ile dışarıdan verilir → test ve genişletme kolay.
 *
 *  NOT (backend): handleSubmit içinde state'i query param'a
 *  serialize edip router.push("/filo?...") ile filo sayfasına
 *  yönlendir; orada Route Handler (app/api/availability) müsait
 *  araçları döndürür.
 * ============================================================
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PinIcon, SearchIcon } from "@/components/ui/icons";
<<<<<<< HEAD
import { aktifLokasyonlar } from "@/lib/locations";

type Tab = "rent" | "transfer";

// Hizmet verilen lokasyonlar (tek kaynaktan)
const LOKASYONLAR_LISTE = aktifLokasyonlar();
const LOCATIONS = LOKASYONLAR_LISTE.map((l) => l.ad);
=======

type Tab = "rent" | "transfer";

// Üretimde bu liste API/CMS'ten gelir
const LOCATIONS = [
  "İzmir Havalimanı (ADB)",
  "İzmir Şehir Merkezi",
  "Antalya Havalimanı (AYT)",
  "İstanbul (IST)",
];
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf

/** YYYY-MM-DD biçimi (date input için) */
function toInputDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function BookingWidget() {
  const { t } = useApp();
  const router = useRouter();

  // --- Form durumu ---
  const [tab, setTab] = useState<Tab>("rent");
  const [diffLocation, setDiffLocation] = useState(false); // dönüş yeri farklı mı?
  const [pickupLoc, setPickupLoc] = useState(LOCATIONS[0]);
  const [returnLoc, setReturnLoc] = useState(LOCATIONS[0]);

  // Varsayılan tarihler: bugün → +3 gün
  const today = useMemo(() => toInputDate(new Date()), []);
  const inThreeDays = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return toInputDate(d);
  }, []);
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(inThreeDays);
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Arama kriterlerini query param'a serialize et
<<<<<<< HEAD
    // Seçilen alış yerinin slug'ını bul (örn. "Marmaris" → "marmaris")
    const secilenLok = LOKASYONLAR_LISTE.find((l) => l.ad === pickupLoc);

=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    const params = new URLSearchParams({
      type: tab,
      from: pickupLoc,
      to: diffLocation ? returnLoc : pickupLoc,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
<<<<<<< HEAD
    if (secilenLok) params.set("lokasyon", secilenLok.slug);

    router.push(`/araclar?${params.toString()}`);
=======
    router.push(`/filo?${params.toString()}`);
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  }

  // Ortak input sınıfı (DRY)
  const fieldBox =
    "flex items-center gap-2 rounded-lg border border-transparent bg-mist px-3 pb-2.5 transition group-focus-within:border-amber";
  const label =
    "mb-1 block px-3 pt-2 text-[11px] font-bold uppercase tracking-wide text-muted";
  const dateInput =
    "w-full rounded-lg border border-transparent bg-mist px-3 pb-2.5 text-sm font-semibold text-ink outline-none transition focus:border-amber";

  return (
    <div className="rounded-xl2 border border-black/5 bg-white/95 p-2 shadow-float backdrop-blur-xl sm:p-3">
      {/* Hizmet sekmeleri */}
      <div className="flex gap-1 px-1 pt-1">
        {(["rent", "transfer"] as Tab[]).map((tb) => (
          <button
            key={tb}
            type="button"
            onClick={() => setTab(tb)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              tab === tb ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {t(tb === "rent" ? "book.tabRent" : "book.tabTransfer")}
          </button>
        ))}
      </div>

      {/* Arama formu */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 p-1 sm:grid-cols-12">
        {/* Alış yeri */}
        <label className="group sm:col-span-3">
          <span className={label}>{t("book.pickupLoc")}</span>
          <div className={fieldBox}>
            <PinIcon className="h-[18px] w-[18px] text-amber" />
            <select
              value={pickupLoc}
              onChange={(e) => setPickupLoc(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </label>

        {/* Dönüş yeri — frictionless: varsayılan aynı, tıkla & farklılaştır */}
        <label className="group sm:col-span-3">
          <span className="mb-1 flex items-center justify-between px-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-muted">
              {t("book.returnLoc")}
            </span>
            <button
              type="button"
              onClick={() => setDiffLocation((v) => !v)}
              className="text-[11px] font-bold text-amber-deep hover:underline"
            >
              {t("book.diffLoc")}
            </button>
          </span>
          <div className={fieldBox}>
            <PinIcon className={`h-[18px] w-[18px] ${diffLocation ? "text-amber" : "text-muted"}`} />
            <select
              value={diffLocation ? returnLoc : ""}
              onChange={(e) => setReturnLoc(e.target.value)}
              disabled={!diffLocation}
              className="w-full bg-transparent text-sm font-semibold text-ink outline-none disabled:cursor-not-allowed disabled:text-muted"
            >
              {!diffLocation && <option value="">{t("book.sameLoc")}</option>}
              {LOCATIONS.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </label>

        {/* Alış tarihi + saati */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-3">
          <label className="group">
            <span className={label}>{t("book.pickupDate")}</span>
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                // dönüş, alıştan önce olamaz
                if (returnDate < e.target.value) setReturnDate(e.target.value);
              }}
              className={dateInput}
            />
          </label>
          <label className="group">
            <span className={label}>{t("book.time")}</span>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className={dateInput}
            />
          </label>
        </div>

        {/* Dönüş tarihi + saati */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-3">
          <label className="group">
            <span className={label}>{t("book.returnDate")}</span>
            <input
              type="date"
              min={pickupDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={dateInput}
            />
          </label>
          <label className="group">
            <span className={label}>{t("book.time")}</span>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className={dateInput}
            />
          </label>
        </div>

        {/* CTA + güven satırı */}
        <div className="sm:col-span-12">
          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3.5 font-display text-base font-bold text-ink shadow-card transition hover:bg-amber-deep"
          >
            <SearchIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            {t("book.search")}
          </button>
          <p className="mt-2 text-center text-xs text-muted">{t("book.driverAge")}</p>
        </div>
      </form>
    </div>
  );
}
