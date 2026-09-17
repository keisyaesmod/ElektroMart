"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Heart, Share2, MessageCircle, Check } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import type { Product } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function ProductActions({
  product,
  stock = 0,
}: {
  product?: Product;
  stock?: number;
}) {
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const { t } = useLanguage();

  const decrease = () => setQty((prev) => Math.max(1, prev - 1));
  const increase = () => setQty((prev) => Math.min(stock || prev + 1, prev + 1));
  const maxQty = stock || 1;

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        stock: product.stock ?? stock ?? 10,
        category: product.category,
        badge: product.badge,
      },
      qty
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        stock: product.stock ?? stock ?? 10,
        category: product.category,
        badge: product.badge,
      },
      qty
    );
    router.push("/checkout");
  };

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-navy-900">{t("product.qty")}</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={decrease}
            aria-label={t("decreaseQty")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold text-navy-900">
            {qty}
          </span>
          <button
            onClick={increase}
            aria-label={t("increaseQty")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="text-sm text-slate-400">{t("product.remainingUnits", { count: stock })}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={maxQty < qty}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${
            added
              ? "border-emerald-500 bg-emerald-50 text-emerald-600"
              : "border-brand-blue text-brand-blue hover:bg-blue-50"
          }`}
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? t("product.added") : t("cart")}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={maxQty < qty}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {t("product.buyNow")}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-5 text-sm">
        <button
          onClick={() => setWishlisted((prev) => !prev)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-red-500"
        >
          <Heart
            className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
          />
          {t("wishlist")}
        </button>
        <button className="flex items-center gap-1.5 text-slate-500 hover:text-navy-900">
          <Share2 className="h-4 w-4" />
          {t("product.share")}
        </button>
        <button className="ml-auto flex items-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200">
          <MessageCircle className="h-4 w-4" />
          Chat
        </button>
      </div>
    </div>
  );
}