"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function PromoBanners() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-brand-blue to-navy-900 p-8 text-white">
          <h3 className="text-xl font-bold">
            {t("voucherJava")}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-200">
            {t("voucherJavaDesc")}
          </p>
          <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-slate-100">
            {t("learnMore")}
          </button>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white">
          <h3 className="text-xl font-bold">{t("cashback")}</h3>
          <p className="mt-2 max-w-sm text-sm text-orange-50">
            {t("cashbackDesc")}
          </p>
          <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50">
            {t("getVoucher")}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy-900 px-8 py-8">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {t("startSelling")}
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            {t("startSellingDesc")}
          </p>
        </div>
        <Link
          href="/register-pembeli"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100"
        >
          {t("registerSeller")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
