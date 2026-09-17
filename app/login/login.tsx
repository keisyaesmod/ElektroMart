"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/i18n";
import AuthLayout, { AuthField } from "@/components/auth/AuthLayout";

interface FormState {
  identitas: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [ingatSaya, setIngatSaya] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [form, setForm] = useState<FormState>({
    identitas: "",
    password: "",
  });

  const handleChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleForgotPassword = async () => {
    const email = form.identitas.trim();
    setForgotMessage("");

    if (!email || !email.includes("@")) {
      setForgotMessage(t("auth.forgotEmailFirst"));
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsSubmitting(false);

    if (error) {
      setForgotMessage(`${t("auth.resetLinkFailed")}${error.message}`);
      return;
    }

    setForgotMessage(t("auth.resetLinkSent"));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormComplete = Object.values(form).every((value) => value.trim() !== "");

    if (!isFormComplete) {
      alert(t("auth.alertFillCredentials"));
      return;
    }

    setIsSubmitting(true);
    const identifier = form.identitas.trim();
    const { data, error } = await supabase.auth.signInWithPassword({
      ...(identifier.includes("@") ? { email: identifier } : { phone: identifier }),
      password: form.password,
    });

    if (error || !data.user) {
      setIsSubmitting(false);
      alert(`${t("auth.loginFailed")}${error?.message ?? t("auth.accountNotFound")}`);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    setIsSubmitting(false);
    if (profileError) {
      alert(`${t("auth.loginSuccessProfileReadFail")}${profileError.message}`);
      return;
    }

    const role = profile?.role ?? data.user.user_metadata?.role ?? "buyer";
    const isAdmin = role === "admin" || data.user.email === "esmodkeisya@gmail.com";

    if (!profile) {
      const metadata = data.user.user_metadata ?? {};
      const { error: createProfileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        role,
        full_name: metadata.full_name ?? null,
        store_name: metadata.store_name ?? null,
        phone: metadata.phone ?? null,
        store_address: metadata.store_address ?? null,
        job_title: metadata.job_title ?? null,
      });

      if (createProfileError) {
        alert(`${t("auth.loginSuccessProfileUnavailable")}${createProfileError.message}`);
        return;
      }
    }

    if (isAdmin) {
      router.push("/admin/dashboard");
    } else if (role === "seller") {
      router.push("/seller/produk/tambahproduk");
    } else {
      router.push("/beranda");
    }
  };

  return (
    <AuthLayout mode="login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label={t("auth.emailPhone")}
          icon={<Mail className="h-[18px] w-[18px]" />}
          placeholder={t("auth.placeholderEmailPhone")}
          type="text"
          value={form.identitas}
          onChange={handleChange("identitas")}
        />

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[13px] font-semibold text-navy-900">{t("auth.password")}</label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isSubmitting}
              className="text-[12.5px] font-semibold text-brand-blue transition-colors hover:text-navy-900 disabled:opacity-60"
            >
              {isSubmitting ? t("auth.sending") : t("auth.forgotPassword")}
            </button>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock className="h-[18px] w-[18px]" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.placeholderPassword")}
              value={form.password}
              onChange={handleChange("password")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={t("auth.togglePasswordVisibility")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-navy-900"
            >
              {showPassword ? (
                <EyeOff className="h-[18px] w-[18px]" />
              ) : (
                <Eye className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-slate-600">
          <input
            type="checkbox"
            checked={ingatSaya}
            onChange={(e) => setIngatSaya(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded accent-brand-blue"
          />
          {t("auth.rememberMe")}
        </label>

        {forgotMessage ? (
          <p className="rounded-lg bg-emerald-50 px-3.5 py-2.5 text-xs font-medium text-emerald-600">
            {forgotMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/25 transition-all hover:bg-navy-900 hover:shadow-xl hover:shadow-navy-900/25 disabled:opacity-60"
        >
          {isSubmitting ? t("auth.processing") : t("login")}
          {!isSubmitting && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">{t("auth.orContinueWith")}</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            <GoogleIcon /> Google
          </button>
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            <AppleIcon /> Apple
          </button>
        </div>

        <p className="pt-1 text-center text-sm text-slate-500">
          {t("auth.noAccount")}{" "}
          <a
            href="/register-pembeli"
            onClick={(e) => {
              e.preventDefault();
              router.push("/register-pembeli");
            }}
            className="font-bold text-brand-blue transition-colors hover:text-navy-900"
          >
            {t("registerNow")}
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.2-2 13.9-5.4l-6.4-5.4C29.4 34.8 26.8 36 24 36c-5.3 0-9.9-3.1-11.3-7.9l-6.5 5C9.4 39.6 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.9 2.5-2.5 4.6-4.6 6.1l6.4 5.4C40.1 36.8 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 384 512" fill="#111827">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C64.5 141 8 184.9 8 274.1c0 26.3 4.8 53.5 14.4 81.5 12.8 37.3 59 128.8 107.3 127.3 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.7-.7 90.6-83.9 102.8-121.3-65.3-30.8-65.6-90.2-65.6-92.9zM254.4 88.9c26.7-31.8 24.3-60.8 23.6-71.2-23.7 1.4-51.2 16.4-67 34.9-17.4 19.8-27.6 44.4-25.5 70.5 24.9 1.9 47.9-11.2 68.9-34.2z" />
    </svg>
  );
}