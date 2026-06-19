"use client";

/**
 * ============================================================
 *  components/sections/ReservationModal.tsx
 *  Online ödeme YOK — kullanıcı tarih+araç seçip "Rezerve Et"
 *  dediğinde bu modal açılır ve onu telefonla aramaya ya da
 *  WhatsApp'tan yazmaya yönlendirir.
 *
 *  Kullanım:
 *    const [open, setOpen] = useState(false);
 *    <ReservationModal
 *      open={open}
 *      onClose={() => setOpen(false)}
 *      arac={{ marka, model, yil }}
 *      baslangicTarihi="2026-07-01"
 *      bitisTarihi="2026-07-05"
 *    />
 * ============================================================
 */

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PhoneIcon, WhatsAppIcon, CloseIcon } from "@/components/ui/icons";
import { PHONE_DISPLAY, PHONE_TEL, PHONE_WHATSAPP } from "@/lib/contact";

export interface ReservationModalCar {
  marka: string;
  model: string;
  yil: number;
}

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  arac: ReservationModalCar;
  /** YYYY-MM-DD ya da ekrana zaten okunaklı biçimde gelen tarih string'i */
  baslangicTarihi: string;
  bitisTarihi: string;
}

/** "2026-07-01" -> "01.07.2026". Zaten farklı biçimdeyse olduğu gibi döner. */
function formatTarih(deger: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(deger);
  if (!iso) return deger;
  const [, yil, ay, gun] = iso;
  return `${gun}.${ay}.${yil}`;
}

export default function ReservationModal({
  open,
  onClose,
  arac,
  baslangicTarihi,
  bitisTarihi,
}: ReservationModalProps) {
  // onClose her render'da yeni referans olabilir (inline fonksiyon olarak
  // geçirilebiliyor) — ref'e alıp asıl efekti SADECE `open` değişince
  // çalıştırıyoruz. Aksi halde efekt gereksiz yere tekrar tetiklenip
  // body.style.overflow'u ileri-geri değiştirebilir, bu da scrollbar'ın
  // görünüp kaybolmasına ve modal'ın titreyip kaymış gibi görünmesine
  // sebep olur. Ref'i render sırasında değil, ayrı bir effect'te
  // güncelliyoruz (React'in "render sırasında ref yazma" kuralı gereği).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    // Scrollbar kaybolunca sayfa genişlemesin diye farkı padding ile telafi et
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const baslangic = formatTarih(baslangicTarihi);
  const bitis = formatTarih(bitisTarihi);

  const whatsappMesaji = `${arac.marka} ${arac.model} ${arac.yil} model aracınızı ${baslangic} - ${bitis} tarihleri arasında kiralamak istiyorum, bilgi alabilir miyim?`;
  const whatsappHref = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(whatsappMesaji)}`;
  const telHref = `tel:${PHONE_TEL}`;

  // ÖNEMLİ: createPortal ile document.body'ye taşıyoruz. Modal, çağıran
  // FleetCarCard gibi bir kartın (hover:-translate-y-1 vb. CSS transform
  // içeren) ATASI içinde DOM'da kalsaydı, o transform CSS'te yeni bir
  // "containing block" yaratır ve içindeki position:fixed elemanları artık
  // viewport'a göre değil, o ata elemana göre konumlanır. Kart hover'a
  // girip çıktıkça (fare modal üzerinde gezinirken bile, modal görsel
  // olarak kartın "üstünde" sayıldığından) bu durum modal'ın sürekli yer
  // değiştirip küçülüp büyümesine, yani titremesine sebep oluyordu.
  // Portal, modal'ı bu sorunlu DOM hiyerarşisinden tamamen çıkarır.
  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-pop-in relative w-full max-w-sm rounded-xl2 bg-white p-6 shadow-float sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapat */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted transition hover:bg-mist hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Başlık */}
        <div className="pr-6">
          <h2 id="reservation-modal-title" className="font-display text-xl font-bold text-ink">
            Rezervasyonu Tamamlayın
          </h2>
          <p className="mt-1 text-sm text-muted">
            Sitemizden online ödeme alınmamaktadır. Rezervasyonunuzu onaylamak için
            bizi hemen arayın ya da WhatsApp&apos;tan yazın.
          </p>
        </div>

        {/* Özet kartı */}
        <div className="mt-4 rounded-lg bg-mist px-4 py-3">
          <p className="font-display text-sm font-bold text-ink">
            {arac.marka} {arac.model} <span className="font-normal text-muted">({arac.yil})</span>
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">
            {baslangic} → {bitis}
          </p>
        </div>

        {/* Aksiyonlar */}
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={telHref}
            className="flex items-center justify-center gap-2.5 rounded-lg bg-amber px-5 py-3.5 font-display text-base font-bold text-ink shadow-card transition hover:bg-amber-deep active:scale-[0.98]"
          >
            <PhoneIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            Hemen Ara
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-3.5 font-display text-base font-bold text-white shadow-card transition hover:bg-[#1fb959] active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp&apos;tan Ulaş
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-muted">{PHONE_DISPLAY}</p>
      </div>
    </div>,
    document.body
  );
}
