import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Yönetim Paneli — Hakan Topçu Rent a Car",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-mist">
      <AdminHeader />

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-7">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Araç Yönetimi
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Filonuzu buradan yönetin: yeni araç ekleyin, mevcutları silin.
            Değişiklikler anında listeye yansır.
          </p>
        </div>

        <AdminDashboard />
      </div>
    </main>
  );
}
