"use client";

import { Check, Clock, Hourglass, TrendingUp, Wallet } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

function formatSignedRupiah(value: number) {
  const sign = value >= 0 ? "+" : "-";
  return `${sign}Rp ${Math.abs(value).toLocaleString("id-ID")}`;
}

export default function Finance() {
  const { t } = useLanguage();
  const transactions = [
    { id: "TRX-982374-IN", date: "12 Okt 2023, 14:30", description: t("seller.saleLaptop"), amount: 18500000, done: true },
    { id: "TRX-982373-OUT", date: "10 Okt 2023, 09:15", description: t("seller.withdrawalBCA"), amount: -10000000, done: true },
    { id: "TRX-982370-IN", date: "08 Okt 2023, 16:45", description: t("seller.saleSamsung"), amount: 12000000, done: false },
    { id: "TRX-982365-IN", date: "05 Okt 2023, 11:20", description: t("seller.saleSony"), amount: 5200000, done: true },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-seller-canvas">
      <div className="flex items-center justify-between gap-4 px-8 pb-2 pt-8">
        <h1 className="text-[28px] font-bold tracking-tight text-seller-ink">{t("seller.financeWallet")}</h1>
        <TopBar placeholder={t("seller.searchTransactions")} variant="inline" />
      </div>

      <div className="px-8 pb-10 pt-4">
        <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-seller-navy p-8 text-white xl:col-span-2">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#9DB4E8]">{t("seller.activeBalance")}</p>
            <p className="mt-3 text-[36px] font-bold leading-none">Rp 45.850.000</p>
            <p className="mt-3 text-sm text-[#9DB4E8]">{t("seller.balanceReadyToWithdraw")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="flex items-center gap-2 rounded-xl bg-seller-orange px-5 py-2.5 text-sm font-semibold text-white">
                <Wallet size={16} /> {t("seller.withdraw")}
              </button>
              <button type="button" className="rounded-xl border border-[#6B82B5] px-5 py-2.5 text-sm font-semibold text-[#C5D4F2]">
                {t("seller.withdrawalHistory")}
              </button>
            </div>

            <Wallet size={140} className="pointer-events-none absolute -bottom-6 -right-4 text-white/10" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#E8ECF3] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#3B5B8C]">
                  <Hourglass size={18} />
                </span>
                <span className="rounded-full bg-[#EEF1F6] px-2.5 py-0.5 text-xs font-semibold text-seller-muted">H+3</span>
              </div>
              <p className="text-sm text-seller-muted">{t("seller.pendingPayout")}</p>
              <p className="mt-1 text-xl font-bold text-seller-ink">Rp 12.400.000</p>
              <p className="mt-1 text-xs text-seller-muted">{t("seller.fromCompletedOrders")}</p>
            </div>

            <div className="rounded-2xl border border-[#E8ECF3] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0FE] text-[#3B5B8C]">
                  <TrendingUp size={18} />
                </span>
                <span className="text-xs font-bold text-seller-orange">↑14%</span>
              </div>
              <p className="text-sm text-seller-muted">{t("seller.totalRevenueYtd")}</p>
              <p className="mt-1 text-xl font-bold text-seller-ink">Rp 340.500.000</p>
              <p className="mt-1 text-xs text-seller-muted">{t("seller.yearToDate")}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-seller-ink">{t("seller.recentTransactions")}</h2>
            <button type="button" className="text-sm font-semibold text-seller-navy">
              {t("admin.viewAll")}
            </button>
          </div>

          <div className="overflow-hidden rounded-xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#EEF3FA] text-[13px] text-seller-ink">
                  <th className="px-4 py-3 font-semibold">{t("admin.transactionId")}</th>
                  <th className="px-4 py-3 font-semibold">{t("seller.date")}</th>
                  <th className="px-4 py-3 font-semibold">{t("seller.transactionDescription")}</th>
                  <th className="px-4 py-3 font-semibold">{t("seller.amount")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.status")}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 1 ? "bg-[#F7F9FC]" : "bg-white"}>
                    <td className="px-4 py-4 font-semibold text-seller-ink">{row.id}</td>
                    <td className="px-4 text-seller-muted">{row.date}</td>
                    <td className="px-4 text-seller-ink/80">{row.description}</td>
                    <td className="px-4 font-semibold text-seller-ink">{formatSignedRupiah(row.amount)}</td>
                    <td className="px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          row.done ? "bg-[#E8F0FE] text-[#2563EB]" : "bg-[#EEEAF6] text-[#6B6280]"
                        }`}
                      >
                        {row.done ? <Check size={12} /> : <Clock size={12} />}
                        {row.done ? t("seller.completed") : t("seller.pending")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
