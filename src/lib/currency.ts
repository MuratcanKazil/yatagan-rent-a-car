/**
 * ============================================================
 *  lib/currency.ts — Para birimi mantığı
 *  Tüm fiyatlar veride TRY cinsinden tutulur; burada
 *  seçili para birimine çevrilip biçimlendirilir.
 *  Üretimde: `rates` değerlerini bir döviz API'sinden (örn.
 *  TCMB / exchangerate API) çekip cache'lemeni öneririm.
 * ============================================================
 */

import type { Lang } from "./i18n";

export type Currency = "TRY" | "EUR" | "USD";

export const rates: Record<Currency, number> = { TRY: 1, EUR: 0.028, USD: 0.031 };
export const symbol: Record<Currency, string> = { TRY: "₺", EUR: "€", USD: "$" };

/** TRY cinsinden değeri, seçili para birimi + dile göre biçimlendirir */
export function formatPrice(amountTRY: number, currency: Currency, lang: Lang): string {
  const value = Math.round(amountTRY * rates[currency]);
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  return symbol[currency] + value.toLocaleString(locale);
}
