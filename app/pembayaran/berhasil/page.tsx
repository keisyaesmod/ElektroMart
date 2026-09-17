"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronRight,
  Package,
  Truck,
  Clock,
  ShieldCheck,
  ReceiptText,
  MapPin,
  Home,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/data";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { checkoutDetail } = useCart();
  const [countdown, setCountdown] = useState(10);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!checkoutDetail) {
      router.replace("/beranda");
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/beranda");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [checkoutDetail, router]);

  useEffect(() => {
    const approved = [
      "Pembayaran kamu telah kami terima. Pesanan sedang disiapkan sebelum dikirim!",
      "Pembayaran berhasil! Seller sedang memproses pesanan kamu.",
      "Terima kasih! Pembayaran kamu sudah dikonfirmasi dan pesanan segera diproses.",
    ];
    setNote(approved[Math.floor(Math.random() * approved.length)]);
  }, []);

  if (!checkoutDetail) return null;
  const detail = checkoutDetail;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Sukses header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-navy-900">
            Pembayaran Berhasil!
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">{note}</p>
          <p className="mt-1 text-xs text-slate-400">
            No. Pesanan:{" "}
            <span className="font-semibold text-navy-900">{detail.orderId}</span>
          </p>
        </div>

        {/* Auto redirect */}
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-400 shadow-card">
          <Clock className="h-3.5 w-3.5" />
          Kamu akan diarahkan ke Beranda dalam{" "}
          <span className="font-bold text-navy-900">{countdown} detik</span>…
        </div>

        {/* Detail pesanan */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <ReceiptText className="h-4 w-4 text-brand-blue" />
            <h2 className="text-sm font-semibold text-navy-900">Ringkasan Pesanan</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {detail.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-12 w-12 rounded-lg border border-slate-100 object-cover"
                />
                <p className="line-clamp-2 flex-1 text-xs font-medium text-navy-900">
                  {item.name}
                </p>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{item.qty}×</p>
                  <p className="text-xs font-semibold text-navy-900">
                    {formatRupiah(item.price * item.qty)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-navy-900">
                {formatRupiah(detail.subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ongkir ({detail.courier})</span>
              <span className="font-medium text-navy-900">
                {detail.shippingFee > 0 ? formatRupiah(detail.shippingFee) : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Asuransi pengiriman</span>
              <span className="font-medium text-navy-900">
                {formatRupiah(detail.insuranceFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <span className="font-semibold text-navy-900">Total Dibayar</span>
              <span className="text-lg font-bold text-brand-blue">
                {formatRupiah(detail.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Status timeline */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatusCard
            icon={Package}
            color="text-blue-600"
            bg="bg-blue-50"
            title="Pesanan Dibuat"
            desc="Sedang menunggu diproses seller"
            done
          />
          <StatusCard
            icon={Truck}
            color="text-amber-600"
            bg="bg-amber-50"
            title="Sedang Dikirim"
            desc="Menunggu seller mengirim barang"
          />
          <StatusCard
            icon={Home}
            color="text-emerald-600"
            bg="bg-emerald-50"
            title="Pesanan Sampai"
            desc="Estimasi 1-3 hari kerja"
          />
        </div>

        {/* Alamat & metode */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-blue" />
              <p className="text-sm font-semibold text-navy-900">Alamat Pengiriman</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              {detail.address}
            </p>
            <p className="mt-1 text-xs text-slate-400">via {detail.courier}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-blue" />
              <p className="text-sm font-semibold text-navy-900">Pembayaran</p>
            </div>
            <p className="mt-3 text-xs font-medium text-navy-900">
              {detail.paymentMethod}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Dana ditahan ElektroMart hingga pesanan kamu terima.
            </p>
          </div>
        </div>

        {/* Aksi */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/kategori/semua"
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Lanjut Belanja <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/bantuan"
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-50"
          >
            Lacak Pesanan
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}

function StatusCard({
  icon: Icon,
  title,
  desc,
  color,
  bg,
  done = false,
}: {
  icon: typeof Package;
  title: string;
  desc: string;
  color: string;
  bg: string;
  done?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-card ${
        done ? "border-emerald-100 bg-emerald-50/50" : "border-slate-100 bg-white"
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="mt-3 text-sm font-semibold text-navy-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{desc}</p>
    </div>
  );
}