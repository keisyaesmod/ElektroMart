"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Tags,
  Store,
  Users,
  Wallet,
  Settings,
  Home,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  ArrowUpRight,
  Star,
  Activity,
  Banknote,
  Zap,
} from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const categorySales = [
  { label: "Smartphone", value: 4250, color: "#1a3fd6" },
  { label: "Laptop", value: 2180, color: "#f59e0b" },
  { label: "Audio", value: 1430, color: "#10b981" },
  { label: "Gaming", value: 1120, color: "#8b5cf6" },
  { label: "Kamera", value: 780, color: "#f43f5e" },
  { label: "Lainnya", value: 520, color: "#94a3b8" },
];

const totalCat = categorySales.reduce((s, c) => s + c.value, 0);

const popularProducts = [
  { name: "Samsung Galaxy S24 Ultra", sold: 540, stock: 25, img: "S" },
  { name: "iPhone 15 Pro Max 256GB", sold: 890, stock: 18, img: "i" },
  { name: "MacBook Air M3 13\"", sold: 320, stock: 12, img: "M" },
  { name: "Xiaomi 14T Pro 512GB", sold: 340, stock: 20, img: "X" },
  { name: "Sony WH-1000XM5", sold: 280, stock: 30, img: "S" },
];

const topSellers = [
  { name: "Toko Gadget Premium", revenue: "Rp 284.500.000", products: 48, rating: 4.9 },
  { name: "GameZone Official", revenue: "Rp 127.800.000", products: 22, rating: 4.8 },
  { name: "Apple Store Partner", revenue: "Rp 198.300.000", products: 35, rating: 4.9 },
];

const formatRupiah = (v: number) => "Rp " + v.toLocaleString("id-ID");

