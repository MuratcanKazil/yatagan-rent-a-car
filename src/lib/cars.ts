/**
 * src/lib/cars.ts — Sunucu tarafı araç okuma yardımcısı
 * SADECE server component / route handler içinde kullanılır.
 */

import { dbBaglan } from "@/lib/db";
import { Car, type CarDTO } from "@/models/Car";

/** Tüm araçları DB'den döner (en yeni en üstte). */
export async function tumAraclar(): Promise<CarDTO[]> {
  await dbBaglan();
  const docs = await Car.find().sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(docs)) as CarDTO[];
}

/** İlk N aracı döner — ana sayfa öne çıkan bölümü için. */
export async function onecikaranAraclar(limit = 4): Promise<CarDTO[]> {
  await dbBaglan();
  const docs = await Car.find().sort({ createdAt: -1 }).limit(limit);
  return JSON.parse(JSON.stringify(docs)) as CarDTO[];
}
