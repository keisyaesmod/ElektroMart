"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { flashSaleProducts, uniqueProducts } from "@/lib/data";
import { FlashSaleCard } from "@/components/produk/ProductCard";
import { useLanguage } from "@/lib/i18n";

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return { hrs: pad(hrs), mins: pad(mins), secs: pad(secs) };
}

export default function FlashSale() {
  const { hrs, mins, secs } = useCountdown(7 * 3600 + 56 * 60 + 55);
  const { t } = useLanguage();

  return (
    <section id="flash-sale" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
          <div className="flex items-center gap-2 text-white">
            <Zap className="h-5 w-5 fill-white" />
            <h2 className="text-lg font-bold">{t("flashSale")}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <span>{t("endsIn")}</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="rounded bg-black/20 px-2 py-1">{hrs}</span>
              <span>:</span>
              <span className="rounded bg-black/20 px-2 py-1">{mins}</span>
              <span>:</span>
              <span className="rounded bg-black/20 px-2 py-1">{secs}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-6">
          {uniqueProducts(flashSaleProducts).map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
