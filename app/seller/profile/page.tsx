"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Check, ImagePlus, Upload } from "lucide-react";
import TopBar from "../components/TopBar";
import { useLanguage } from "@/lib/i18n";

interface Schedule {
  dayKey: string;
  start: string;
  end: string;
  enabled: boolean;
}

const initialSchedule: Schedule[] = [
  { dayKey: "seller.dayMonday", start: "09:00 AM", end: "06:00 PM", enabled: true },
  { dayKey: "seller.dayTuesday", start: "09:00 AM", end: "06:00 PM", enabled: true },
  { dayKey: "seller.dayWednesday", start: "09:00 AM", end: "06:00 PM", enabled: true },
  { dayKey: "seller.dayThursday", start: "09:00 AM", end: "06:00 PM", enabled: true },
  { dayKey: "seller.dayFriday", start: "09:00 AM", end: "06:00 PM", enabled: true },
  { dayKey: "seller.daySaturday", start: "10:00 AM", end: "04:00 PM", enabled: true },
  { dayKey: "seller.daySunday", start: "10:00 AM", end: "04:00 PM", enabled: false },
];

const fieldClassName =
  "mt-2 h-10 w-full rounded-md border border-[#D8DFEC] bg-[#FAFBFE] px-3 text-[12px] text-seller-ink outline-none transition-colors focus:border-seller-navy focus:bg-white";

