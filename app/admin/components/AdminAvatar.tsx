"use client";

import { useLanguage } from "@/lib/i18n";

export default function AdminAvatar({ className = "h-9 w-9", src, alt }: { className?: string; src?: string | null; alt?: string }) {
  const { t } = useLanguage();
  const resolvedAlt = alt ?? t("admin.avatarAlt");

  if (src) {
    return <img src={src} alt={resolvedAlt} className={`rounded-full object-cover ${className}`} />;
  }

  return (
    <span className={`inline-flex overflow-hidden rounded-full bg-[#c9e4d4] ${className}`} aria-label={resolvedAlt}>
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <circle cx="32" cy="32" r="32" fill="#7EB089" />
        <ellipse cx="32" cy="38" rx="18" ry="16" fill="#A8D4B5" />
        <ellipse cx="32" cy="30" rx="14" ry="12" fill="#CDE8D6" />
        <circle cx="26" cy="28" r="3.2" fill="#1F2937" />
        <circle cx="38" cy="28" r="3.2" fill="#1F2937" />
        <path d="M22 27.5h8M34 27.5h8" stroke="#1F2937" strokeWidth="1.6" />
        <ellipse cx="32" cy="36" rx="4" ry="2.4" fill="#3F4A3A" />
      </svg>
    </span>
  );
}
