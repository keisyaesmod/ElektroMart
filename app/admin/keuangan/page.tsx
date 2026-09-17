"use client";

import { Download, Landmark, ShieldCheck } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const transactions = [
  { id: "#TRX-8921A", seller: "TechPro Gadgets", buyer: "Budi Santoso", amount: "Rp 14.500.000", status: "Escrow" },
  { id: "#TRX-8918C", seller: "ElectroWorld", buyer: "Siti Aminah", amount: "Rp 8.200.000", status: "Selesai" },
  { id: "#TRX-8912B", seller: "Kamera Bandung", buyer: "Andi Wijaya", amount: "Rp 21.000.000", status: "Escrow" },
  { id: "#TRX-8904D", seller: "TechIndo Store", buyer: "Rina Putri", amount: "Rp 5.750.000", status: "Selesai" },
];

const withdrawals = [
  { store: "TechIndo Store", bank: "BCA •••• 4592", amount: "Rp 8.500.000", status: "MENUNGGU", action: "Proses" },
  { store: "Kamera Bandung", bank: "Mandiri •••• 1180", amount: "Rp 12.000.000", status: "DIPROSES", action: "Detail" },
  { store: "Audio House", bank: "BRI •••• 7721", amount: "Rp 3.250.000", status: "BERHASIL", action: "Detail" },
];

export default function AdminKeuangan() {
  const { t } = useLanguage();
  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar placeholder={t("admin.searchTransactions")} />
      <div className="px-8 pb-10 pt-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.financeBalance")}</h1>
            <p className="mt-1 text-sm text-admin-muted">{t("admin.financeSubtitle")}</p>
          </div>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-[#E4E8F1] bg-white px-4 py-2.5 text-sm font-semibold text-admin-ink">
            <Download size={16} /> {t("admin.exportReport")}
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <ShieldCheck size={18} />
            </div>
            <p className="text-sm text-admin-muted">{t("admin.totalEscrowHeld")}</p>
            <p className="mt-1 text-2xl font-bold text-admin-ink">Rp 4.520.000.000</p>
            <p className="mt-2 text-xs font-medium text-[#DC2626]">↑ +12% {t("admin.fromLastMonth")}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFEDD5] text-[#C2410C]">
              <Landmark size={18} />
            </div>
            <p className="text-sm text-admin-muted">{t("admin.totalSuccessfulPayouts")}</p>
            <p className="mt-1 text-2xl font-bold text-admin-ink">Rp 12.850.500.000</p>
            <p className="mt-2 text-xs font-medium text-[#16A34A]">↑ +5.4% {t("admin.fromLastMonth")}</p>
          </div>
          <div className="rounded-2xl bg-admin-navy p-5 text-white">
            <p className="text-sm text-white/70">{t("admin.pendingWithdrawals")}</p>
            <p className="mt-2 text-[28px] font-bold">24 {t("admin.requests")}</p>
            <p className="mt-1 text-sm text-white/60">{t("admin.totalWorth")} Rp 145.000.000</p>
            <button type="button" className="mt-5 rounded-xl bg-admin-accent px-4 py-2 text-sm font-semibold">
              {t("admin.reviewNow")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-card xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-admin-ink">{t("admin.transactionFlow")}</h2>
              <button type="button" className="text-sm font-semibold text-admin-navy">{t("viewAll")}</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-admin-muted">
                  <th className="pb-3 font-semibold">{t("admin.transactionId")}</th>
                  <th className="pb-3 font-semibold">{t("admin.sellerBuyer")}</th>
                  <th className="pb-3 font-semibold">{t("admin.amount")}</th>
                  <th className="pb-3 font-semibold">{t("admin.status")}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-[#F1F4F8]">
                    <td className="py-4 font-semibold text-admin-ink">{tx.id}</td>
                    <td className="py-4">
                      <p className="font-semibold text-admin-ink">{tx.seller}</p>
                      <p className="text-xs text-admin-muted">{tx.buyer}</p>
                    </td>
                    <td className="py-4 font-semibold text-admin-ink">{tx.amount}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === "Escrow" ? "bg-[#E8F0FE] text-[#2563EB]" : "bg-[#EEF1F6] text-admin-muted"}`}>
                        ● {tx.status === "Selesai" ? t("admin.done") : tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="mb-4 text-base font-bold text-admin-ink">{t("admin.withdrawalRequests")}</h2>
            <div className="space-y-3">
              {withdrawals.map((w) => (
                <div key={w.store} className="rounded-xl border border-[#EEF1F6] p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-admin-ink">{w.store}</p>
                      <p className="text-xs text-admin-muted">{w.bank}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      w.status === "MENUNGGU" ? "bg-[#FFEDD5] text-[#C2410C]" : w.status === "DIPROSES" ? "bg-[#E8F0FE] text-[#2563EB]" : "bg-[#EEF1F6] text-admin-muted"
                    }`}>
                      {w.status === "MENUNGGU" ? t("admin.pending") : w.status === "DIPROSES" ? t("admin.processing") : w.status === "BERHASIL" ? t("admin.successful") : w.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-admin-ink">{w.amount}</p>
                    <button type="button" className="text-sm font-semibold text-[#2563EB]">{w.action === "Proses" ? t("admin.process") : t("admin.detail")}</button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="mt-4 w-full rounded-xl bg-[#E8F0FE] py-2.5 text-sm font-semibold text-[#2563EB]">
              {t("admin.viewAllRequests")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
