"use client";

import Link from "next/link";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Zap,
  ShieldCheck,
  Truck,
  Tag,
  BadgeCheck,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";

type AuthMode = "login" | "buyer" | "seller";

interface AuthFeature {
  icon: ReactNode;
  label: string;
}

interface AuthStat {
  value: string;
  label: string;
}

function buildModeContent(
  mode: AuthMode,
  t: (key: string) => string
): { eyebrow: string; heroTitle: ReactNode; heroSubtitle: string; features: AuthFeature[]; stats: AuthStat[] } {
  if (mode === "login") {
    return {
      eyebrow: t("auth.loginEyebrow"),
      heroTitle: (
        <>
          {t("auth.loginHero1")}
          <br />
          {t("auth.loginHero2")}
          <br />
          {t("auth.loginHero3")}
        </>
      ),
      heroSubtitle: t("auth.loginHeroSubtitle"),
      features: [
        { icon: <ShieldCheck className="h-4 w-4" />, label: t("auth.featureSecureTx") },
        { icon: <Truck className="h-4 w-4" />, label: t("auth.featureFastShipping") },
        { icon: <Tag className="h-4 w-4" />, label: t("auth.featureBestPrice") },
      ],
      stats: [
        { value: "45.000+", label: t("auth.statActiveBuyers") },
        { value: "1.500+", label: t("auth.statSellers") },
        { value: "20+", label: t("categories") },
      ],
    };
  }

  if (mode === "buyer") {
    return {
      eyebrow: t("auth.eyebrowRegisterBuyer"),
      heroTitle: (
        <>
          {t("auth.buyerHero1")}
          <br />
          {t("auth.buyerHero2")}
          <br />
          {t("auth.buyerHero3")}
        </>
      ),
      heroSubtitle: t("auth.buyerHeroSubtitle"),
      features: [
        { icon: <BadgeCheck className="h-4 w-4" />, label: t("auth.featureOriginal") },
        { icon: <Truck className="h-4 w-4" />, label: t("auth.featureFastShipping") },
        { icon: <ShieldCheck className="h-4 w-4" />, label: t("auth.featureSafePayment") },
      ],
      stats: [
        { value: "45.000+", label: t("auth.statActiveBuyers") },
        { value: "20+", label: t("auth.statProductCategories") },
        { value: "1.000+", label: t("auth.statPromoProducts") },
      ],
    };
  }

  return {
    eyebrow: t("auth.eyebrowRegisterSeller"),
    heroTitle: (
      <>
        {t("auth.sellerHero1")}
        <br />
        {t("auth.sellerHero2")}
        <br />
        {t("auth.sellerHero3")}
      </>
    ),
    heroSubtitle: t("auth.sellerHeroSubtitle"),
    features: [
      { icon: <Store className="h-4 w-4" />, label: t("auth.featureFreeStore") },
      { icon: <TrendingUp className="h-4 w-4" />, label: t("auth.featureReachBuyers") },
      { icon: <Wallet className="h-4 w-4" />, label: t("auth.featureFastPayout") },
    ],
    stats: [
      { value: "1.500+", label: t("auth.statRegisteredSellers") },
      { value: "Rp 48M+", label: t("auth.statMonthlyGMV") },
      { value: "4.9", label: t("auth.statPlatformRating") },
    ],
  };
}

function getDefaultHeading(mode: AuthMode, t: (key: string) => string) {
  if (mode === "buyer") {
    return { heading: t("auth.headingRegister"), subtitle: t("auth.subtitleRegisterBuyer") };
  }
  if (mode === "seller") {
    return { heading: t("auth.headingRegister"), subtitle: t("auth.subtitleRegisterSeller") };
  }
  return { heading: t("auth.headingLogin"), subtitle: t("auth.subtitleLogin") };
}

interface AuthLayoutProps {
  mode: AuthMode;
  children: ReactNode;
  heading?: string;
  headingSubtitle?: string;
}

export default function AuthLayout({ mode, children, heading, headingSubtitle }: AuthLayoutProps) {
  const { t } = useLanguage();
  const content = buildModeContent(mode, t);
  const defaults = getDefaultHeading(mode, t);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* ===== Left Brand Panel ===== */}
      <div className="relative hidden w-[46%] flex-col justify-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-brand-blue p-10 lg:flex xl:p-14">
        {/* decorative */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute left-16 top-1/3 h-24 w-24 rounded-full border border-white/10" />

        {/* hero */}
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white xl:text-4xl">
            {content.heroTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            {content.heroSubtitle}
          </p>

          <ul className="mt-8 space-y-4">
            {content.features.map((f) => (
              <li key={f.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-orange ring-1 ring-white/15">
                  {f.icon}
                </span>
                <span className="text-sm font-medium leading-6 text-white/90">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* stats */}
        <div className="relative z-10 mt-12 flex gap-3">
          {content.stats.map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-extrabold text-white">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-medium text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Right Form Panel ===== */}
      <div className="relative flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="absolute right-4 top-4 sm:right-8 sm:top-6">
          <LanguageSwitcher variant="auth" />
        </div>
        <div className="w-full max-w-[460px]">
          {/* mobile logo */}
          <Link href="/beranda" className="mb-7 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue shadow-md shadow-brand-blue/30">
              <Zap className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-navy-900">ElektroMart</span>
          </Link>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-card sm:p-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">
              {heading ?? defaults.heading}
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              {headingSubtitle ?? defaults.subtitle}
            </p>
            <div className="mt-7">{children}</div>
          </div>

          <p className="mt-7 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ElektroMart &mdash; {t("auth.allRightsReserved")}
          </p>
        </div>
      </div>
    </div>
  );
}

const fieldBaseClasses =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
  rightIcon?: ReactNode;
}

export function AuthField({ label, icon, rightIcon, ...inputProps }: AuthFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-navy-900">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input {...inputProps} className={fieldBaseClasses} />
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightIcon}</span>
        )}
      </div>
    </div>
  );
}

export function RoleToggle({ active }: { active: "buyer" | "seller" }) {
  const { t } = useLanguage();
  const base =
    "flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition-colors";
  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      <Link
        href="/register-pembeli"
        className={`${base} ${
          active === "buyer"
            ? "bg-white text-brand-blue shadow-sm"
            : "text-slate-500 hover:text-navy-900"
        }`}
      >
        {t("auth.buyer")}
      </Link>
      <Link
        href="/register-penjual"
        className={`${base} ${
          active === "seller"
            ? "bg-white text-brand-blue shadow-sm"
            : "text-slate-500 hover:text-navy-900"
        }`}
      >
        {t("auth.seller")}
      </Link>
    </div>
  );
}