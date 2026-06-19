import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const VITES_TIPLERI = ["Manuel", "Otomatik"] as const;
export const YAKIT_TIPLERI = ["Benzin", "Dizel", "Hibrit", "Elektrik"] as const;

export type VitesTipi = (typeof VITES_TIPLERI)[number];
export type YakitTipi = (typeof YAKIT_TIPLERI)[number];

const guncelYil = new Date().getFullYear();

const CarSchema = new Schema(
  {
    marka: {
      type: String,
      required: [true, "Marka zorunludur."],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model zorunludur."],
      trim: true,
    },
    yil: {
      type: Number,
      required: [true, "Yıl zorunludur."],
      min: [1990, "Yıl 1990'dan küçük olamaz."],
      max: [guncelYil + 1, `Yıl ${guncelYil + 1}'den büyük olamaz.`],
    },
    vites_tipi: {
      type: String,
      enum: { values: VITES_TIPLERI as unknown as string[], message: "Geçersiz vites tipi." },
      required: [true, "Vites tipi zorunludur."],
    },
    yakit_tipi: {
      type: String,
      enum: { values: YAKIT_TIPLERI as unknown as string[], message: "Geçersiz yakıt tipi." },
      required: [true, "Yakıt tipi zorunludur."],
    },
    yolcu_kapasitesi: {
      type: Number,
      required: [true, "Yolcu kapasitesi zorunludur."],
      min: [1, "En az 1 yolcu olmalı."],
      max: [9, "En fazla 9 yolcu olabilir."],
    },
    bagaj_hacmi: {
      type: Number,
      required: [true, "Bagaj hacmi zorunludur."],
      min: [0, "Bagaj hacmi negatif olamaz."],
      default: 1,
    },
    klima: {
      type: Boolean,
      default: true,
    },
    min_kiralama_yasi: {
      type: Number,
      default: 21,
      min: [18, "Minimum kiralama yaşı 18'den küçük olamaz."],
    },
    gunluk_fiyat: {
      type: Number,
      required: [true, "Günlük fiyat zorunludur."],
      min: [0, "Fiyat negatif olamaz."],
    },
<<<<<<< HEAD
    lokasyonlar: {
      type: [String],
      default: [],
      // Aracın müsait olduğu lokasyon slug'ları (örn. ["marmaris", "mugla"])
    },
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
    resim_url: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  }
);

export type CarDoc = InferSchemaType<typeof CarSchema>;

export interface CarDTO {
  id: string;
  marka: string;
  model: string;
  yil: number;
  vites_tipi: VitesTipi;
  yakit_tipi: YakitTipi;
  yolcu_kapasitesi: number;
  bagaj_hacmi: number;
  klima: boolean;
  min_kiralama_yasi: number;
  gunluk_fiyat: number;
<<<<<<< HEAD
  lokasyonlar: string[];
=======
>>>>>>> 830bfb9508b85ab729a6e1e5466138ba29748ddf
  resim_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export const Car: Model<CarDoc> =
  (mongoose.models.Car as Model<CarDoc>) ||
  mongoose.model<CarDoc>("Car", CarSchema);
