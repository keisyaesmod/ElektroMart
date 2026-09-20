"use client";

import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SellerAvatar from "./SellerAvatar";

interface TopBarProps {
  placeholder?: string;
  variant?: "bar" | "inline";
}

export default function TopBar({ variant = "bar" }: TopBarProps) {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <header
      className={
        variant === "inline"
          ? "flex items-center justify-end gap-3"
          : "flex items-center justify-end gap-4 px-8 pb-1 pt-6"
      }
    >
      <LanguageSwitcher variant="light" />
      <button
        type="button"
        onClick={() => router.push("/seller/laporan")}
        aria-label={t("report.notifications")}
        className="relative text-seller-ink"
      >
        <Bell size={20} strokeWidth={1.7} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-seller-orange" />
      </button>
      <button type="button" onClick={() => router.push("/seller/profile")} aria-label={t("seller.openStoreProfile")}>
        <SellerAvatar />
      </button>
    </header>
  );
}