/**
 * ============================================================
 *  src/app/api/cars/[id]/route.ts — Tekil araç ucu
 *  ------------------------------------------------------------
 *    PUT    /api/cars/:id  → verilen id'ye sahip aracı günceller
 *    DELETE /api/cars/:id  → verilen id'ye sahip aracı siler
 *
 *  ÖNEMLİ (Next.js 16): Dinamik segment parametreleri artık bir
 *  Promise'tir. Bu yüzden `params`'ı `await` etmek gerekir:
 *      const { id } = await params;
 * ============================================================ */

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbBaglan } from "@/lib/db";
import { Car } from "@/models/Car";
import { LOKASYON_SLUGLARI } from "@/lib/locations";

export const dynamic = "force-dynamic";

/* --------------------- PUT: tek araç güncelle --------------------- */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Geçersiz araç kimliği." },
        { status: 400 }
      );
    }

    const body = await request.json();

    await dbBaglan();

    // Gelen lokasyonları yalnızca tanımlı slug'larla sınırla (güvenlik)
    const gelenLokasyonlar: string[] = Array.isArray(body.lokasyonlar)
      ? body.lokasyonlar.filter((l: unknown): l is string =>
          typeof l === "string" && LOKASYON_SLUGLARI.includes(l)
        )
      : [];

    // Sadece izin verilen alanları güncelle (güvenli güncelleme)
    const guncellenmis = await Car.findByIdAndUpdate(
      id,
      {
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
      },
      // new: güncellenmiş belgeyi dön; runValidators: şema kurallarını uygula
      { new: true, runValidators: true }
    );

    if (!guncellenmis) {
      return NextResponse.json({ error: "Araç bulunamadı." }, { status: 404 });
    }

    return NextResponse.json(guncellenmis, { status: 200 });
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

    console.error("[PUT /api/cars/:id] hata:", err);
    return NextResponse.json(
      { error: "Araç güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

/* --------------------- DELETE: tek araç sil --------------------- */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Geçersiz ObjectId ise boşuna DB'ye gitme
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Geçersiz araç kimliği." },
        { status: 400 }
      );
    }

    await dbBaglan();

    const silinen = await Car.findByIdAndDelete(id);

    if (!silinen) {
      return NextResponse.json(
        { error: "Araç bulunamadı." },
        { status: 404 }
      );
    }

    // Silinen aracın id'sini geri dön (frontend listeden çıkarmak için)
    return NextResponse.json({ id, deleted: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/cars/:id] hata:", err);
    return NextResponse.json(
      { error: "Araç silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
