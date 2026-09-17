"use client";

import { brands } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Brands() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-navy-900">{t("famousBrands")}</h2>
      <p className="mt-1 text-sm text-slate-500">
        {t("brandShopping")}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {brands.map((brand) => (
          <a
            key={brand.name}
            href="#"
            className={`
              flex items-center justify-center 
              w-[110.8px] h-[55.2px] rounded-[16px]
              border border-slate-100 bg-white 
              px-2 py-1 text-sm font-semibold 
              shadow-sm transition hover:shadow-cardHover
              ${brand.color || "text-slate-700"}
              max-sm:w-[80px] max-sm:h-[44px] max-sm:rounded-[12px] max-sm:text-xs
            `}
          >
            {brand.name}
          </a>
        ))}
      </div>
    </section>
  );
}
