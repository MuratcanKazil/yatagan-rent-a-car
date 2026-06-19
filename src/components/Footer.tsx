/**
 * ============================================================
 *  src/components/Footer.tsx
 *  3 sütunlu footer:
 *    1) Marka + kısa açıklama
 *    2) Hızlı linkler
 *    3) İletişim bilgileri + sosyal medya
 *  Altında telif satırı. Server component (statik).
 * ============================================================ */

import { CarIcon, PinIcon } from "@/components/ui/icons";

const hizliLinkler = [
  { etiket: "Araçlarımız", href: "/araclar" },
  { etiket: "Kiralama Koşulları", href: "/kiralama-kosullari" },
  { etiket: "Transfer", href: "/transfer" },
  { etiket: "İletişim", href: "/iletisim" },
];

const sosyal = [
  { etiket: "Instagram", href: "#", icon: InstagramIcon },
  { etiket: "Facebook", href: "#", icon: FacebookIcon },
  { etiket: "X", href: "#", icon: XIcon },
  { etiket: "WhatsApp", href: "https://wa.me/905555555555", icon: WhatsAppIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* 1) Marka */}
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-ink">
                <CarIcon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">HAKAN TOPÇU</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Yatağan merkezli premium araç kiralama. Şeffaf fiyat, yeni filo ve
              7/24 destek ile yola çıkmanın en pürüzsüz yolu.
            </p>
          </div>

          {/* 2) Hızlı linkler */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Hızlı Linkler
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {hizliLinkler.map((l) => (
                <li key={l.etiket}>
                  <a href={l.href} className="transition hover:text-amber">
                    {l.etiket}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3) İletişim + sosyal */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              İletişim
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+905555555555" className="flex items-center gap-2 transition hover:text-amber">
                  <PhoneIcon className="h-4 w-4 text-amber" />
                  +90 555 555 55 55
                </a>
              </li>
              <li className="flex items-start gap-2">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>Konak Mah. Atatürk Cad. No: 12, Yatağan / Muğla</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {sosyal.map((s) => (
                <a
                  key={s.etiket}
                  href={s.href}
                  aria-label={s.etiket}
                  target="_blank"
                  rel="noopener"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-amber hover:text-ink"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Telif satırı */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Hakan Topçu Rent a Car. Tüm hakları saklıdır.</span>
          <span>Yatağan / Muğla</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Bölüme özel inline ikonlar
   ============================================================ */
type IconProps = React.SVGProps<SVGSVGElement>;

function PhoneIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
function InstagramIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.4.2 15.4 0 14.4 0 12 0 10.5 1.4 10.5 4v2H8v3h2.5v9H14V9z" />
    </svg>
  );
}
function XIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5-6.6L5.6 22H2.5l7.8-8.9L1.7 2h6.9l4.5 6 5.8-6zm-1.2 18h1.9L7.4 4H5.3l12.4 16z" />
    </svg>
  );
}
function WhatsAppIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.717zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.074-.148-.668-1.611-.916-2.206-.241-.579-.486-.501-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
