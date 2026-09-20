"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductImage from "@/components/produk/ProductImage";
import { heroProducts, formatRupiah } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { applyLiveProducts, useLiveProducts } from "@/hooks/useLiveProducts";

const stats = [
  { value: "100rb+", label: "products" },
  { value: "5rb+", label: "verifiedSellers" },
  { value: "4.9★", label: "rating" },
];

export default function Hero() {
  const { t } = useLanguage();
  const live = useLiveProducts();
  const items = applyLiveProducts(heroProducts, live);
  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-brand-blue">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {t("electronicShopping")}
            <br />
            {t("originalTrusted")}
          </h1>
          <p className="mt-5 max-w-lg text-slate-300">
            {t("heroDescription")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/flash-sale"
              className="group flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-orange hover:text-white hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
            >
              {t("shopNow")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/kategori/semua"
              className="text-sm font-semibold text-white no-underline transition-colors duration-200 hover:text-brand-orange"
            >
              {t("exploreCategories")}
            </Link>
          </div>

          <div className="mt-10 flex gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-300">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur-sm">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/produk/${product.id}`}
              className="overflow-hidden rounded-xl bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
            >
              <div className="relative aspect-square w-full">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-xs font-medium text-slate-700">
                  {product.name}
                </p>
                <p className="mt-1 text-sm font-bold text-navy-900">
                  {formatRupiah(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
