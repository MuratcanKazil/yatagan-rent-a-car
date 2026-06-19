/**
 * ============================================================
 *  lib/site.ts — Site geneli marka ve SEO sabitleri (tek kaynak)
 *  ------------------------------------------------------------
 *  Marka adı, domain, sosyal vb. burada. Değiştirmen gereken
 *  tek yer burası; başlıklar, metadata, JSON-LD hepsi buradan
 *  beslenir.
 *
 *  ⚠️ SITE_URL: Yayına alınca gerçek domaininle değiştir
 *  (örn. https://hakantopcurentacar.com). Canonical URL'ler,
 *  sitemap ve Open Graph bunu kullanır.
 * ============================================================
 */

export const MARKA = "Hakan Topçu Rent a Car";
export const MARKA_KISA = "Hakan Topçu";

// Yayına alınca burayı kendi domaininle güncelle (sonunda / olmadan)
export const SITE_URL = "https://hakantopcurentacar.com";

// İşletmenin ana bölgesi (genel SEO metni için)
export const ANA_BOLGE = "Muğla";

export const SITE_ACIKLAMA =
  "Muğla, Yatağan, Milas, Akyaka ve Marmaris'te uygun fiyatlı araç kiralama. Şeffaf fiyat, depozitosuz seçenekler ve 7/24 yol yardımı.";
