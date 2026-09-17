"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Tags,
  Store,
  Users,
  Wallet,
  Settings,
  Home,
  Bell,
  Download,
  TrendingUp,
  Landmark,
  Banknote,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navItems = [
  { label: "dashboard", icon: LayoutGrid },
  { label: "admin.manageCategories", icon: Tags },
  { label: "admin.manageSellers", icon: Store },
  { label: "admin.manageBuyers", icon: Users },
  { label: "admin.financeBalance", icon: Wallet },
  { label: "admin.platformSettings", icon: Settings },
];

const transaksi = [
  {
    id: "#TRX-8921A",
    toko: "TechIndo Store",
    nama: "Budi Santoso",
    nominal: "Rp 14.500.000",
    status: "Escrow",
  },
  {
    id: "#TRX-8919C",
    toko: "Digital Corner",
    nama: "Siti Aminah",
    nominal: "Rp 2.450.000",
    status: "Selesai",
  },
  {
    id: "#TRX-8915X",
    toko: "Laptop Murah Jakarta",
    nama: "Agus Pratama",
    nominal: "Rp 21.000.000",
    status: "Escrow",
  },
  {
    id: "#TRX-8902F",
    toko: "Mega Elektronik",
    nama: "Dewi Lestari",
    nominal: "Rp 5.200.000",
    status: "Escrow",
  },
];

const statusStyles: Record<string, string> = {
  Escrow: "bg-blue-50 text-blue-600",
  Selesai: "bg-slate-100 text-slate-500",
};

const transactionStatusKeys: Record<string, string> = {
  Selesai: "admin.done",
};

const withdrawalStatusKeys: Record<string, string> = {
  MENUNGGU: "admin.pending",
  DIPROSES: "admin.processing",
  BERHASIL: "admin.successful",
};

const withdrawalActionKeys: Record<string, string> = {
  Proses: "admin.process",
  Detail: "admin.detail",
};

const pencairan = [
  {
    toko: "TechIndo Store",
    bank: "BCA •••• 4592",
    status: "MENUNGGU",
    statusStyle: "bg-amber-100 text-amber-700",
    nominal: "Rp 8.500.000",
    action: "Proses",
  },
  {
    toko: "Kamera Bandung",
    bank: "Mandiri •••• 1120",
    status: "DIPROSES",
    statusStyle: "bg-blue-100 text-blue-600",
    nominal: "Rp 12.000.000",
    action: "Detail",
  },
  {
    toko: "Gudang HP",
    bank: "BNI •••• 8831",
    status: "BERHASIL",
    statusStyle: "bg-green-100 text-green-700",
    nominal: "Rp 3.250.000",
    action: "Hari ini, 09:12",
  },
];

export default function KeuanganSaldoPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col bg-[#0B1330] px-4 py-6">
        <div className="mb-10 px-2">
          <h1 className="text-lg font-bold text-white">ElektroMart</h1>
          <p className="mt-1 text-xs text-slate-400">{t("admin.adminDashboard")}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = item.label === "admin.financeBalance";
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-amber-800 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.label)}</span>
              </button>
            );
          })}
        </nav>

        <Link href="/beranda" className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5">
          <Home className="h-4 w-4" />
          <span>{t("admin.backHome")}</span>
        </Link>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="flex items-center justify-end border-b border-slate-200 bg-white px-8 py-4">
          <div className="flex flex-shrink-0 items-center gap-5 pl-6">
            <LanguageSwitcher variant="light" />
            <div className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange-500" />
            </div>
            <Settings className="h-5 w-5 text-slate-500" />
            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300" />
          </div>
        </header>

        <main className="px-8 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0B1330]">
                {t("admin.financeBalance")}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {t("admin.financeSubtitle")}
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
              <Download className="h-4 w-4" />
              {t("admin.exportReport")}
            </button>
          </div>

          {/* Stat cards */}
          <div className="mt-6 grid grid-cols-3 gap-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Landmark className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-slate-500">{t("admin.totalEscrowHeld")}</p>
              <p className="mt-1 text-2xl font-bold text-[#0B1330]">
                Rp
                <br />
                4.520.000.000
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="h-3.5 w-3.5" />
                +12% {t("admin.fromLastMonth")}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <Banknote className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-sm text-slate-500">{t("admin.totalSuccessfulPayouts")}</p>
              <p className="mt-1 text-2xl font-bold text-[#0B1330]">
                Rp
                <br />
                12.850.500.000
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                <TrendingUp className="h-3.5 w-3.5" />
                +5.4% {t("admin.fromLastMonth")}
              </p>
            </div>

            <div className="rounded-xl bg-[#0B1330] p-6 text-white">
              <p className="text-sm text-slate-300">{t("admin.pendingWithdrawals")}</p>
              <p className="mt-2 text-3xl font-bold">24 {t("admin.requests")}</p>
              <p className="mt-1 text-sm text-slate-400">
                {t("admin.totalWorth")} Rp 145.000.000
              </p>
              <button className="mt-5 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white">
                {t("admin.reviewNow")}
              </button>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-6 grid grid-cols-[1fr_360px] gap-5">
            <div className="h-fit rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h3 className="font-semibold text-[#0B1330]">
                  {t("admin.transactionFlow")}
                </h3>
                <button className="text-sm font-medium text-amber-700">
                  {t("admin.viewAll")}
                </button>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3 font-medium">{t("admin.transactionId")}</th>
                    <th className="px-5 py-3 font-medium">
                      {t("admin.sellerBuyer")}
                    </th>
                    <th className="px-5 py-3 font-medium">{t("admin.amount")}</th>
                    <th className="px-5 py-3 font-medium">{t("admin.status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {transaksi.map((tr) => (
                    <tr key={tr.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-4 font-medium text-[#0B1330]">
                        {tr.id}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-[#0B1330]">{tr.toko}</p>
                        <p className="text-xs text-slate-400">{tr.nama}</p>
                      </td>
                      <td className="px-5 py-4 font-medium text-[#0B1330]">
                        {tr.nominal}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[tr.status]}`}
                        >
                          ● {transactionStatusKeys[tr.status] ? t(transactionStatusKeys[tr.status]) : tr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="h-fit rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 font-semibold text-[#0B1330]">
                {t("admin.withdrawalRequests")}
              </h3>
              <div className="space-y-4">
                {pencairan.map((p) => (
                  <div
                    key={p.toko}
                    className="rounded-lg border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#0B1330]">{p.toko}</p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${p.statusStyle}`}
                      >
                        {t(withdrawalStatusKeys[p.status] ?? p.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{p.bank}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-semibold text-[#0B1330]">
                        {p.nominal}
                      </p>
                      <span className="text-xs font-medium text-amber-700">
                        {p.action.startsWith("Hari ini")
                          ? `${t("admin.today")}${p.action.slice("Hari ini".length)}`
                          : t(withdrawalActionKeys[p.action] ?? p.action)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg bg-slate-50 py-2.5 text-sm font-medium text-amber-700">
                {t("admin.viewAllRequests")}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}