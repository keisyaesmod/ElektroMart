"use client";

import { useState } from "react";
import { ChevronDown, Download, FileText, Truck, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Pagination from "../components/Pagination";
import TopBar from "../components/TopBar";
import type { OrderItem, OrderStatus } from "../types";

const tabs: { id: string; labelKey: string; count?: number }[] = [
  { id: "Semua Pesanan", labelKey: "seller.allOrders" },
  { id: "Perlu Dikirim", labelKey: "seller.needShipment", count: 12 },
  { id: "Dikirim", labelKey: "seller.shipped" },
  { id: "Selesai", labelKey: "admin.done" },
  { id: "Dibatalkan", labelKey: "seller.cancelled" },
];

const orders: OrderItem[] = [
  {
    id: "1",
    code: "ORD-20231024-001",
    date: "24 Okt 2023, 14:30 WIB",
    productName: "MacBook Pro 16-inch M2...",
    variant: "32GB RAM / 1TB SSD",
    qty: 1,
    unitPrice: 45000000,
    buyerName: "Budi Santoso",
    courier: "GoSend Instant (Resi Otomatis)",
    total: 45050000,
    status: "PERLU DIPROSES",
    imageSrc: "/products/macbook-m3.svg",
  },
  {
    id: "2",
    code: "ORD-20231024-042",
    date: "24 Okt 2023, 11:15 WIB",
    productName: "Samsung Galaxy S23 Ultra",
    variant: "Phantom Black / 512GB",
    qty: 1,
    unitPrice: 21999000,
    buyerName: "Anita Wijaya",
    courier: "JNE Reguler (Tunggu Kurir Pick-up)",
    total: 22020000,
    status: "SIAP DIKIRIM",
    imageSrc: "/products/samsung-s24.svg",
  },
];

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID");
}

const statusKey: Record<OrderStatus, string> = {
  "PERLU DIPROSES": "seller.orderNeedProcessing",
  "SIAP DIKIRIM": "seller.readyToShip",
  DIKIRIM: "seller.shipped",
  SELESAI: "admin.done",
  DIBATALKAN: "seller.cancelled",
};

function StatusPill({ status }: { status: OrderStatus }) {
  const { t } = useLanguage();
  const styles: Record<OrderStatus, string> = {
    "PERLU DIPROSES": "bg-[#FDECEC] text-[#E11D48]",
    "SIAP DIKIRIM": "bg-[#E8F0FE] text-[#2563EB]",
    DIKIRIM: "bg-[#FFF4E5] text-[#D97706]",
    SELESAI: "bg-[#E9F8EF] text-[#16A34A]",
    DIBATALKAN: "bg-[#EEF1F6] text-seller-muted",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${styles[status]}`}>{t(statusKey[status])}</span>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("Perlu Dikirim");
  const { t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto bg-seller-canvas">
      <TopBar placeholder={t("seller.searchOrdersBuyers")} />

      <div className="px-8 pb-10 pt-4">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-seller-ink">{t("seller.orderManagement")}</h1>
            <p className="mt-1 text-sm text-seller-muted">{t("seller.orderManagementSubtitle")}</p>
          </div>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-[#E4E8F1] bg-white px-4 py-2.5 text-sm font-semibold text-seller-ink">
            <Download size={16} /> {t("seller.exportData")}
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="mb-5 flex items-center gap-6 overflow-x-auto border-b border-[#EEF1F6]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 border-b-[3px] pb-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-seller-navy text-seller-navy"
                    : "border-transparent text-seller-muted hover:text-seller-ink"
                }`}
              >
                {t(tab.labelKey)}
                {tab.count ? (
                  <span className="rounded-full bg-seller-orange px-2 py-0.5 text-[11px] font-bold text-white">{tab.count}</span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button type="button" className="flex h-11 items-center gap-2 rounded-xl border border-[#E4E8F1] bg-[#F3F7FF] px-4 text-sm font-medium text-seller-ink">
              {t("seller.allCouriers")} <ChevronDown size={14} />
            </button>
            <button type="button" className="flex h-11 items-center gap-2 rounded-xl border border-[#E4E8F1] bg-[#F3F7FF] px-4 text-sm font-medium text-seller-ink">
              {t("seller.sortOldest")} <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-[#E8ECF3] p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-seller-muted">
                    <FileText size={14} />
                    <span className="font-medium text-seller-ink">{o.code}</span>
                    <span className="text-[#D0D5E0]">|</span>
                    {o.date}
                  </span>
                  <StatusPill status={o.status} />
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F4F6FA]">
                      <img src={o.imageSrc} alt="" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-seller-ink">{o.productName}</p>
                      <p className="text-sm text-seller-muted">Varian: {o.variant}</p>
                      <p className="text-sm text-seller-muted">
                        {o.qty}x {formatRupiah(o.unitPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full space-y-1.5 border-[#EEF1F6] text-sm text-seller-ink lg:w-64 lg:border-l lg:pl-5">
                    <p className="flex items-center gap-2">
                      <User size={14} className="text-seller-muted" /> {o.buyerName}
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck size={14} className="text-seller-muted" /> {o.courier}
                    </p>
                  </div>

                  <div className="flex w-full items-end justify-between gap-4 border-[#EEF1F6] lg:w-auto lg:flex-col lg:items-end lg:border-l lg:pl-5">
                    <div className="text-right">
                      <p className="text-xs text-seller-muted">Total Belanja</p>
                      <p className="text-base font-bold text-seller-ink">{formatRupiah(o.total)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="rounded-lg border border-[#E4E8F1] px-4 py-2 text-sm font-semibold text-seller-ink">
                        Cetak Label
                      </button>
                      {o.status === "PERLU DIPROSES" ? (
                        <button type="button" className="rounded-lg bg-seller-navy px-4 py-2 text-sm font-semibold text-white">
                          Proses
                        </button>
                      ) : (
                        <button type="button" className="rounded-lg bg-[#B45309] px-4 py-2 text-sm font-semibold text-white">
                          Atur Pick-up
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination summary="Menampilkan 1-2 dari 12 pesanan" />
        </div>
      </div>
    </div>
  );
}
