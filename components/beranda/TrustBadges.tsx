"use client";

import { ShieldCheck, BadgeCheck, Truck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: ShieldCheck,
      title: t("warrantyOriginal"),
      desc: t("warrantyDesc"),
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: BadgeCheck,
      title: t("original100"),
      desc: t("officialWarranty"),
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Truck,
      title: t("instantShipping"),
      desc: t("sameDayShipping"),
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 shadow-card"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${badge.color}`}
            >
              <badge.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-navy-900">{badge.title}</p>
              <p className="text-sm text-slate-500">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
