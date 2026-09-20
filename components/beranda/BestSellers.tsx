"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { bestSellerProducts, uniqueProducts } from "@/lib/data";
import { BestSellerCard } from "@/components/produk/ProductCard";
import { useLanguage } from "@/lib/i18n";

export default function BestSellers() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
            <TrendingUp className="h-5 w-5 text-red-500" />
            {t("bestSellers")}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {t("mostPurchased")}
          </p>
        </div>
        <Link
          href="/kategori/semua"
          className="hidden items-center gap-1 text-sm font-semibold text-brand-blue hover:underline sm:flex"
        >
          {t("viewAll")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {uniqueProducts(bestSellerProducts).slice(0, 6).map((product) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
