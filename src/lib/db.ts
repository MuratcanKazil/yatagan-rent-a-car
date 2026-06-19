/**
 * ============================================================
 *  src/lib/db.ts — MongoDB (Mongoose) bağlantısı
 *  ------------------------------------------------------------
 *  Next.js'te route handler'lar ve dev modundaki "hot reload"
 *  yüzünden modül defalarca yeniden değerlendirilebilir. Her
 *  istekte yeni bir bağlantı açmak (connection storm) hem
 *  yavaştır hem de MongoDB tarafında bağlantı limitini doldurur.
 *
 *  Bu yüzden bağlantıyı GLOBAL bir önbellekte (cache) tutuyoruz:
 *  ilk çağrıda bağlanır, sonraki tüm çağrılar aynı bağlantıyı
 *  yeniden kullanır.
 *
 *  Kullanım (server tarafında / route handler içinde):
 *    import { dbBaglan } from "@/lib/db";
 *    await dbBaglan();
 *
 *  Ortam değişkeni (.env.local):
 *    MONGODB_URI=mongodb+srv://kullanici:sifre@cluster.../yatagan
 * ============================================================ */

import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Global cache tipi (dev'de hot reload arası korunur)
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// globalThis üzerinde tek bir cache slotu tanımlıyoruz
declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

/**
 * MongoDB'ye bağlanır (veya mevcut bağlantıyı döndürür).
 * Bağlantı hazır olana kadar bekler.
 */
export async function dbBaglan(): Promise<Mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI tanımlı değil. Proje köküne .env.local ekleyip " +
        "MONGODB_URI=... satırını yazın (örnek için .env.local.example)."
    );
  }

  // 1) Zaten bağlıysak doğrudan onu kullan
  if (cached.conn) return cached.conn;

  // 2) Bağlanma sözü (promise) yoksa başlat — eşzamanlı isteklerde
  //    tek bir bağlantı kurulmasını garanti eder
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false, // bağlantı yokken sorguları kuyruğa alma, hata ver
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Başarısız olursa promise'i sıfırla ki sonraki istek tekrar denesin
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
