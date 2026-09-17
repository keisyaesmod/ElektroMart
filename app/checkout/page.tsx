"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronRight,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Truck,
  Landmark,
  Wallet,
  QrCode,
  Clock,
  Package,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, type CheckoutDetail } from "@/lib/CartContext";
import { formatRupiah } from "@/lib/data";

type Courier = {
  name: string;
  eta: string;
  price: number;
  logo: string;
};

const couriers: Courier[] = [
  { name: "JNE Reguler", eta: "2-3 hari", price: 25000, logo: "JNE" },
  { name: "J&T Express", eta: "2-3 hari", price: 22000, logo: "J&T" },
  { name: "SiCepat REG", eta: "1-2 hari", price: 26000, logo: "SiCepat" },
  { name: "AnterAja", eta: "2-3 hari", price: 21000, logo: "AnterAja" },
  { name: "GoSend Same Day", eta: "Hari ini", price: 35000, logo: "GoSend" },
];

const paymentGroups = [
  {
    group: "bank" as const,
    title: "Transfer Bank",
    note: "Bayar lewat aplikasi mobile banking / internet banking",
    icon: Landmark,
    methods: [
      { name: "BCA Virtual Account", short: "BCA" },
      { name: "BNI Virtual Account", short: "BNI" },
      { name: "BRI Virtual Account", short: "BRI" },
      { name: "Mandiri Virtual Account", short: "Mandiri" },
    ],
  },
  {
    group: "ewallet" as const,
    title: "E-Wallet",
    note: "Bayar langsung dari aplikasi dompet digital",
    icon: Wallet,
    methods: [
      { name: "DANA", short: "DANA" },
      { name: "GoPay", short: "GoPay" },
      { name: "OVO", short: "OVO" },
    ],
  },
  {
    group: "qris" as const,
    title: "QRIS",
    note: "Scan sekali untuk semua aplikasi pembayaran",
    icon: QrCode,
    methods: [{ name: "QRIS", short: "QRIS" }],
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, setCheckoutDetail } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("Jawa Timur");
  const [postal, setPostal] = useState("");
  const [currentLocation, setCurrentLocation] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);
  const [paymentGroup, setPaymentGroup] = useState<"bank" | "ewallet" | "qris">("bank");
  const [selectedMethod, setSelectedMethod] = useState<string>("BCA Virtual Account");

  const [checked, setChecked] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const productFee = items.reduce((acc, i) => acc + Math.round(i.price * 0.014), 0);
  const insuranceFee = items.reduce((acc, i) => acc + Math.min(5000, Math.max(2000, Math.round(i.price * i.qty * 0.002))), 0);
  const shippingFee = selectedCourier?.price ?? 0;
  const total = subtotal + productFee + insuranceFee + shippingFee;

  const activePayment =
    paymentGroups
      .find((g) => g.group === paymentGroup)
      ?.methods.find((m) => m.name === selectedMethod) ??
    paymentGroups[0].methods[0];

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-navy-900">Keranjang Masih Kosong</h1>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Tambahkan produk dulu ke keranjang sebelum melanjutkan ke pembayaran.
          </p>
          <Link
            href="/kategori/semua"
            className="mt-8 rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Mulai Belanja
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Lengkapi dulu alamat pengiriman (nama, telepon, alamat, dan kota).");
      return;
    }
    if (!selectedCourier) {
      setError("Pilih jasa pengiriman terlebih dahulu.");
      return;
    }
    if (!checked) {
      setError("Pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (!agree) {
      setError("Centang persetujuan memori transaksi terlebih dahulu.");
      return;
    }

    const orderId = "EM-" + Date.now().toString().slice(-9);
    const detail: CheckoutDetail = {
      orderId,
      items,
      subtotal,
      shippingFee,
      insuranceFee,
      total,
      paymentMethod: activePayment.name,
      paymentGroup,
      courier: selectedCourier.name,
      address: `${address}, ${city}, ${province} ${postal}`,
      city,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      status: "MENUNGGU PEMBAYARAN",
    };

    setCheckoutDetail(detail);
    router.push("/pembayaran");
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stepper */}
        <div className="flex items-center gap-2 text-sm">
          <StepDone label="Keranjang" />
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <StepActive label="Checkout" current={2} total={3} />
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <StepPending label="Pembayaran" />
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <StepPending label="Selesai" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-navy-900">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            {/* 1. Alamat pengiriman */}
            <section className="rounded-2xl border border-slate-100 bg-white shadow-card">
              <header className="flex items-center gap-2 border-b border-slate-100 bg-[#F4F6FA] px-5 py-3">
                <MapPin className="h-4 w-4 text-brand-blue" />
                <h2 className="text-sm font-semibold text-navy-900">1. Alamat Pengiriman</h2>
              </header>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nama Penerima">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama lengkap"
                      className="input-em"
                    />
                  </Field>
                  <Field label="No. Telepon / HP">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="input-em"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Alamat Lengkap">
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                        rows={2}
                        className="input-em resize-none"
                      />
                    </Field>
                  </div>
                  <Field label="Kota/Kabupaten">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Contoh: Surabaya"
                      className="input-em"
                    />
                  </Field>
                  <Field label="Provinsi">
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="input-em"
                    >
                      {["Jawa Timur", "Jawa Barat", "Jawa Tengah", "DKI Jakarta", "Banten", "DI Yogyakarta", "Bali", "Sumatera Utara", "Riau", "Kalimantan Timur", "Sulawesi Selatan", "Papua"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Kode Pos">
                    <input
                      type="text"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      placeholder="00000"
                      className="input-em"
                    />
                  </Field>
                  <Field label="Catatan untuk Kurir (opsional)">
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Titip ke satpam"
                      className="input-em"
                    />
                  </Field>
                </div>

                <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-brand-blue"
                  />
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-blue" /> Gunakan lokasi saya saat ini
                  </span>
                </label>
              </div>
            </section>

            {/* 2. Jasa pengiriman */}
            <section className="rounded-2xl border border-slate-100 bg-white shadow-card">
              <header className="flex items-center gap-2 border-b border-slate-100 bg-[#F4F6FA] px-5 py-3">
                <Truck className="h-4 w-4 text-brand-blue" />
                <h2 className="text-sm font-semibold text-navy-900">2. Jasa Pengiriman</h2>
              </header>
              <div className="p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {couriers.map((courier) => {
                    const active = selectedCourier?.name === courier.name;
                    return (
                      <button
                        key={courier.name}
                        type="button"
                        onClick={() => setSelectedCourier(courier)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                          active
                            ? "border-brand-blue bg-blue-50/60"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                            active ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {courier.logo}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-navy-900">
                            {courier.name}
                          </span>
                          <span className="block text-xs text-slate-400">{courier.eta}</span>
                        </span>
                        <span className="text-sm font-semibold text-navy-900">
                          {formatRupiah(courier.price)}
                        </span>
                        {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. Metode pembayaran */}
            <section className="rounded-2xl border border-slate-100 bg-white shadow-card">
              <header className="flex items-center gap-2 border-b border-slate-100 bg-[#F4F6FA] px-5 py-3">
                <CreditCard className="h-4 w-4 text-brand-blue" />
                <h2 className="text-sm font-semibold text-navy-900">3. Metode Pembayaran</h2>
              </header>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {paymentGroups.map((g) => {
                    const GroupIcon = g.icon;
                    const active = paymentGroup === g.group;
                    return (
                      <button
                        key={g.group}
                        type="button"
                        onClick={() => {
                          setPaymentGroup(g.group);
                          setSelectedMethod(g.methods[0].name);
                          setChecked(false);
                        }}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-brand-blue text-white"
                            : "bg-[#F4F6FA] text-navy-900 hover:bg-slate-200"
                        }`}
                      >
                        <GroupIcon className="h-4 w-4" />
                        {g.title}
                      </button>
                    );
                  })}
                </div>

                {/* Daftar metode */}
                <div className="mt-4 space-y-2.5">
                  {paymentGroups
                    .find((g) => g.group === paymentGroup)
                    ?.methods.map((m) => {
                      const active = selectedMethod === m.name && checked;
                      return (
                        <button
                          key={m.name}
                          type="button"
                          onClick={() => {
                            setSelectedMethod(m.name);
                            setChecked(true);
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                            active
                              ? "border-brand-blue bg-blue-50/60"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-14 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                              m.short === "QRIS"
                                ? "bg-red-600"
                                : m.short === "GoPay"
                                ? "bg-blue-600"
                                : m.short === "OVO"
                                ? "bg-purple-600"
                                : paymentGroup === "ewallet"
                                ? "bg-blue-500"
                                : "bg-navy-800"
                            }`}
                          >
                            {m.short}
                          </span>
                          <span className="flex-1 text-sm font-semibold text-navy-900">
                            {m.name}
                          </span>
                          {checked && selectedMethod === m.name && (
                            <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                          )}
                        </button>
                      );
                    })}
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {paymentGroups.find((g) => g.group === paymentGroup)?.note}
                </p>
              </div>
            </section>

            {/* 4. Persetujuan */}
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
              <label className="flex items-start gap-3 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-blue"
                />
                <span>
                  Saya menyetujui{" "}
                  <span className="font-semibold text-brand-blue">Syarat &amp; Ketentuan</span> dan{" "}
                  <span className="font-semibold text-brand-blue">Kebijakan Privasi</span> ElektroMart,
                  menyetujui kebijakan pengembalian dananya, serta memahami bahwa pembayaran ditahan
                  oleh ElektroMart hingga pesanan selesai.
                </span>
              </label>
            </section>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Ringkasan pesanan */}
          <div>
            <div className="sticky top-20 rounded-2xl border border-slate-100 bg-white shadow-card">
              <div className="border-b border-slate-100 bg-[#F4F6FA] px-5 py-3">
                <p className="text-sm font-semibold text-navy-900">Ringkasan Pesanan</p>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 px-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="h-12 w-12 rounded-lg border border-slate-100 object-cover"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy-800 px-1 text-[10px] font-bold text-white">
                        {item.qty}
                      </span>
                    </div>
                    <p className="line-clamp-2 flex-1 text-xs font-medium text-navy-900">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-navy-900">
                      {formatRupiah(item.price * item.qty)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 px-5 pt-4 text-sm">
                <SummaryRow label="Subtotal" value={formatRupiah(subtotal)} />
                <SummaryRow label="Biaya layanan produk" value={formatRupiah(productFee)} />
                <SummaryRow label="Asuransi pengiriman" value={formatRupiah(insuranceFee)} />
                <SummaryRow
                  label="Ongkir"
                  value={
                    selectedCourier ? formatRupiah(shippingFee) : <span className="text-slate-300">-</span>
                  }
                />
                <div className="mt-3 flex items-start justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Total Tagihan</p>
                    <p className="text-xs text-slate-400">Sudah termasuk biaya layanan</p>
                  </div>
                  <p className="text-xl font-bold text-brand-blue">{formatRupiah(total)}</p>
                </div>
              </div>

              <div className="p-5 pt-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Buat Pesanan <ChevronRight className="h-4 w-4" />
                </button>
                <Link
                  href="/keranjang"
                  className="mt-3 block text-center text-xs font-medium text-slate-400 hover:text-brand-blue"
                >
                  &larr; Kembali ke keranjang
                </Link>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> Pesanan harus dibayar dalam 24 jam
                </div>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Package className="h-3.5 w-3.5" /> Dikirim dari Jakarta, Indonesia
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-10">
        <Footer />
      </div>

      <style jsx>{`
        .input-em {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid #e2e8f0;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #0a1c47;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-em:focus {
          border-color: #1a3fd6;
          box-shadow: 0 0 0 3px rgba(26, 63, 214, 0.12);
        }
        .input-em::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-slate-500">{label}</span>
      <span className="text-xs font-medium text-navy-900 sm:text-sm">{value}</span>
    </div>
  );
}

function StepDone({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
      <CheckCircle2 className="h-4 w-4" /> {label}
    </span>
  );
}

function StepActive({ label, current, total }: { label: string; current: number; total: number }) {
  return (
    <span className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
        {current}
      </span>
      {label}
      <span className="text-xs font-normal text-slate-400">/{total}</span>
    </span>
  );
}

function StepPending({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-slate-400">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-400">
        ·
      </span>
      {label}
    </span>
  );
}