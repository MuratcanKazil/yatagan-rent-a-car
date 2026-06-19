/**
 * src/lib/fleet.ts — Filo filtreleme mantığı (saf / UI'dan bağımsız)
 * Tipler ve saf filtreleme fonksiyonları. Hem mock hem DB verisiyle çalışır.
 */

import type { CarDTO } from "@/models/Car";

// CarDTO'dan türetilir → tek kaynak
export type VitesTipi = CarDTO["vites_tipi"];
export type YakitTipi = CarDTO["yakit_tipi"];

export const VITES_SECENEKLERI: VitesTipi[] = ["Manuel", "Otomatik"];
export const YAKIT_SECENEKLERI: YakitTipi[] = ["Benzin", "Dizel", "Hibrit", "Elektrik"];

export interface FleetFilters {
  fiyatMin: number;
  fiyatMax: number;
  vites: VitesTipi[];
  yakit: YakitTipi[];
  lokasyon: string; // "" → tümü, "marmaris" → sadece o lokasyonda müsait
}

export function fiyatAraligi(araclar: CarDTO[]): { min: number; max: number } {
  if (araclar.length === 0) return { min: 0, max: 5000 };
  const fiyatlar = araclar.map((a) => a.gunluk_fiyat);
  const min = Math.floor(Math.min(...fiyatlar) / 50) * 50;
  const max = Math.ceil(Math.max(...fiyatlar) / 50) * 50;
  return { min, max };
}

export function varsayilanFiltreler(araclar: CarDTO[]): FleetFilters {
  const { min, max } = fiyatAraligi(araclar);
  return { fiyatMin: min, fiyatMax: max, vites: [], yakit: [], lokasyon: "" };
}

export function araclariFiltrele(araclar: CarDTO[], f: FleetFilters): CarDTO[] {
  return araclar.filter((a) => {
    const fiyatUygun = a.gunluk_fiyat >= f.fiyatMin && a.gunluk_fiyat <= f.fiyatMax;
    const vitesUygun = f.vites.length === 0 || f.vites.includes(a.vites_tipi);
    const yakitUygun = f.yakit.length === 0 || f.yakit.includes(a.yakit_tipi);
    const lokasyonUygun =
      f.lokasyon === "" || (a.lokasyonlar ?? []).includes(f.lokasyon);
    return fiyatUygun && vitesUygun && yakitUygun && lokasyonUygun;
  });
}
