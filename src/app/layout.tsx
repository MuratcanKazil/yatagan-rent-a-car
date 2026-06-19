/**
 * ============================================================
 *  src/app/layout.tsx — Kök layout
 *  - next/font ile 3 fontu yükler ve CSS değişkenlerine bağlar.
 *    Değişken adları (--font-space-grotesk vb.) globals.css'teki
 *    @theme tanımlarıyla eşleşir → font-display/body/mono utility'leri.
 *  - Tüm uygulamayı <AppProvider> ile sarmalar (dil + para birimi).
 * ============================================================
 */

import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Space_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
<<<<<<< HEAD
import { MARKA, SITE_URL, SITE_ACIKLAMA } from "@/lib/site";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import "./globals.css";

// Display rolü — karakterli, ölçülü kullanılır
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

// Gövde metni
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

// Veri rolü — fiyat, km, model yılı (gösterge paneli hissi)
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${MARKA} — Muğla, Marmaris, Milas, Akyaka Araç Kiralama`,
    template: `%s`,
  },
  description: SITE_ACIKLAMA,
  alternates: { canonical: "/" },
  openGraph: {
    title: MARKA,
    description: SITE_ACIKLAMA,
    url: SITE_URL,
    siteName: MARKA,
    locale: "tr_TR",
    type: "website",
  },
=======
  title: "Auriga — Premium Araç Kiralama & Transfer",
  description:
    "İzmir, Antalya ve İstanbul'da saatler içinde teslim. Şeffaf fiyat, depozitosuz seçenekler ve 7/24 yol yardımı.",
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
