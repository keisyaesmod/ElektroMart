"use client";

import { MoreVertical, Star, Store } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const sellers = [
  { name: "TechPro Gadgets", joined: "Jan 2023", rating: "4.9 (1.2k)", products: 145, status: "Official Store", image: "/products/macbook-m3.svg" },
  { name: "ElectroWorld", joined: "Mar 2023", rating: "4.7 (850)", products: 89, status: "Verified Seller", image: "/products/samsung-s24.svg" },
  { name: "Aksesoris Hape Murah", joined: "Nov 2023", rating: "N/A", products: 0, status: "Banned", image: "/products/iphone-15.svg" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Official Store": "bg-admin-navy text-white",
    "Verified Seller": "bg-[#EEE7FA] text-[#6D28D9]",
    Banned: "bg-[#FDECEC] text-[#E11D48]",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}

export default function AdminSeller() {
  const { t } = useLanguage();
  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar placeholder={t("admin.searchUsersStores")} />
      <div className="px-8 pb-10 pt-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.manageSellers")}</h1>
            <p className="mt-1 text-sm text-admin-muted">{t("admin.sellersSubtitle")}</p>
          </div>
          <button type="button" className="rounded-xl bg-admin-navy px-4 py-2.5 text-sm font-semibold text-white">
            {t("admin.addSeller")}
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-admin-muted">
                <th className="pb-4 font-semibold">{t("auth.storeName")}</th>
                <th className="pb-4 font-semibold">{t("admin.reputation")}</th>
                <th className="pb-4 font-semibold">{t("admin.productCount")}</th>
                <th className="pb-4 font-semibold">{t("admin.status")}</th>
                <th className="pb-4 font-semibold">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s) => (
                <tr key={s.name} className="border-t border-[#F1F4F8]">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#F4F6FA]">
                        {s.image ? <img src={s.image} alt="" className="h-full w-full object-contain" /> : <Store size={18} />}
                      </div>
                      <div>
                        <p className="font-semibold text-admin-ink">{s.name}</p>
                        <p className="text-xs text-admin-muted">{t("admin.joined")}: {s.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-admin-ink">
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={14} className={s.rating === "N/A" ? "text-admin-muted" : "fill-amber-400 text-amber-400"} />
                      {s.rating}
                    </span>
                  </td>
                  <td className="text-admin-ink">{s.products}</td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td>
                    <button type="button" aria-label={`${t("admin.actions")} ${s.name}`} className="text-admin-muted">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
