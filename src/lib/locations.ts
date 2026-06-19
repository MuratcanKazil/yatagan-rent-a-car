/**
 * ============================================================
 *  lib/locations.ts — Hizmet verilen lokasyonlar (tek kaynak)
 *  ------------------------------------------------------------
 *  Yeni bir şube/lokasyon açılınca SADECE buraya ekle:
 *  - Admin panelindeki lokasyon seçenekleri,
 *  - Frontend filtreleri,
 *  - SEO lokasyon sayfaları (/marmaris-rent-a-car vb.),
 *  - sitemap
 *  hepsi bu listeden otomatik beslenir.
 *
 *  slug  : URL'de ve aramada kullanılan anahtar (örn. /marmaris-rent-a-car)
 *  ad    : Ekranda gösterilen okunaklı isim
 *  aktif : Şu an gerçekten araç teslim ediliyor mu (false → "yakında")
 * ============================================================
 */

export interface Lokasyon {
  slug: string; // "marmaris"
  ad: string; // "Marmaris"
  aktif: boolean;
  // SEO sayfası için kısa tanıtım (lokasyona özel metin)
  aciklama: string;
}

export const LOKASYONLAR: Lokasyon[] = [
  {
    slug: "mugla",
    ad: "Muğla Merkez",
    aktif: true,
    aciklama:
      "Muğla şehir merkezinde uygun fiyatlı araç kiralama. Şehir içi ve çevre ilçelere ekonomik ulaşım için geniş filo.",
  },
  {
    slug: "yatagan",
    ad: "Yatağan",
    aktif: true,
    aciklama:
      "Yatağan ve çevresinde güvenli, bakımlı araçlarla kiralama hizmeti. Esnek teslim seçenekleri.",
  },
  {
    slug: "milas",
    ad: "Milas",
    aktif: true,
    aciklama:
      "Milas ve Bodrum-Milas Havalimanı çevresinde araç kiralama. Havalimanı teslim ve karşılama hizmeti.",
  },
  {
    slug: "akyaka",
    ad: "Akyaka",
    aktif: true,
    aciklama:
      "Akyaka'da tatilinizi konforlu hale getirecek araçlar. Gökova ve çevresini keşfetmek için ideal.",
  },
  {
    slug: "marmaris",
    ad: "Marmaris",
    aktif: true,
    aciklama:
      "Marmaris'te uygun fiyatlı araç kiralama. Otel ve havalimanı teslimatı, depozitosuz seçenekler ve 7/24 yol yardımı.",
  },
];

/** Sadece aktif lokasyonlar */
export function aktifLokasyonlar(): Lokasyon[] {
  return LOKASYONLAR.filter((l) => l.aktif);
}

/** slug → Lokasyon (bulunamazsa undefined) */
export function lokasyonBul(slug: string): Lokasyon | undefined {
  return LOKASYONLAR.find((l) => l.slug === slug);
}

/** Geçerli lokasyon slug'ları (doğrulama için) */
export const LOKASYON_SLUGLARI: string[] = LOKASYONLAR.map((l) => l.slug);
