"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutGrid, Layers, Store, Users, Wallet, Settings, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

const pagesWithOwnShell = [
  "/admin/dashboard",
  "/admin/keuangansaldo",
  "/admin/laporanpengguna",
  "/admin/manajemenbuyer",
  "/admin/manajemenkategori",
  "/admin/manajemenseller",
  "/admin/pengaturanplatform",
  "/admin/profiladmin",
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const pageHasOwnShell = pagesWithOwnShell.some((page) => pathname === page || pathname.startsWith(`${page}/`));
  const navigation = [
    { href: "/admin/dashboard", label: t("dashboard"), icon: LayoutGrid },
    { href: "/admin/kategori", label: t("admin.manageCategories"), icon: Layers },
    { href: "/admin/seller", label: t("admin.manageSellers"), icon: Store },
    { href: "/admin/buyer", label: t("admin.manageBuyers"), icon: Users },
    { href: "/admin/keuangan", label: t("admin.financeBalance"), icon: Wallet },
    { href: "/admin/pengaturan", label: t("admin.platformSettings"), icon: Settings },
  ];

  return (
    <div className={`${inter.className} flex min-h-screen bg-admin-canvas`}>
      <aside className={`${pageHasOwnShell ? "hidden" : "hidden md:flex"} sticky top-0 h-screen w-[248px] shrink-0 flex-col bg-admin-navy px-4 py-6 text-white`}>
        <Link href="/admin/dashboard" className="mb-10 block px-3">
          <span className="block text-[20px] font-bold leading-tight tracking-tight">ElektroMart</span>
          <span className="mt-1 block text-[12px] font-medium text-white/55">{t("admin.adminDashboard")}</span>
        </Link>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                  active ? "bg-admin-accent text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4">
          <Link href="/beranda" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/75 hover:bg-white/10 hover:text-white">
            <Home size={18} strokeWidth={1.8} /> {t("admin.backHome")}
          </Link>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