export default function SellerProfile() {
  const { t } = useLanguage();
  const [storeName, setStoreName] = useState("TechHaven Electronics");
  const [description, setDescription] = useState(t("seller.storeDescDefault"));
  const [logoName, setLogoName] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [schedule, setSchedule] = useState(initialSchedule);
  const [saved, setSaved] = useState(false);

  function selectFile(event: ChangeEvent<HTMLInputElement>, type: "logo" | "banner") {
    const fileName = event.target.files?.[0]?.name ?? "";
    if (type === "logo") setLogoName(fileName);
    else setBannerName(fileName);
  }

  function updateSchedule(index: number, key: "start" | "end" | "enabled", value: string | boolean) {
    setSchedule((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-seller-canvas">
      <TopBar placeholder={t("seller.searchOrdersProducts")} />

      <form onSubmit={handleSubmit} className="px-5 pb-10 pt-5 sm:px-8 sm:pt-6">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-6">
            <h1 className="text-[25px] font-bold tracking-tight text-seller-ink sm:text-[28px]">{t("seller.storeProfileSettings")}</h1>
            <p className="mt-1 text-[12px] text-seller-muted">{t("seller.storeProfileSubtitle")}</p>
          </div>

          <section className="mb-5 rounded-lg border border-[#DEE6F3] bg-white px-5 py-5 shadow-card sm:px-6">
            <h2 className="border-b border-[#E3E9F3] pb-3 text-[14px] font-semibold text-seller-ink">{t("seller.storeBasicInfo")}</h2>
            <div className="pt-4">
              <label htmlFor="store-name" className="text-[11px] font-semibold text-seller-ink">{t("auth.storeName")}</label>
              <input
                id="store-name"
                value={storeName}
                maxLength={50}
                onChange={(event) => setStoreName(event.target.value)}
                className={fieldClassName}
              />
              <p className="mt-1 text-right text-[10px] text-seller-muted">{storeName.length}/50</p>
            </div>
            <div className="mt-3">
              <label htmlFor="store-description" className="text-[11px] font-semibold text-seller-ink">{t("seller.storeDescription")}</label>
              <textarea
                id="store-description"
                value={description}
                maxLength={500}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-2 min-h-[68px] w-full resize-y rounded-md border border-[#D8DFEC] bg-[#FAFBFE] px-3 py-2 text-[12px] leading-5 text-seller-ink outline-none transition-colors focus:border-seller-navy focus:bg-white"
              />
              <p className="mt-1 text-right text-[10px] text-seller-muted">{description.length}/500</p>
            </div>
          </section>

          <section className="mb-5 rounded-lg border border-[#DEE6F3] bg-white px-5 py-5 shadow-card sm:px-6">
            <h2 className="border-b border-[#E3E9F3] pb-3 text-[14px] font-semibold text-seller-ink">{t("seller.storeBranding")}</h2>
            <div className="pt-4">
              <p className="text-[11px] font-semibold text-seller-ink">{t("seller.logoProfilePhoto")}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed border-[#AEBBD2] bg-[#DCE8FB] text-seller-navy">
                  <ImagePlus size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[11px] text-seller-muted">{t("seller.logoSizeHint")}</p>
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#B8CCF5] bg-[#EAF1FF] px-3 py-1.5 text-[11px] font-semibold text-seller-navy hover:bg-[#DCE8FB]">
                    <Upload size={13} /> {logoName || t("seller.choosePhoto")}
                    <input type="file" accept="image/png,image/jpeg,image/gif" className="sr-only" onChange={(event) => selectFile(event, "logo")} />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-semibold text-seller-ink">{t("seller.storeBanner")}</p>
              <label className="mt-2 flex min-h-[86px] cursor-pointer items-center justify-center rounded-md border border-dashed border-[#AEBBD2] bg-[#DCE8FB] text-[11px] text-seller-navy hover:bg-[#D4E2F9]">
                <span className="flex items-center gap-2"><Upload size={15} /> {bannerName || t("seller.uploadBanner")}</span>
                <input type="file" accept="image/png,image/jpeg,image/gif" className="sr-only" onChange={(event) => selectFile(event, "banner")} />
              </label>
              <p className="mt-2 text-[10px] text-seller-muted">{t("seller.bannerSizeHint")}</p>
            </div>
          </section>

          <section className="rounded-lg border border-[#DEE6F3] bg-white px-5 py-5 shadow-card sm:px-6">
            <h2 className="border-b border-[#E3E9F3] pb-3 text-[14px] font-semibold text-seller-ink">{t("seller.operatingHours")}</h2>
            <div className="divide-y divide-[#E7ECF4] pt-2">
              {schedule.map((item, index) => {
                const day = t(item.dayKey);
                return (
                <div key={item.dayKey} className="grid grid-cols-[1fr_auto] items-center gap-3 py-3 sm:grid-cols-[135px_1fr_44px]">
                  <span className="text-[11px] text-seller-ink">{day}</span>
                  <div className="flex items-center gap-2 sm:justify-start">
                    <input aria-label={`${day} ${t("seller.start")}`} value={item.start} onChange={(event) => updateSchedule(index, "start", event.target.value)} className="h-9 w-[92px] rounded-md border border-[#D8DFEC] bg-[#FAFBFE] px-2 text-[11px] text-seller-ink outline-none focus:border-seller-navy" />
                    <span className="text-[11px] text-seller-muted">-</span>
                    <input aria-label={`${day} ${t("seller.end")}`} value={item.end} onChange={(event) => updateSchedule(index, "end", event.target.value)} className="h-9 w-[92px] rounded-md border border-[#D8DFEC] bg-[#FAFBFE] px-2 text-[11px] text-seller-ink outline-none focus:border-seller-navy" />
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.enabled}
                    aria-label={`${day} ${item.enabled ? t("seller.dayActive") : t("seller.dayInactive")}`}
                    onClick={() => updateSchedule(index, "enabled", !item.enabled)}
                    className={`relative h-5 w-10 rounded-full transition-colors ${item.enabled ? "bg-seller-navy" : "bg-[#CBD3E0]"}`}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${item.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
                );
              })}
            </div>
          </section>

          <div className="mt-5 flex items-center justify-end gap-2">
            {saved && <span className="mr-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600"><Check size={14} /> {t("seller.changesSaved")}</span>}
            <button type="button" onClick={() => window.history.back()} className="rounded-md border border-[#D8DFEC] bg-white px-5 py-2 text-[11px] font-semibold text-seller-muted hover:bg-[#F8FAFD]">{t("admin.cancel")}</button>
            <button type="submit" className="rounded-md bg-seller-navy px-5 py-2 text-[11px] font-semibold text-white hover:bg-[#07164A]">{t("admin.saveChanges")}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
