"use client";

import { ChevronDown, Eye, FileText, Hourglass, ShieldAlert, CircleCheck } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

const reports = [
  { id: "#REP-88321", name: "Budi Santoso", role: "Buyer", initials: "BS", color: "bg-[#2563EB]", subject: "Barang Rusak Saat Diterima", date: "24 Okt 2023, 14:30", status: "Baru" },
  { id: "#REP-88320", name: "Toko Elektronik Maju", role: "Seller", initials: "TE", color: "bg-[#0F766E]", subject: "Indikasi Pembeli Fiktif", date: "24 Okt 2023, 10:15", status: "Proses" },
  { id: "#REP-88315", name: "Andi Wijaya", role: "Buyer", initials: "AW", color: "bg-[#7C3AED]", subject: "Barang Tidak Sesuai Deskripsi", date: "23 Okt 2023, 16:45", status: "Selesai" },
  { id: "#REP-88310", name: "Sinar Techindo", role: "Seller", initials: "ST", color: "bg-[#C2410C]", subject: "Kendala Pencairan Dana", date: "23 Okt 2023, 09:20", status: "Selesai" },
];

const stats = [
  { label: "Total Laporan", value: "1,248", icon: FileText, wrap: "bg-[#DBEAFE] text-[#2563EB]" },
  { label: "Laporan Baru", value: "42", icon: ShieldAlert, wrap: "bg-[#FDECEC] text-[#E11D48]" },
  { label: "Sedang Diproses", value: "18", icon: Hourglass, wrap: "bg-[#FFEDD5] text-[#C2410C]" },
  { label: "Selesai", value: "1,188", icon: CircleCheck, wrap: "bg-[#E0F2FE] text-[#0284C7]" },
];

function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguage();
  const styles: Record<string, string> = {
    Baru: "bg-[#FDECEC] text-[#E11D48]",
    Proses: "bg-[#FFEDD5] text-[#C2410C]",
    Selesai: "bg-[#E8F0FE] text-[#2563EB]",
  };
  const labels: Record<string, string> = {
    Baru: t("admin.new"),
    Proses: t("admin.inProgress"),
    Selesai: t("admin.done"),
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>{labels[status] ?? status}</span>;
}

export default function AdminLaporan() {
  const { t } = useLanguage();
  const statLabels: Record<string, string> = {
    "Total Laporan": t("admin.totalReports"),
    "Laporan Baru": t("admin.newReports"),
    "Sedang Diproses": t("admin.inProgress"),
    Selesai: t("admin.done"),
  };
  return (
    <div className="min-h-full bg-admin-canvas">
      <TopBar breadcrumb={t("admin.userReports")} />
      <div className="px-8 pb-10 pt-7">
        <h1 className="text-[28px] font-bold tracking-tight text-admin-ink">{t("admin.reportManagement")}</h1>
        <p className="mt-1 text-sm text-admin-muted">{t("admin.reportsSubtitle")}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl bg-white p-5 shadow-card">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.wrap}`}>
                  <Icon size={18} />
                </div>
                <p className="text-sm text-admin-muted">{statLabels[s.label] ?? s.label}</p>
                <p className="mt-1 text-2xl font-bold text-admin-ink">{s.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
          <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
            <div className="flex gap-2">
              <button type="button" className="flex h-11 items-center gap-2 rounded-xl border border-[#E4E8F1] px-4 text-sm font-medium">
                {t("admin.allStatus")} <ChevronDown size={14} />
              </button>
              <button type="button" className="flex h-11 items-center gap-2 rounded-xl border border-[#E4E8F1] px-4 text-sm font-medium">
                {t("admin.allTypes")} <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#EEF1F6]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#EEF3FA] text-[13px] text-admin-ink">
                  <th className="px-4 py-3 font-semibold">{t("admin.reportId")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.reporter")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.subject")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.date")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.status")}</th>
                  <th className="px-4 py-3 font-semibold">{t("admin.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-t border-[#F1F4F8]">
                    <td className="px-4 py-4 font-semibold text-admin-ink">{r.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ${r.color}`}>{r.initials}</span>
                        <div>
                          <p className="font-semibold text-admin-ink">{r.name}</p>
                          <p className="text-xs text-admin-muted">{r.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 text-admin-ink">{r.subject}</td>
                    <td className="px-4 text-admin-muted">{r.date}</td>
                    <td className="px-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4">
                      <button type="button" aria-label={`${t("admin.view")} ${r.id}`} className="text-admin-muted">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm text-admin-muted">
            <span>{t("admin.showingReports")}</span>
            <div className="flex gap-2">
              <button type="button" className="rounded-lg border border-[#E4E8F1] px-4 py-2 text-admin-ink">{t("admin.previous")}</button>
              <button type="button" className="rounded-lg border border-[#E4E8F1] px-4 py-2 text-admin-ink">{t("admin.next")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
