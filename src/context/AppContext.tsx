"use client";

/**
 * ============================================================
 *  context/AppContext.tsx — Global UI durumu
 *  Dil ve para birimini tüm bileşenlere taşır. Header bunları
 *  değiştirir; Hero, Rezervasyon ve Araç kartları okur.
 *  `t(key)` → çeviri yardımcı fonksiyonu.
 *
 *  Client component'tir (interaktif state). layout.tsx içinde
 *  <AppProvider> ile tüm uygulamayı sarmalıyoruz.
 * ============================================================
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "@/lib/i18n";
import type { Currency } from "@/lib/currency";

interface AppContextValue {
  lang: Lang;
  currency: Currency;
  setLang: (l: Lang) => void;
  setCurrency: (c: Currency) => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");
  const [currency, setCurrency] = useState<Currency>("TRY");

  // t() referansının her render'da değişmemesi için useMemo
  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      currency,
      setLang,
      setCurrency,
      t: (key) => translations[lang][key] ?? key,
    }),
    [lang, currency]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Bileşenlerde dil/para birimine erişmek için hook */
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp, <AppProvider> içinde kullanılmalıdır.");
  return ctx;
}
