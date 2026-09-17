"use client";

import { useState } from "react";
import { ArrowRight, Bold, ImageIcon, Italic, Link2, List, ListOrdered, Underline } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const cmsPages = ["FAQ (Tanya Jawab)", "Syarat Garansi", "Panduan Transaksi Aman"];

const faqContent = `1. Bagaimana cara melacak pesanan saya?
Anda dapat melacak pesanan melalui menu Pesanan Saya. Nomor resi akan diperbarui secara otomatis setelah penjual mengirim barang.

2. Apakah barang yang dijual bergaransi resmi?
Ya. Semua produk elektronik di ElektroMart dijual dengan Garansi Resmi sesuai ketentuan merek.

3. Bagaimana prosedur retur barang jika rusak saat diterima?
Laporkan dalam 2x24 jam dan lampirkan video unboxing. Tim kami akan meninjau klaim dan memproses retur jika sesuai kebijakan.`;

export default function AdminPengaturan() {
  const { t } = useLanguage();
  const [activeCms, setActiveCms] = useState(cmsPages[0]);
  const [title, setTitle] = useState("FAQ (Pertanyaan yang Sering Diajukan)");
  const [content, setContent] = useState(faqContent);

  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar placeholder={t("admin.searchDataProducts")} />
      <div className="px-8 pb-10 pt-7">
        <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.platformSettings")}</h1>
        <p className="mt-1 text-sm text-admin-muted">{t("admin.settingsSubtitle")}</p>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-admin-ink">{t("admin.cmsPolicySecurity")}</h2>
          <p className="mb-4 text-sm text-admin-muted">{t("admin.cmsSubtitle")}</p>
          <div className="grid grid-cols-1 gap-5 rounded-2xl bg-white p-5 shadow-card xl:grid-cols-3">
            <div className="space-y-2">
              {cmsPages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActiveCms(page)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium ${
                    activeCms === page ? "bg-[#E8F0FE] text-admin-navy" : "text-admin-ink hover:bg-[#F4F6FA]"
                  }`}
                >
                  {page}
                  {activeCms === page ? <ArrowRight size={14} /> : null}
                </button>
              ))}
            </div>
            <div className="xl:col-span-2">
              <div className="mb-3 flex gap-2 rounded-lg border border-[#E4E8F1] px-3 py-2 text-admin-muted">
                <Bold size={16} />
                <Italic size={16} />
                <Underline size={16} />
                <List size={16} />
                <ListOrdered size={16} />
                <Link2 size={16} />
                <ImageIcon size={16} />
              </div>
              <label className="mb-1.5 block text-sm font-semibold text-admin-ink">{t("admin.pageTitle")}</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4 h-11 w-full rounded-lg border border-[#E4E8F1] px-3 text-sm outline-none" />
              <label className="mb-1.5 block text-sm font-semibold text-admin-ink">{t("admin.content")}</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="mb-4 w-full rounded-lg border border-[#E4E8F1] px-3 py-2 text-sm leading-6 outline-none" />
              <div className="flex justify-end gap-3">
                <button type="button" className="rounded-xl border border-[#E4E8F1] px-4 py-2.5 text-sm font-semibold text-admin-ink">{t("admin.cancel")}</button>
                <button type="button" className="rounded-xl bg-admin-navy px-4 py-2.5 text-sm font-semibold text-white">{t("admin.saveChanges")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
