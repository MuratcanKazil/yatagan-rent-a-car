/**
 * src/app/sitemap.ts — Otomatik sitemap
 * Google'a tüm önemli URL'leri bildirir. Lokasyon sayfaları
 * LOKASYONLAR listesinden otomatik üretilir.
 */

import type { MetadataRoute } from "next";
import { LOKASYONLAR } from "@/lib/locations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const bugun = new Date();

  // Sabit sayfalar
  const sabit: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: bugun, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/araclar`, lastModified: bugun, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/transfer`, lastModified: bugun, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: bugun, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/sss`, lastModified: bugun, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${SITE_URL}/kiralama-kosullari`,
      lastModified: bugun,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Lokasyon SEO sayfaları (yüksek öncelik — asıl hedef)
  const lokasyonlar: MetadataRoute.Sitemap = LOKASYONLAR.filter((l) => l.aktif).map((l) => ({
    url: `${SITE_URL}/${l.slug}-rent-a-car`,
    lastModified: bugun,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...sabit, ...lokasyonlar];
}
