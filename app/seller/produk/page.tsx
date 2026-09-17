"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import Pagination from "../components/Pagination";
import type { Product, ProductStatus } from "../types";

const products: Product[] = [
  {
    id: "1",
    name: "Laptop Gaming ROG Zephyrus G14",
    sku: "ROG-G14-2023",
    category: "Laptop & PC",
    price: 25500000,
    stock: 45,
    status: "Aktif",
    imageSrc: "/products/macbook-m3.svg",
  },
  {
    id: "2",
    name: "Smartphone Galaxy S24 Ultra 512GB",
    sku: "SG-24U-512-TI",
    category: "Smartphone",
    price: 21999000,
    stock: 120,
    status: "Aktif",
    imageSrc: "/products/samsung-s24.svg",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    sku: "SN-WH1000XM5-BLK",
    category: "Audio",
    price: 5250000,
    stock: 0,
    status: "Habis",
    imageSrc: "/products/sony-xm5.svg",
  },
];

const filters: { id: string; labelKey: string; count: number }[] = [
  { id: "Semua", labelKey: "all", count: 124 },
  { id: "Aktif", labelKey: "admin.active", count: 110 },
  { id: "Habis", labelKey: "seller.outOfStock", count: 10 },
  { id: "Draft", labelKey: "seller.draft", count: 4 },
];

const statusKey: Record<ProductStatus, string> = {
  Aktif: "admin.active",
  Habis: "seller.outOfStock",
  Draft: "seller.draft",
};

function formatRupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID");
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const { t } = useLanguage();
  const styles: Record<ProductStatus, string> = {
    Aktif: "bg-[#E8F0FE] text-[#2563EB]",
    Habis: "bg-[#FDECEC] text-[#E11D48]",
    Draft: "bg-[#EEF1F6] text-seller-muted",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{t(statusKey[status])}</span>;
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto bg-seller-canvas">
      <div className="px-8 pb-10 pt-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-seller-ink">{t("seller.productManagement")}</h1>
            <p className="mt-1 text-sm text-seller-muted">{t("seller.manageProductsSubtitle")}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/seller/produk/tambahproduk")}
            className="flex items-center gap-2 rounded-xl bg-seller-navy px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={16} /> {t("seller.addProduct")}
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-card">
          <div className="mb-5 flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeFilter === f.id
                      ? "bg-seller-navy text-white"
                      : "bg-[#F1F4F8] text-seller-ink hover:bg-[#E6EAF2]"
                  }`}
                >
                  {t(f.labelKey)} ({f.count})
                </button>
              ))}
            </div>

          <div className="overflow-hidden rounded-xl border border-[#EEF1F6]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#F4F6FA] text-[13px] text-seller-ink">
                  <th className="px-4 py-3 font-semibold">{t("products")}</th>
                  <th className="px-4 py-3 font-semibold">{t("categories")}</th>
                  <th className="px-4 py-3 font-semibold">{t("seller.price")}</th>
                  <th className="px-4 py-3 font-semibold">{t("seller.stock")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.status")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-[#F1F4F8]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-[#F4F6FA]">
                          <img src={p.imageSrc} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <p className="font-semibold text-seller-ink">{p.name}</p>
                          <p className="text-xs text-seller-muted">SKU: {p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 text-seller-ink/80">{p.category}</td>
                    <td className="px-4 font-semibold text-seller-ink">{formatRupiah(p.price)}</td>
                    <td className={`px-4 ${p.stock === 0 ? "font-semibold text-[#E11D48]" : "text-seller-ink/80"}`}>{p.stock}</td>
                    <td className="px-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4">
                      <button type="button" aria-label={`${t("seller.edit")} ${p.name}`} className="text-seller-muted hover:text-seller-ink">
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination summary={`${t("seller.showing")} 1-10 ${t("of")} 124 ${t("seller.products")}`} />
        </div>
      </div>
    </div>
  );
}
