"use client";

import { ChevronDown, Filter, MoreVertical } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const buyers = [
  { name: "Budi Santoso", initials: "BS", color: "bg-[#2563EB]", email: "budi.s@email.com", phone: "08123456789", spend: "Rp 25.000.000", orders: "12 Pesanan", joined: "12 Jan 2023", status: "Aktif" },
  { name: "Siti Aminah", initials: "SA", color: "bg-[#EA580C]", email: "siti.a@email.com", phone: "08771234567", spend: "Rp 8.500.000", orders: "5 Pesanan", joined: "15 Mar 2023", status: "Aktif" },
  { name: "Agus Pratama", initials: "AP", color: "bg-[#DC2626]", email: "agus.p@email.com", phone: "08199876543", spend: "Rp 0", orders: "0 Pesanan", joined: "20 Nov 2023", status: "Suspended" },
];

export default function AdminBuyer() {
  const { t } = useLanguage();
  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar placeholder={t("admin.searchBuyerPlaceholder")} />
      <div className="px-8 pb-10 pt-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.manageBuyers")}</h1>
            <p className="mt-1 text-sm text-admin-muted">{t("admin.buyersSubtitle")}</p>
          </div>
          <button type="button" className="rounded-xl bg-admin-navy px-4 py-2.5 text-sm font-semibold text-white">
            {t("admin.addBuyer")}
          </button>
        </div>

        <div className="rounded-2xl border border-[#EEF1F6] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#E4E8F1] px-3 py-2 text-sm font-medium text-admin-ink">
                <Filter size={14} /> {t("admin.filter")}
              </button>
              <button type="button" className="flex items-center gap-1.5 rounded-lg border border-[#E4E8F1] px-3 py-2 text-sm font-medium text-admin-ink">
                {t("admin.sort")} <ChevronDown size={14} />
              </button>
            </div>
            <p className="text-sm text-admin-muted">{t("admin.showingBuyers")}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#EEF1F6]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F4F6FA] text-[13px] text-admin-ink">
                  <th className="px-4 py-3 font-semibold">{t("admin.buyerName")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.phoneNo")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.totalSpend")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.joinedDate")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.status")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((b) => (
                  <tr key={b.email} className="border-t border-[#F1F4F8]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${b.color}`}>{b.initials}</span>
                        <div>
                          <p className="font-semibold text-admin-ink">{b.name}</p>
                          <p className="text-xs text-admin-muted">{b.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 text-admin-ink">{b.phone}</td>
                    <td className="px-4">
                      <p className="font-semibold text-admin-ink">{b.spend}</p>
                      <p className="text-xs text-admin-muted">{b.orders}</p>
                    </td>
                    <td className="px-4 text-admin-ink">{b.joined}</td>
                    <td className="px-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${b.status === "Aktif" ? "bg-[#E9F8EF] text-[#16A34A]" : "bg-[#FDECEC] text-[#E11D48]"}`}>
                        {b.status === "Aktif" ? t("admin.active") : b.status === "Suspended" ? t("admin.suspended") : b.status}
                      </span>
                    </td>
                    <td className="px-4">
                      <button type="button" aria-label={`${t("admin.actions")} ${b.name}`} className="text-admin-muted">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm">
            <button type="button" className="rounded-lg border border-[#E4E8F1] px-4 py-2 text-admin-ink">{t("admin.previous")}</button>
            <div className="flex gap-1.5">
              <button type="button" className="h-8 w-8 rounded-lg bg-admin-navy text-white">1</button>
              <button type="button" className="h-8 w-8 rounded-lg border border-[#E4E8F1]">2</button>
              <button type="button" className="h-8 w-8 rounded-lg border border-[#E4E8F1]">3</button>
            </div>
            <button type="button" className="rounded-lg border border-[#E4E8F1] px-4 py-2 text-admin-ink">{t("admin.next")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
