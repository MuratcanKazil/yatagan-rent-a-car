"use client";

/**
 * ============================================================
 *  src/components/admin/AdminDashboard.tsx
 *  ------------------------------------------------------------
 *  Yönetim panelinin STATE SAHİBİ (client component).
 *
 *    A) Yeni Araç Ekleme Formu  → POST /api/cars
 *    B) Mevcut Araçlar Listesi  → GET /api/cars, DELETE /api/cars/:id
 *
 *  Anlık güncelleme: Ekleme/silme sonrası sayfayı yenilemeden
 *  React state'i güncelliyoruz (eklenen araç hemen listeye düşer,
 *  silinen anında kalkar).
 *
 *  ÖNEMLİ: Buradan @/models/Car'ı SADECE `import type` ile
 *  kullanıyoruz (sadece tip). Çalışma zamanı sabitlerini
 *  (vites/yakıt seçenekleri) mongoose içermeyen @/lib/fleet'ten
 *  alıyoruz ki mongoose client paketine sızmasın.
 * ============================================================ */

import { useEffect, useState } from "react";
import { VITES_SECENEKLERI, YAKIT_SECENEKLERI } from "@/lib/fleet";
import type { VitesTipi, YakitTipi } from "@/lib/fleet";
<<<<<<< HEAD
import { aktifLokasyonlar } from "@/lib/locations";
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
import type { CarDTO } from "@/models/Car";
import {
  CarIcon,
  PassengerIcon,
  LuggageIcon,
  GearIcon,
  FuelIcon,
} from "@/components/ui/icons";

/* ---- Form durumu: input'lar string tutar, gönderirken sayıya çevrilir ---- */
interface FormState {
  marka: string;
  model: string;
  yil: string;
  vites_tipi: VitesTipi;
  yakit_tipi: YakitTipi;
  yolcu_kapasitesi: string;
  bagaj_hacmi: string;
  min_kiralama_yasi: string;
  klima: boolean;
  gunluk_fiyat: string;
<<<<<<< HEAD
  lokasyonlar: string[];
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  resim_url: string;
}

const BOS_FORM: FormState = {
  marka: "",
  model: "",
  yil: String(new Date().getFullYear()),
  vites_tipi: "Otomatik",
  yakit_tipi: "Benzin",
  yolcu_kapasitesi: "5",
  bagaj_hacmi: "2",
  min_kiralama_yasi: "21",
  klima: true,
  gunluk_fiyat: "",
<<<<<<< HEAD
  lokasyonlar: [],
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  resim_url: "",
};

/* TRY biçimlendirme (panel girişi TL cinsindendir) */
function fiyatTL(n: number): string {
  return "₺" + n.toLocaleString("tr-TR");
}

