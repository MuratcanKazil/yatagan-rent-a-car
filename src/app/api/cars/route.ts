/**
 * ============================================================
 *  src/app/api/cars/route.ts — Araç koleksiyonu uçları
 *  ------------------------------------------------------------
 *    GET  /api/cars   → tüm araçları döner (en yeni en üstte)
 *    POST /api/cars   → yeni araç ekler, eklenen aracı geri döner
 *
 *  Not: Route Handler'lar varsayılan olarak cache'lenmez, ama
 *  garanti olsun diye dynamic'i zorunlu kılıyoruz (her istekte
 *  taze veri). Tek bir araç silme işlemi için bkz. cars/[id]/route.ts
 * ============================================================ */

import { NextResponse } from "next/server";
import { dbBaglan } from "@/lib/db";
import { Car } from "@/models/Car";
import { LOKASYON_SLUGLARI } from "@/lib/locations";

// Her istekte güncel DB verisi gelsin (statik üretim yapılmasın)
export const dynamic = "force-dynamic";

/* ----------------------- GET: listele ----------------------- */
export async function GET() {
  try {
    await dbBaglan();
    // En son eklenen en üstte; toJSON ile _id → id dönüşür
    const araclar = await Car.find().sort({ createdAt: -1 });
    return NextResponse.json(araclar, { status: 200 });
  } catch (err) {
    console.error("[GET /api/cars] hata:", err);
    return NextResponse.json(
      { error: "Araçlar getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

/* ----------------------- POST: ekle ------------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    await dbBaglan();

    // Gelen lokasyonları yalnızca tanımlı slug'larla sınırla (güvenlik)
    const gelenLokasyonlar: string[] = Array.isArray(body.lokasyonlar)
      ? body.lokasyonlar.filter((l: unknown): l is string =>
          typeof l === "string" && LOKASYON_SLUGLARI.includes(l)
        )
      : [];

    // Sadece izin verilen alanları al (güvenli oluşturma)
    const yeniArac = await Car.create({
      marka: body.marka,
      model: body.model,
      yil: body.yil,
      vites_tipi: body.vites_tipi,
      yakit_tipi: body.yakit_tipi,
      yolcu_kapasitesi: body.yolcu_kapasitesi,
      bagaj_hacmi: body.bagaj_hacmi,
      klima: body.klima,
      min_kiralama_yasi: body.min_kiralama_yasi,
      gunluk_fiyat: body.gunluk_fiyat,
      lokasyonlar: gelenLokasyonlar,
      resim_url: body.resim_url,
    });

    return NextResponse.json(yeniArac, { status: 201 });
  } catch (err: unknown) {
    // Mongoose doğrulama hatası → 400 (kullanıcıya anlamlı mesaj)
    if (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name?: string }).name === "ValidationError"
    ) {
      const mesaj =
        (err as { message?: string }).message ?? "Geçersiz araç verisi.";
      return NextResponse.json({ error: mesaj }, { status: 400 });
    }

    console.error("[POST /api/cars] hata:", err);
    return NextResponse.json(
      { error: "Araç eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
