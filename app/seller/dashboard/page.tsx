"use client";

import {
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Package,
  Percent,
  Truck,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import TopBar from "../components/TopBar";

interface StatCard {
  labelKey: string;
  value: string;
  change: string;
  changeUp: boolean;
  icon: typeof CreditCard;
  iconWrap: string;
}

const stats: StatCard[] = [
  { labelKey: "seller.totalSales", value: "Rp 45.850.000", change: "+12.5%", changeUp: true, icon: CreditCard, iconWrap: "bg-[#E8EEF8] text-[#3B5B8C]" },
  { labelKey: "seller.activeOrders", value: "124", change: "+5.2%", changeUp: true, icon: Truck, iconWrap: "bg-[#FFF1E6] text-[#D97706]" },
  { labelKey: "seller.totalVisitors", value: "8.405", change: "-2.1%", changeUp: false, icon: Users, iconWrap: "bg-[#EEF1F6] text-[#64748B]" },
  { labelKey: "seller.conversionRate", value: "3.2%", change: "+0.8%", changeUp: true, icon: Percent, iconWrap: "bg-[#E8EEF8] text-[#3B5B8C]" },
];

const weeklySales = [
  { day: "Sen", dayKey: "seller.dayMon", value: 3.4 },
  { day: "Sel", dayKey: "seller.dayTue", value: 5.4 },
  { day: "Rab", dayKey: "seller.dayWed", value: 2.8 },
  { day: "Kam", dayKey: "seller.dayThu", value: 7.6 },
  { day: "Jum", dayKey: "seller.dayFri", value: 9.8 },
  { day: "Sab", dayKey: "seller.daySat", value: 4.6 },
  { day: "Min", dayKey: "seller.daySun", value: 6.9 },
];

const yTicks = ["10Jt", "7.5Jt", "5Jt", "2.5Jt", "0"];

export default function Dashboard() {
  const { t } = useLanguage();
  return (
    <div className="flex-1 overflow-y-auto bg-seller-canvas">
      <TopBar placeholder={t("seller.searchOrdersProducts")} />

      <div className="px-8 pb-10 pt-4">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-seller-ink">{t("seller.businessSummary")}</h1>
            <p className="mt-1 text-sm text-seller-muted">{t("seller.storePerformanceToday")}</p>
          </div>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-[#E4E8F1] bg-white px-4 py-2.5 text-sm font-medium text-seller-ink shadow-sm">
            <CalendarDays size={16} className="text-seller-muted" />
            {t("seller.last7Days")}
          </button>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.labelKey} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconWrap}`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.changeUp ? "bg-[#E9F8EF] text-[#16A34A]" : "bg-[#FDECEC] text-[#E11D48]"
                    }`}
                  >
                    {s.changeUp ? "↗" : "↘"} {s.change}
                  </span>
                </div>
                <p className="text-sm text-seller-muted">{t(s.labelKey)}</p>
                <p className="mt-1 text-[22px] font-bold text-seller-ink">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-card xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-seller-ink">{t("seller.weeklySalesTrend")}</h2>
              <button type="button" className="text-sm font-semibold text-seller-navy">
                {t("seller.viewDetails")}
              </button>
            </div>

            <div className="flex h-[250px] gap-3">
              <div className="flex w-10 flex-col justify-between pb-6 text-right text-[11px] text-seller-muted">
                {yTicks.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
              <div className="relative flex flex-1 items-end justify-between gap-3 border-l border-[#EEF1F6] pl-3">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
                  {yTicks.map((tick) => (
                    <div key={tick} className="border-t border-[#F1F4F8]" />
                  ))}
                </div>
                {weeklySales.map((d) => {
                  const isPeak = d.day === "Jum";
                  const heightPct = (d.value / 10) * 100;
                  return (
                    <div key={d.day} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end">
                      {isPeak && (
                        <span className="mb-2 rounded-md bg-seller-ink px-2 py-1 text-[11px] font-semibold text-white">
                          Rp {d.value.toFixed(1)}Jt
                        </span>
                      )}
                      <div
                        className={`w-9 rounded-t-md ${isPeak ? "bg-seller-navy" : "bg-[#D7DEEA]"}`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className={`mt-2 text-xs ${isPeak ? "font-semibold text-seller-ink" : "text-seller-muted"}`}>
                        {t(d.dayKey)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              <h2 className="text-lg font-bold text-seller-ink">{t("seller.needAction")}</h2>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3 rounded-xl bg-[#F3F7FF] p-4">
                <ClipboardList size={18} className="mt-0.5 shrink-0 text-[#3B5B8C]" />
                <div>
                  <p className="text-sm font-semibold text-seller-ink">{t("seller.lowStock")}</p>
                  <p className="mt-0.5 text-sm text-seller-muted">{t("seller.lowStockDesc")}</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl bg-[#F3F7FF] p-4">
                <Package size={18} className="mt-0.5 shrink-0 text-[#3B5B8C]" />
                <div>
                  <p className="text-sm font-semibold text-seller-ink">{t("seller.ordersWaitingShipment")}</p>
                  <p className="mt-0.5 text-sm text-seller-muted">{t("seller.shipmentDeadline")}</p>
                </div>
              </div>
            </div>

            <button type="button" className="mt-5 w-full rounded-xl border border-[#E4E8F1] py-2.5 text-sm font-semibold text-seller-ink">
              {t("seller.viewAllNotifications")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