export default function AdminDashboard() {
  // --- Liste durumu ---
  const [araclar, setAraclar] = useState<CarDTO[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [listeHatasi, setListeHatasi] = useState<string | null>(null);

  // --- Form durumu ---
  const [form, setForm] = useState<FormState>(BOS_FORM);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [formHatasi, setFormHatasi] = useState<string | null>(null);
  const [basari, setBasari] = useState<string | null>(null);

  // --- Silme durumu (hangi araç siliniyor) ---
  const [silinenId, setSilinenId] = useState<string | null>(null);

<<<<<<< HEAD
  // --- Düzenleme durumu: null ise "ekleme modu", dolu ise o aracı düzenliyoruz ---
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null);

  // Seçilebilir lokasyonlar (tek kaynaktan)
  const seciliebilirLokasyonlar = aktifLokasyonlar();

=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  /* --------- Açılışta araçları çek --------- */
  useEffect(() => {
    let iptal = false;
    (async () => {
      try {
        const res = await fetch("/api/cars", { cache: "no-store" });
        if (!res.ok) throw new Error("Liste alınamadı");
        const veri: CarDTO[] = await res.json();
        if (!iptal) setAraclar(veri);
      } catch {
        if (!iptal) setListeHatasi("Araçlar yüklenemedi. Bağlantıyı kontrol edin.");
      } finally {
        if (!iptal) setYukleniyor(false);
      }
    })();
    return () => {
      iptal = true;
    };
  }, []);

  /* --------- Tek bir form alanını güncelle --------- */
  function alan<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

<<<<<<< HEAD
  /* --------- Lokasyon seçimini aç/kapat --------- */
  function lokasyonToggle(slug: string) {
    setForm((f) => ({
      ...f,
      lokasyonlar: f.lokasyonlar.includes(slug)
        ? f.lokasyonlar.filter((s) => s !== slug)
        : [...f.lokasyonlar, slug],
    }));
  }

  /* --------- Düzenlemeyi başlat: aracı forma yükle --------- */
  function duzenlemeBaslat(a: CarDTO) {
    setForm({
      marka: a.marka,
      model: a.model,
      yil: String(a.yil),
      vites_tipi: a.vites_tipi,
      yakit_tipi: a.yakit_tipi,
      yolcu_kapasitesi: String(a.yolcu_kapasitesi),
      bagaj_hacmi: String(a.bagaj_hacmi),
      min_kiralama_yasi: String(a.min_kiralama_yasi),
      klima: a.klima,
      gunluk_fiyat: String(a.gunluk_fiyat),
      lokasyonlar: a.lokasyonlar ?? [],
      resim_url: a.resim_url,
    });
    setDuzenlenenId(a.id);
    setFormHatasi(null);
    setBasari(null);
    // Forma odaklan (mobilde forma kaydır)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* --------- Düzenlemeyi iptal et: formu temizle, ekleme moduna dön --------- */
  function duzenlemeIptal() {
    setForm(BOS_FORM);
    setDuzenlenenId(null);
    setFormHatasi(null);
    setBasari(null);
  }

=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  /* --------- Dosya seç → base64 data URL'e çevir (link yerine) --------- */
  function dosyaSec(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") alan("resim_url", reader.result);
    };
    reader.readAsDataURL(file);
  }

  /* --------- Formu gönder (POST) --------- */
  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setFormHatasi(null);
    setBasari(null);

    // Basit istemci tarafı doğrulama
    if (!form.marka.trim() || !form.model.trim()) {
      setFormHatasi("Marka ve model zorunludur.");
      return;
    }
    const gunluk = Number(form.gunluk_fiyat);
    if (!form.gunluk_fiyat || Number.isNaN(gunluk) || gunluk < 0) {
      setFormHatasi("Geçerli bir günlük fiyat girin.");
      return;
    }

    const payload = {
      marka: form.marka.trim(),
      model: form.model.trim(),
      yil: Number(form.yil),
      vites_tipi: form.vites_tipi,
      yakit_tipi: form.yakit_tipi,
      yolcu_kapasitesi: Number(form.yolcu_kapasitesi),
      bagaj_hacmi: Number(form.bagaj_hacmi),
      min_kiralama_yasi: Number(form.min_kiralama_yasi),
      klima: form.klima,
      gunluk_fiyat: gunluk,
<<<<<<< HEAD
      lokasyonlar: form.lokasyonlar,
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
      resim_url: form.resim_url.trim(),
    };

    try {
      setGonderiliyor(true);
<<<<<<< HEAD

      // Düzenleme modundaysak PUT, değilse POST
      const duzenleme = duzenlenenId !== null;
      const url = duzenleme ? `/api/cars/${duzenlenenId}` : "/api/cars";
      const method = duzenleme ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
=======
      const res = await fetch("/api/cars", {
        method: "POST",
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const veri = await res.json();
      if (!res.ok) {
<<<<<<< HEAD
        setFormHatasi(veri?.error ?? "İşlem başarısız oldu.");
        return;
      }

      if (duzenleme) {
        // Anlık güncelleme: listede ilgili aracı değiştir
        setAraclar((onceki) =>
          onceki.map((a) => (a.id === duzenlenenId ? (veri as CarDTO) : a))
        );
        setBasari(`${payload.marka} ${payload.model} güncellendi.`);
        setForm(BOS_FORM);
        setDuzenlenenId(null);
      } else {
        // Anlık güncelleme: yeni aracı listenin başına ekle
        setAraclar((onceki) => [veri as CarDTO, ...onceki]);
        setForm(BOS_FORM);
        setBasari(`${payload.marka} ${payload.model} eklendi.`);
      }
=======
        setFormHatasi(veri?.error ?? "Araç eklenemedi.");
        return;
      }
      // Anlık güncelleme: yeni aracı listenin başına ekle
      setAraclar((onceki) => [veri as CarDTO, ...onceki]);
      setForm(BOS_FORM);
      setBasari(`${payload.marka} ${payload.model} eklendi.`);
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    } catch {
      setFormHatasi("Sunucuya ulaşılamadı.");
    } finally {
      setGonderiliyor(false);
    }
  }

  /* --------- Araç sil (DELETE) --------- */
  async function sil(id: string) {
    if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;
    try {
      setSilinenId(id);
      const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const veri = await res.json().catch(() => ({}));
        alert(veri?.error ?? "Araç silinemedi.");
        return;
      }
      // Anlık güncelleme: listeden çıkar
      setAraclar((onceki) => onceki.filter((a) => a.id !== id));
<<<<<<< HEAD
      // Eğer silinen araç şu an düzenleniyorsa formu sıfırla
      if (duzenlenenId === id) duzenlemeIptal();
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    } catch {
      alert("Sunucuya ulaşılamadı.");
    } finally {
      setSilinenId(null);
    }
  }

  /* ============================================================ */

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
<<<<<<< HEAD
      {/* =================== A) EKLEME / DÜZENLEME FORMU =================== */}
      <section className="h-fit rounded-xl2 border border-black/5 bg-white p-6 shadow-card lg:sticky lg:top-6">
        <header className="mb-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">
              {duzenlenenId ? "Aracı Düzenle" : "Yeni Araç Ekle"}
            </h2>
            {duzenlenenId && (
              <span className="rounded-full bg-amber/20 px-2.5 py-1 text-xs font-bold text-amber-deep">
                Düzenleme modu
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted">
            {duzenlenenId
              ? "Bilgileri güncelle ve kaydet. Vazgeçmek için iptal et."
              : "Bilgileri doldur, fotoğraf linki yapıştır veya cihazdan yükle."}
=======
      {/* =================== A) EKLEME FORMU =================== */}
      <section className="h-fit rounded-xl2 border border-black/5 bg-white p-6 shadow-card lg:sticky lg:top-6">
        <header className="mb-5">
          <h2 className="font-display text-lg font-bold text-ink">Yeni Araç Ekle</h2>
          <p className="mt-1 text-sm text-muted">
            Bilgileri doldur, fotoğraf linki yapıştır veya cihazdan yükle.
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
          </p>
        </header>

        <form onSubmit={gonder} className="space-y-4">
          {/* Marka + Model */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Marka">
              <input
                value={form.marka}
                onChange={(e) => alan("marka", e.target.value)}
                placeholder="Fiat"
                className={inputCls}
              />
            </Field>
            <Field label="Model">
              <input
                value={form.model}
                onChange={(e) => alan("model", e.target.value)}
                placeholder="Egea"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Yıl + Günlük fiyat */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Yıl">
              <input
                type="number"
                value={form.yil}
                onChange={(e) => alan("yil", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Günlük Fiyat (₺)">
              <input
                type="number"
                value={form.gunluk_fiyat}
                onChange={(e) => alan("gunluk_fiyat", e.target.value)}
                placeholder="950"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Vites + Yakıt */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Vites">
              <select
                value={form.vites_tipi}
                onChange={(e) => alan("vites_tipi", e.target.value as VitesTipi)}
                className={inputCls}
              >
                {VITES_SECENEKLERI.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Yakıt">
              <select
                value={form.yakit_tipi}
                onChange={(e) => alan("yakit_tipi", e.target.value as YakitTipi)}
                className={inputCls}
              >
                {YAKIT_SECENEKLERI.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Yolcu + Bagaj + Min yaş */}
          <div className="grid grid-cols-3 gap-3">
            <Field label="Yolcu">
              <input
                type="number"
                value={form.yolcu_kapasitesi}
                onChange={(e) => alan("yolcu_kapasitesi", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Bagaj">
              <input
                type="number"
                value={form.bagaj_hacmi}
                onChange={(e) => alan("bagaj_hacmi", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Min. Yaş">
              <input
                type="number"
                value={form.min_kiralama_yasi}
                onChange={(e) => alan("min_kiralama_yasi", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          {/* Klima toggle */}
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={form.klima}
              onChange={(e) => alan("klima", e.target.checked)}
              className="h-4 w-4 accent-amber"
            />
            Klima var
          </label>

<<<<<<< HEAD
          {/* Müsait lokasyonlar */}
          <Field label="Müsait Lokasyonlar">
            <div className="flex flex-wrap gap-2">
              {seciliebilirLokasyonlar.map((lok) => {
                const secili = form.lokasyonlar.includes(lok.slug);
                return (
                  <button
                    key={lok.slug}
                    type="button"
                    onClick={() => lokasyonToggle(lok.slug)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      secili
                        ? "border-amber bg-amber text-ink"
                        : "border-black/10 bg-white text-muted hover:border-amber"
                    }`}
                  >
                    {lok.ad}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs text-muted">
              Aracın hangi şubelerde teslim edilebileceğini seç.
            </p>
          </Field>

=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
          {/* Fotoğraf: link + dosya yükleme */}
          <Field label="Fotoğraf (link veya yükle)">
            <input
              value={form.resim_url.startsWith("data:") ? "" : form.resim_url}
              onChange={(e) => alan("resim_url", e.target.value)}
              placeholder="https://... ya da aşağıdan dosya seç"
              className={inputCls}
            />
            <div className="mt-2 flex items-center gap-3">
              <label className="cursor-pointer rounded-lg border border-black/10 bg-mist px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-amber">
                Dosya Seç
                <input
                  type="file"
                  accept="image/*"
                  onChange={dosyaSec}
                  className="hidden"
                />
              </label>
              {/* Önizleme */}
              {form.resim_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.resim_url}
                  alt="Önizleme"
                  className="h-12 w-16 rounded-md object-cover ring-1 ring-black/10"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span className="text-xs text-muted">Önizleme yok</span>
              )}
            </div>
          </Field>

          {/* Hata / başarı mesajı */}
          {formHatasi && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {formHatasi}
            </p>
          )}
          {basari && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              {basari}
            </p>
          )}

<<<<<<< HEAD
          {/* Gönder / Kaydet (+ düzenlemede İptal) */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={gonderiliyor}
              className="flex-1 rounded-lg bg-amber px-4 py-3 text-sm font-bold text-ink shadow-card transition hover:bg-amber-deep disabled:cursor-not-allowed disabled:opacity-60"
            >
              {gonderiliyor
                ? duzenlenenId
                  ? "Kaydediliyor…"
                  : "Ekleniyor…"
                : duzenlenenId
                ? "Değişiklikleri Kaydet"
                : "Ekle"}
            </button>
            {duzenlenenId && (
              <button
                type="button"
                onClick={duzenlemeIptal}
                disabled={gonderiliyor}
                className="rounded-lg border border-black/10 px-4 py-3 text-sm font-bold text-muted transition hover:border-ink hover:text-ink disabled:opacity-60"
              >
                İptal
              </button>
            )}
          </div>
=======
          {/* Gönder */}
          <button
            type="submit"
            disabled={gonderiliyor}
            className="w-full rounded-lg bg-amber px-4 py-3 text-sm font-bold text-ink shadow-card transition hover:bg-amber-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {gonderiliyor ? "Ekleniyor…" : "Ekle"}
          </button>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
        </form>
      </section>

      {/* =================== B) ARAÇ LİSTESİ =================== */}
      <section className="rounded-xl2 border border-black/5 bg-white shadow-card">
        <header className="flex items-center justify-between border-b border-black/5 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Mevcut Araçlar</h2>
          <span className="rounded-full bg-mist px-3 py-1 font-mono text-xs font-bold text-ink">
            {araclar.length} araç
          </span>
        </header>

        {/* Yükleniyor */}
        {yukleniyor ? (
          <div className="px-6 py-16 text-center text-sm text-muted">Yükleniyor…</div>
        ) : listeHatasi ? (
          <div className="px-6 py-16 text-center text-sm text-red-600">{listeHatasi}</div>
        ) : araclar.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <CarIcon className="mx-auto h-10 w-10 text-muted/40" strokeWidth={1.4} />
            <p className="mt-3 text-sm text-muted">
              Henüz araç yok. Soldaki formdan ilk aracı ekleyin.
            </p>
          </div>
        ) : (
          <>
            {/* Masaüstü tablo */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 text-xs uppercase tracking-wide text-muted">
                    <th className="px-6 py-3 font-semibold">Araç</th>
                    <th className="px-3 py-3 font-semibold">Özellikler</th>
                    <th className="px-3 py-3 font-semibold">Fiyat / gün</th>
                    <th className="px-6 py-3 text-right font-semibold">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {araclar.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b border-black/5 transition hover:bg-mist/60"
                    >
                      {/* Araç + küçük önizleme */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb src={a.resim_url} />
                          <div>
                            <p className="font-semibold text-ink">
                              {a.marka} {a.model}
                            </p>
                            <p className="font-mono text-xs text-muted">{a.yil}</p>
<<<<<<< HEAD
                            {a.lokasyonlar && a.lokasyonlar.length > 0 && (
                              <p className="mt-0.5 text-[11px] font-semibold text-amber-deep">
                                {a.lokasyonlar
                                  .map(
                                    (s) =>
                                      seciliebilirLokasyonlar.find(
                                        (l) => l.slug === s
                                      )?.ad ?? s
                                  )
                                  .join(" · ")}
                              </p>
                            )}
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
                          </div>
                        </div>
                      </td>
                      {/* Özellik ikonları */}
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                          <Spec icon={<GearIcon className="h-4 w-4" />} label={a.vites_tipi} />
                          <Spec icon={<FuelIcon className="h-4 w-4" />} label={a.yakit_tipi} />
                          <Spec
                            icon={<PassengerIcon className="h-4 w-4" />}
                            label={String(a.yolcu_kapasitesi)}
                          />
                          <Spec
                            icon={<LuggageIcon className="h-4 w-4" />}
                            label={String(a.bagaj_hacmi)}
                          />
                        </div>
                      </td>
                      {/* Fiyat */}
                      <td className="px-3 py-3">
                        <span className="font-display font-bold text-ink">
                          {fiyatTL(a.gunluk_fiyat)}
                        </span>
                      </td>
<<<<<<< HEAD
                      {/* İşlemler: Düzenle + Sil */}
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => duzenlemeBaslat(a)}
                            disabled={silinenId === a.id}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                              duzenlenenId === a.id
                                ? "border-amber bg-amber text-ink"
                                : "border-black/10 text-ink hover:border-amber hover:text-amber-deep"
                            }`}
                          >
                            {duzenlenenId === a.id ? "Düzenleniyor" : "Düzenle"}
                          </button>
                          <button
                            onClick={() => sil(a.id)}
                            disabled={silinenId === a.id}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {silinenId === a.id ? "Siliniyor…" : "Sil"}
                          </button>
                        </div>
=======
                      {/* Sil */}
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={() => sil(a.id)}
                          disabled={silinenId === a.id}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {silinenId === a.id ? "Siliniyor…" : "Sil"}
                        </button>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobil kart listesi */}
            <ul className="divide-y divide-black/5 md:hidden">
              {araclar.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                  <Thumb src={a.resim_url} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">
                      {a.marka} {a.model}
                    </p>
                    <p className="font-mono text-xs text-muted">
                      {a.yil} · {a.vites_tipi} · {a.yakit_tipi}
                    </p>
                    <p className="font-display text-sm font-bold text-ink">
                      {fiyatTL(a.gunluk_fiyat)}{" "}
                      <span className="text-xs font-normal text-muted">/ gün</span>
                    </p>
                  </div>
<<<<<<< HEAD
                  <div className="flex shrink-0 flex-col gap-1.5">
                    <button
                      onClick={() => duzenlemeBaslat(a)}
                      disabled={silinenId === a.id}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                        duzenlenenId === a.id
                          ? "border-amber bg-amber text-ink"
                          : "border-black/10 text-ink hover:border-amber"
                      }`}
                    >
                      {duzenlenenId === a.id ? "Düzenleniyor" : "Düzenle"}
                    </button>
                    <button
                      onClick={() => sil(a.id)}
                      disabled={silinenId === a.id}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {silinenId === a.id ? "…" : "Sil"}
                    </button>
                  </div>
=======
                  <button
                    onClick={() => sil(a.id)}
                    disabled={silinenId === a.id}
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {silinenId === a.id ? "…" : "Sil"}
                  </button>
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

/* ===================== Yardımcı bileşenler ===================== */

const inputCls =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs text-ink/70">
      {icon}
      {label}
    </span>
  );
}

/** Küçük araç önizleme görseli (yoksa degrade yer tutucu) */
function Thumb({ src }: { src: string }) {
  return (
    <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-surface to-ink ring-1 ring-black/10">
      <div className="absolute inset-0 grid place-items-center text-white/25">
        <CarIcon className="h-5 w-5" strokeWidth={1.4} />
      </div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : null}
    </div>
  );
}
