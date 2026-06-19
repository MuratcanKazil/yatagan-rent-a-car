/**
 * ============================================================
 *  lib/i18n.ts — Çoklu dil sözlüğü ve tipleri
 *  Üretimde: bu sabit sözlük yerine next-intl / next-i18next gibi
 *  bir kütüphane + JSON çeviri dosyaları kullanmanı öneririm.
 *  Yapı aynı kaldığı için geçiş kolay olur.
 * ============================================================
 */

export type Lang = "tr" | "en";

// Tüm çeviri anahtarları (eksik anahtarı TS derleme anında yakalar)
export type TranslationKey =
  | "nav.fleet" | "nav.transfer" | "nav.blog" | "nav.faq" | "nav.terms" | "nav.login"
  | "hero.badge" | "hero.title1" | "hero.title2" | "hero.sub"
  | "hero.stat1" | "hero.stat2" | "hero.stat3"
  | "book.tabRent" | "book.tabTransfer"
  | "book.pickupLoc" | "book.returnLoc" | "book.diffLoc" | "book.sameLoc"
  | "book.pickupDate" | "book.returnDate" | "book.time" | "book.search"
  | "book.driverAge"
  | "cars.eyebrow" | "cars.title" | "cars.viewAll"
  | "card.day" | "card.book" | "card.available"
  | "card.passengers" | "card.luggage";

export const translations: Record<Lang, Record<TranslationKey, string>> = {
  tr: {
    "nav.fleet": "Filo",
    "nav.transfer": "Transfer",
    "nav.blog": "Blog",
    "nav.faq": "SSS",
    "nav.terms": "Kiralama Koşulları",
    "nav.login": "Üye Girişi",

<<<<<<< HEAD
    "hero.badge": "Muğla · Marmaris · Milas · Akyaka — saatler içinde teslim",
=======
    "hero.badge": "İzmir · Antalya · İstanbul — saatler içinde teslim",
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    "hero.title1": "Yola çıkmanın",
    "hero.title2": "en pürüzsüz yolu.",
    "hero.sub":
      "Gizli ücret yok, sürpriz yok. Aracını seç, tarihini gir, dakikalar içinde rezervasyonunu tamamla. Teslimde anahtar seni bekliyor.",
    "hero.stat1": "/5 müşteri puanı",
    "hero.stat2": "araçlık filo",
    "hero.stat3": "yol yardımı",

    "book.tabRent": "Araç Kiralama",
    "book.tabTransfer": "Havalimanı Transfer",
    "book.pickupLoc": "Alış Yeri",
    "book.returnLoc": "Dönüş Yeri",
    "book.diffLoc": "Farklı konum",
    "book.sameLoc": "Alış yeri ile aynı",
    "book.pickupDate": "Alış",
    "book.returnDate": "Dönüş",
    "book.time": "Saat",
    "book.search": "Müsait Araçları Bul",
    "book.driverAge": "Sürücü 25 yaş ve üzeri",

    "cars.eyebrow": "Öne Çıkan Filo",
    "cars.title": "Her yolculuğa uygun bir araç",
    "cars.viewAll": "Tüm filoyu gör",
    "card.day": "/ gün",
    "card.book": "Hemen Kirala",
    "card.available": "Müsait",
    "card.passengers": "Yolcu",
    "card.luggage": "Bagaj",
  },
  en: {
    "nav.fleet": "Fleet",
    "nav.transfer": "Transfer",
    "nav.blog": "Blog",
    "nav.faq": "FAQ",
    "nav.terms": "Rental Terms",
    "nav.login": "Sign in",

<<<<<<< HEAD
    "hero.badge": "Muğla · Marmaris · Milas · Akyaka — delivered within hours",
=======
    "hero.badge": "İzmir · Antalya · İstanbul — delivered within hours",
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    "hero.title1": "The smoothest way",
    "hero.title2": "to hit the road.",
    "hero.sub":
      "No hidden fees, no surprises. Pick your car, set your dates and complete your booking in minutes. The keys are waiting at pickup.",
    "hero.stat1": "/5 customer rating",
    "hero.stat2": "cars in fleet",
    "hero.stat3": "roadside help",

    "book.tabRent": "Car Rental",
    "book.tabTransfer": "Airport Transfer",
    "book.pickupLoc": "Pick-up",
    "book.returnLoc": "Return",
    "book.diffLoc": "Different location",
    "book.sameLoc": "Same as pick-up",
    "book.pickupDate": "Pick-up",
    "book.returnDate": "Return",
    "book.time": "Time",
    "book.search": "Find available cars",
    "book.driverAge": "Driver aged 25 or over",

    "cars.eyebrow": "Featured Fleet",
    "cars.title": "A car for every journey",
    "cars.viewAll": "View full fleet",
    "card.day": "/ day",
    "card.book": "Book now",
    "card.available": "Available",
    "card.passengers": "Seats",
    "card.luggage": "Bags",
  },
};
