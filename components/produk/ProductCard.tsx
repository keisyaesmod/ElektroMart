"use client";

import Link from "next/link";
import ProductImage from "./ProductImage";
import { Star, MapPin, ShieldCheck } from "lucide-react";
import { Product, formatRupiah } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export function FlashSaleCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  const progress = product.soldOf
    ? Math.round(((product.sold ?? 0) / product.soldOf) * 100)
    : 0;

  return (
    <Link
      href={`/produk/${product.id}`}
      className="block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:shadow-cardHover"
    >
      <div className="relative aspect-square w-full">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover"
        />
        <span className="absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
          -{product.discountPercent}%
        </span>
        <span className="absolute right-2 top-2 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-navy-900">
          {t("flashSaleTag")}
        </span>
      </div>
      <div className="p-3">
        <p className="line-clamp-2 h-9 text-sm font-medium text-slate-700">
          {product.name}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-base font-bold text-red-600">
            {formatRupiah(product.price)}
          </p>
        </div>
        {product.originalPrice && (
          <p className="text-xs text-slate-400 line-through">
            {formatRupiah(product.originalPrice)}
          </p>
        )}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-400">
          {t("sold")} {product.sold} {t("of")} {product.soldOf}
        </p>
      </div>
    </Link>
  );
}

export function BestSellerCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  return (
    <Link
      href={`/produk/${product.id}`}
      className="block overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition hover:shadow-cardHover"
    >
      <div className="relative aspect-square w-full">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover"
        />
        {product.discountPercent && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white">
            -{product.discountPercent}%
          </span>
        )}
        <span className="absolute right-2 top-2 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {t("original")}
        </span>
      </div>
      <div className="p-3">
        <p className="line-clamp-2 h-9 text-sm font-medium text-slate-700">
          {product.name}
        </p>
        <p className="mt-2 text-base font-bold text-brand-blue">
          {formatRupiah(product.price)}
        </p>
        {product.originalPrice && (
          <p className="text-xs text-slate-400 line-through">
            {formatRupiah(product.originalPrice)}
          </p>
        )}
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-700">{product.rating}</span>
          <span>&middot;</span>
          <span>{product.sold} {t("soldCount")}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {product.location}
          </span>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </div>
      </div>
    </Link>
  );
}
