import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // mongoose Node.js'e özgü modüller kullanır; server bundle'ına
  // dahil etmek yerine native require ile dışarıda bırakıyoruz.
  // (Next 16 bunu otomatik yapsa da, açıkça belirtmek güvenli.)
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
