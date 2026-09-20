"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FlashSaleCard } from "@/components/produk/ProductCard";
import { flashSaleProducts } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function FlashSalePageClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
            <Zap className="h-7 w-7 fill-white text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900">{t("flashSale")}</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {t("flashSaleDescription")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {flashSaleProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-100 bg-white px-6 py-10 text-center shadow-card">
          <p className="text-sm text-slate-600 sm:text-base">
            {t("nextFlashSale")}
          </p>
          <Link
            href="/register-pembeli"
            className="mt-5 inline-block rounded-lg bg-brand-blue px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue/90"
          >
            {t("registerNow")}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
