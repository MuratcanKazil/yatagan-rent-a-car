/**
 * ============================================================
 *  src/components/WhyChooseUs.tsx
 *  Üstte ikonlu 4 özellik (Neden Biz), altta koyu bir panelde
 *  5 yıldızlı 2 müşteri yorumu (Google yorumu konsepti).
 *  Server component — interaktif değil, statik içerik.
 * ============================================================ */

// Özellik verisi — eklemek/çıkarmak kolay olsun diye dizide
const ozellikler = [
  {
    icon: PlaneIcon,
    baslik: "Havalimanı Teslimatı",
    metin: "Aracınızı İzmir, Antalya ve İstanbul havalimanlarında, iniş saatinize göre teslim alın.",
  },
  {
    icon: HeadsetIcon,
    baslik: "7/24 Destek",
    metin: "Yol yardımı ve müşteri hizmetleri günün her saati yanınızda; tek aramayla çözüm.",
  },
  {
    icon: ShieldIcon,
    baslik: "Gizli Ücret Yok",
    metin: "Gördüğünüz fiyat, ödeyeceğiniz fiyat. Sürpriz kalemler ya da gizli masraflar yok.",
  },
  {
    icon: CarFleetIcon,
    baslik: "Geniş ve Yeni Filo",
    metin: "Düzenli bakımlı, son model araçlardan ekonomiden lükse her ihtiyaca uygun seçim.",
  },
];

// Yorum verisi
const yorumlar = [
  {
    isim: "Mehmet K.",
    bas_harf: "M",
    metin: "Havalimanında bizi beklediler, araç tertemizdi. Fiyatta hiçbir sürpriz çıkmadı. Kesinlikle tekrar tercih edeceğim.",
  },
  {
    isim: "Selin A.",
    bas_harf: "S",
    metin: "Rezervasyon çok kolaydı, teslimat dakikti. Destek ekibi gece geç saatte bile hızlı dönüş yaptı. Teşekkürler!",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Başlık */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">
            Neden Hakan Topçu Rent a Car?
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Kiralamayı kolay ve şeffaf hale getiriyoruz
          </h2>
        </div>

        {/* Özellikler */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ozellikler.map((o) => (
            <div
              key={o.baslik}
              className="rounded-xl2 border border-black/5 bg-mist p-6 transition hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-amber">
                <o.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{o.baslik}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.metin}</p>
            </div>
          ))}
        </div>

        {/* Yorumlar — koyu panel */}
        <div className="mt-12 rounded-xl2 bg-ink p-8 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Müşterilerimiz ne diyor?
            </h3>
            <div className="flex items-center gap-2 text-white/70">
              <Stars />
              <span className="font-mono text-sm font-bold text-white">4.9</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {yorumlar.map((y) => (
              <figure
                key={y.isim}
                className="rounded-xl border border-white/10 bg-surface p-6"
              >
                <Stars />
                <blockquote className="mt-3 text-sm leading-relaxed text-white/80">
                  “{y.metin}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-amber font-display text-sm font-bold text-ink">
                    {y.bas_harf}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">{y.isim}</span>
                    <span className="block text-xs text-white/50">Google üzerinden</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- 5 yıldız ---- */
function Stars() {
  return (
    <div className="flex gap-0.5 text-amber">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ============================================================
   Bölüme özel inline ikonlar (icons.tsx'i kalabalıklaştırmamak için)
   ============================================================ */
type IconProps = React.SVGProps<SVGSVGElement>;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function PlaneIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M10.18 9 2 12.5l2.5 1.5M14 13l-3.5 6-1.5-2.5M21.5 4.5c-.8-.8-3-.3-5 1.2L4.5 14.5l3 1 2 4 1 1 4-12c1.5-2 2-4.2 1.2-5z" />
    </svg>
  );
}
function HeadsetIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM18 16v1a4 4 0 0 1-4 4h-2" />
    </svg>
  );
}
function ShieldIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4" />
    </svg>
  );
}
function CarFleetIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11M5 11h14M5 11v5m14-5v5M7 16h.01M17 16h.01" />
    </svg>
  );
}
