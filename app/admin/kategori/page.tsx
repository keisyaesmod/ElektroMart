"use client";

import { useState } from "react";
import { Filter, Laptop, List, PlusCircle, Smartphone, Watch } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const categories = [
  { name: "Smartphone", icon: Smartphone, color: "#3B82F6", sub: 8, attrs: ["RAM", "Storage", "OS"] },
  { name: "Laptop", icon: Laptop, color: "#8B5CF6", sub: 12, attrs: ["Processor", "RAM", "GPU"] },
  { name: "Smart Watch", icon: Watch, color: "#10B981", sub: 4, attrs: ["Connectivity", "Battery Life"] },
];

export default function AdminKategori() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#F59E0B");
  const [subs, setSubs] = useState("");

  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar placeholder={t("admin.searchCategories")} />
      <div className="px-8 pb-10 pt-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.manageGadgetCategories")}</h1>
            <p className="mt-1 text-sm text-admin-muted">{t("admin.categoriesSubtitle")}</p>
          </div>
          <button type="button" className="rounded-xl bg-admin-navy px-4 py-2.5 text-sm font-semibold text-white">
            {t("admin.addNewCategory")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-card xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold text-admin-ink">
                <List size={16} /> {t("admin.parentCategoryList")}
              </h2>
              <button type="button" className="flex items-center gap-1.5 text-sm font-medium text-admin-muted">
                <Filter size={14} /> {t("admin.filter")}
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#EEF1F6]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F4F6FA] text-[11px] uppercase tracking-wide text-admin-muted">
                    <th className="px-4 py-3 font-semibold">{t("admin.categoryName")}</th>
                    <th className="px-4 py-3 font-semibold">{t("admin.identityColor")}</th>
                    <th className="px-4 py-3 font-semibold">{t("admin.subCategory")}</th>
                    <th className="px-4 py-3 font-semibold">{t("admin.requiredAttributes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => {
                    const Icon = c.icon;
                    return (
                      <tr key={c.name} className="border-t border-[#F1F4F8]">
                        <td className="px-4 py-4">
                          <span className="flex items-center gap-2 font-semibold text-admin-ink">
                            <Icon size={16} className="text-admin-muted" /> {c.name}
                          </span>
                        </td>
                        <td className="px-4">
                          <span className="flex items-center gap-2 text-admin-ink">
                            <span className="h-3.5 w-3.5 rounded-full" style={{ background: c.color }} />
                            {c.color}
                          </span>
                        </td>
                        <td className="px-4">
                          <span className="rounded-full bg-[#E8F0FE] px-2.5 py-1 text-xs font-semibold text-[#2563EB]">{c.sub}</span>
                        </td>
                        <td className="px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {c.attrs.map((a) => (
                              <span key={a} className="rounded-md bg-admin-navy px-2 py-0.5 text-[11px] font-semibold text-white">
                                {a}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-[13px] text-admin-muted">
              <span>{t("admin.showingCategories")}</span>
              <div className="flex gap-1.5">
                <button type="button" className="h-8 w-8 rounded-lg border border-[#E4E8F1]">‹</button>
                <button type="button" className="h-8 w-8 rounded-lg bg-admin-navy text-white">1</button>
                <button type="button" className="h-8 w-8 rounded-lg border border-[#E4E8F1]">2</button>
                <button type="button" className="h-8 w-8 rounded-lg border border-[#E4E8F1]">›</button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-admin-ink">
              <PlusCircle size={18} className="text-admin-accent" /> {t("admin.quickAddCategory")}
            </h2>
            <label className="mb-1.5 block text-sm font-semibold text-admin-ink">{t("admin.parentCategoryName")}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("admin.categoryNamePlaceholder")} className="mb-4 h-11 w-full rounded-lg border border-[#E4E8F1] px-3 text-sm outline-none" />
            <label className="mb-1.5 block text-sm font-semibold text-admin-ink">{t("admin.identityColorChart")}</label>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-11 w-11 rounded-lg border border-[#E4E8F1]" style={{ background: color }} />
              <input value={color} onChange={(e) => setColor(e.target.value)} className="h-11 flex-1 rounded-lg border border-[#E4E8F1] px-3 text-sm outline-none" />
            </div>
            <label className="mb-1.5 block text-sm font-semibold text-admin-ink">{t("admin.initialSubCategory")}</label>
            <textarea value={subs} onChange={(e) => setSubs(e.target.value)} rows={4} placeholder={t("admin.subCategoryPlaceholder")} className="mb-5 w-full rounded-lg border border-[#E4E8F1] px-3 py-2 text-sm outline-none" />
            <button type="button" className="w-full rounded-xl bg-admin-accent py-3 text-sm font-semibold text-white">
              {t("admin.saveCategory")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
