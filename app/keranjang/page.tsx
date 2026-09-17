"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Store,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

function skuFor(name: string) {
  return "SKU-" + name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toUpperCase();
}

export default function CartPage() {
  const { items, updateQty, removeItem, itemCount, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { t } = useLanguage();

  const productFee = items.reduce((acc, i) => acc + Math.round(i.price * 0.014), 0);
  const total = subtotal + productFee;

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
            <ShoppingCart className="h-12 w-12 text-brand-blue" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-navy-900">{t("cart.emptyTitle")}</h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            {t("cart.emptyDesc")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kategori/semua"
              className="rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {t("cart.startShopping")}
            </Link>
            <Link
              href="/flash-sale"
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50"
            >
              {t("cart.viewFlashSale")}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{t("cart.title")}</h1>
            <p className="mt-1 text-sm text-slate-500">
              {t("cart.productsChosen", { count: itemCount })}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" /> {t("cart.clear")}
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Daftar item */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
              <div className="border-b border-slate-100 bg-[#F4F6FA] px-5 py-3">
                <p className="text-sm font-semibold text-navy-900">
                  {t("cart.productList", { count: itemCount })}
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5 sm:gap-5 sm:p-5">
                    <Link
                      href={`/produk/${item.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        unoptimized
                        className="h-24 w-24 object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {item.badge && (
                            <span className="mb-1 inline-block rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                              {item.badge}
                            </span>
                          )}
                          <Link
                            href={`/produk/${item.id}`}
                            className="line-clamp-2 text-sm font-semibold text-navy-900 hover:text-brand-blue"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-slate-400">{skuFor(item.name)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={t("cart.removeItem")}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label={t("decreaseQty")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-navy-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label={t("increaseQty")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs text-slate-400">{t("cart.remaining", { count: item.stock })}</span>
                        </div>
                        <div className="text-right">
                          {item.originalPrice ? (
                            <p className="text-xs text-slate-400 line-through">
                              {formatRupiah(item.originalPrice * item.qty)}
                            </p>
                          ) : null}
                          <p className="text-sm font-bold text-navy-900">
                            {formatRupiah(item.price * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voucher & garansi */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Tag className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    {t("cart.voucherJavaTitle")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("cart.voucherJavaDesc")}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
                  <ShieldCheck className="h-4 w-4 shrink-0" /> {t("cart.officialWarrantyAll")}
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs font-medium text-blue-700">
                  <Truck className="h-4 w-4 shrink-0" /> {t("sameDayShipping")}
                </div>
              </div>
            </div>
          </div>

          {/* Ringkasan */}
          <div>
            <div className="sticky top-20 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-navy-900">{t("cart.summary")}</h2>

              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("cart.subtotalItems", { count: itemCount })}</span>
                  <span className="font-medium text-navy-900">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("cart.shipping")}</span>
                  <span className="font-medium text-emerald-600">{t("cart.shippingAtCheckout")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("cart.productServiceFee")}</span>
                  <span className="font-medium text-navy-900">{formatRupiah(productFee)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <span className="font-semibold text-navy-900">{t("cart.tempTotal")}</span>
                  <span className="text-lg font-bold text-brand-blue">{formatRupiah(total)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {t("cart.continueCheckout")} <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Store className="h-3.5 w-3.5" /> {t("cart.escrowNote")}
              </div>

              <div className="mt-3 text-center">
                <Link href="/kategori/semua" className="text-xs font-medium text-brand-blue hover:underline">
                  &larr; {t("cart.continueShopping")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}