function PieChart() {
  const { t } = useLanguage();
  let cumDeg = 0;
  const segments = categorySales.map((seg) => {
    const angle = (seg.value / totalCat) * 360;
    const from = cumDeg;
    cumDeg += angle;
    return { ...seg, from, angle };
  });
  const gradParts = segments.map(
    (s) => `${s.color} ${fromDeg(s.from)}deg ${fromDeg(s.from + s.angle)}deg`
  );
  return (
    <div className="relative mx-auto aspect-square w-52 sm:w-60">
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(${gradParts.join(", ")})`,
        }}
      />
      <div className="absolute inset-[22%] rounded-full bg-white shadow-inner" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-[#0a1633]">
          {(totalCat / 1000).toFixed(1)}K
        </span>
        <span className="text-[10px] font-medium text-slate-400">{t("admin.totalSold")}</span>
      </div>
    </div>
  );
}

function fromDeg(deg: number) {
  return Math.round(deg * 10) / 10;
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const navItems = [
    { href: "/admin/dashboard", label: t("dashboard"), icon: LayoutGrid },
    { href: "/admin/kategori", label: t("admin.manageCategories"), icon: Tags },
    { href: "/admin/seller", label: t("admin.manageSellers"), icon: Store },
    { href: "/admin/buyer", label: t("admin.manageBuyers"), icon: Users },
    { href: "/admin/keuangan", label: t("admin.financeBalance"), icon: Wallet },
    { href: "/admin/pengaturan", label: t("admin.platformSettings"), icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col bg-[#0a1633] px-4 py-6">
        <div className="mb-10 px-2">
          <h1 className="text-lg font-bold text-white">ElektroMart</h1>
          <p className="mt-1 text-xs text-slate-400">{t("admin.adminDashboard")}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = item.href === "/admin/dashboard";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-amber-800 text-white"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <Link
          href="/beranda"
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5"
        >
          <Home className="h-4 w-4" /> {t("admin.backHome")}
        </Link>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        <TopBar />
        <main className="px-8 py-8">
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0a1633]">
                {t("admin.dashboardAdmin")}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {t("admin.summaryPer")}{" "}
                <TodayDate />
              </p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <Activity className="mr-1 inline h-3.5 w-3.5" />
                {t("admin.systemActive")}
              </span>
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                Live Data
              </span>
            </div>
          </div>

          {/* ====== STAT CARDS — Baris 1 ====== */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={Banknote}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-500"
              label={t("admin.totalRevenue")}
              value="Rp 2.000.000"
              change={`+18,3% ${t("admin.fromLastMonth")}`}
              up
            />
            <StatCard
              icon={ShoppingCart}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
              label={t("admin.totalTransactionsThisMonth")}
              value="2,847"
              change={`+12,1% ${t("admin.fromLastMonth")}`}
              up
            />
            <StatCard
              icon={Store}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              label={t("admin.activeSellers")}
              value="1,245"
              change={`+124 ${t("admin.newSellers")}`}
              up
            />
            <StatCard
              icon={Users}
              iconBg="bg-violet-50"
              iconColor="text-violet-500"
              label={t("admin.registeredBuyers")}
              value="45.243"
              change={`+3.2K ${t("admin.thisWeek")}`}
              up
            />
          </div>

          {/* ====== STAT CARDS — Baris 2 ====== */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <StatCard
              icon={Package}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-500"
              label={t("admin.registeredProducts")}
              value="8.432"
              change={`+312 ${t("admin.thisWeek")}`}
              up
            />
            <StatCard
              icon={Zap}
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
              label={t("admin.activeFlashSale")}
              value="3"
              change={`${t("endsIn")} 6 ${t("admin.hours")}`}
              neutral
            />
          </div>

          {/* ====== PIE CHART + RINGKASAN ====== */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            {/* Pie Chart Card */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#0a1633]">
                    {t("admin.distributionPerCategory")}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("admin.unitsSoldThisYear")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <PieChart />

                <div className="flex-1 space-y-3">
                  {categorySales.map((seg) => {
                    const pct = ((seg.value / totalCat) * 100).toFixed(1);
                    return (
                      <div key={seg.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 font-medium text-[#0a1633]">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: seg.color }}
                            />
                            {seg.label === "Lainnya" ? t("admin.others") : seg.label}
                          </span>
                          <span className="font-semibold text-[#0a1633]">{seg.value.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: seg.color,
                            }}
                          />
                        </div>
                        <span className="mt-0.5 block text-right text-[10px] text-slate-400">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ringkasan Keuangan & Metode Pembayaran */}
            <div className="space-y-5">
              {/* Keuangan */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
                <h3 className="font-semibold text-[#0a1633]">{t("admin.financeSummary")}</h3>
                <div className="mt-4 space-y-3">
                  <FinanceRow label={t("admin.totalRevenue")} value="Rp 48.241.080.000" accent />
                  <FinanceRow label={t("admin.commissionRevenue")} value="Rp 1.447.232.400" />
                  <FinanceRow label={t("admin.escrowHeldFunds")} value="Rp 6.890.400.000" />
                  <FinanceRow label={t("admin.totalPayoutToSellers")} value="Rp 41.350.647.600" />
                  <FinanceRow label={t("admin.platformBalance")} value="Rp 1.447.232.400" />
                </div>
              </div>

              {/* Metode Pembayaran Populer */}
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
                <h3 className="font-semibold text-[#0a1633]">{t("admin.popularPaymentMethods")}</h3>
                <div className="mt-4 space-y-3">
                  <PaymentMethodRow name="QRIS" pct={38} color="bg-emerald-500" />
                  <PaymentMethodRow name="GoPay" pct={22} color="bg-blue-500" />
                  <PaymentMethodRow name="BCA VA" pct={18} color="bg-[#2A74B4]" />
                  <PaymentMethodRow name="BRI VA" pct={11} color="bg-[#0E56A8]" />
                  <PaymentMethodRow name="OVO" pct={7} color="bg-purple-500" />
                  <PaymentMethodRow name={t("admin.others")} pct={4} color="bg-slate-300" />
                </div>
              </div>
            </div>
          </div>

          {/* ====== POPULAR PRODUCTS + TOP SELLERS ====== */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            {/* Produk Terlaris */}
            <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div>
                  <h3 className="font-semibold text-[#0a1633]">{t("bestSellers")}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{t("admin.topSoldSubtitle")}</p>
                </div>
                <Link href="/admin/kategori" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                  {t("admin.manage")} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {popularProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4 px-6 py-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                      #{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#0a1633]">{p.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{p.stock} {t("admin.unitLeft")}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      <span className="text-xs font-semibold text-[#0a1633]">4.9</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      {p.sold} {t("soldCount")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Sellers + Kebutuhan Cepat */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <div>
                    <h3 className="font-semibold text-[#0a1633]">Top Seller</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{t("admin.highestRevenueThisMonth")}</p>
                  </div>
                  <Link href="/admin/seller" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                    {t("viewAll")} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {topSellers.map((s, i) => (
                    <div key={s.name} className="flex items-center gap-4 px-6 py-3.5">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                          i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : "bg-amber-700"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#0a1633]">{s.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{s.products} {t("products")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-emerald-600">{s.revenue}</p>
                        <p className="flex items-center justify-end gap-0.5 text-xs text-amber-500">
                          <Star className="h-3 w-3 fill-amber-400" /> {s.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flash Sale Hari Ini */}
              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <Zap className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#0a1633]">{t("admin.flashSaleToday")}</p>
                    <p className="text-xs text-slate-500">{t("admin.flashSaleProgress")}</p>
                  </div>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: "78%" }} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-slate-500">
                  <span>78/100 {t("soldCount")}</span>
                  <span className="font-bold text-amber-600">{t("endsIn")} 6 {t("admin.hours")}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TodayDate() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return <span className="font-medium text-[#0a1633]">{text}</span>;
}

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  change,
  up,
  neutral,
}: {
  icon: typeof Banknote;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  change: string;
  up?: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all hover:shadow-cardHover">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
        </div>
        {up ? (
          <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> {change}
          </span>
        ) : neutral ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            {change}
          </span>
        ) : (
          <span className="flex items-center gap-0.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500">
            <TrendingDown className="h-3 w-3" /> {change}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#0a1633]">{value}</p>
    </div>
  );
}

function FinanceRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${accent ? "font-semibold text-[#0a1633]" : "text-slate-500"}`}>{label}</span>
      <span className={`text-sm ${accent ? "font-bold text-emerald-600" : "font-semibold text-[#0a1633]"}`}>
        {value}
      </span>
    </div>
  );
}

function PaymentMethodRow({
  name,
  pct,
  color,
}: {
  name: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-[#0a1633]">{name}</span>
        <span className="font-semibold text-slate-600">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
