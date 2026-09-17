// app/bantuan/page.tsx
"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  HelpCircle,
  Search,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// Menu navigasi cepat, sesuai 4 link di footer "BANTUAN"
const menuBantuan = [
  { id: "faq", label: "Pertanyaan yang Sering Diajukan", icon: HelpCircle },
  { id: "syarat-ketentuan", label: "Syarat & Ketentuan", icon: FileText },
  { id: "kebijakan-privasi", label: "Kebijakan Privasi", icon: Lock },
  { id: "hubungi-cs", label: "Hubungi CS", icon: MessageCircle },
];

// Data panduan langkah-langkah
const panduanAwal = [
  {
    icon: Search,
    title: "Cari Produk Impian",
    desc: "Gunakan kolom pencarian atau jelajahi kategori untuk menemukan ribuan produk gadget original. Filter berdasarkan harga, merek, atau rating seller.",
  },
  {
    icon: ShoppingBag,
    title: "Tambah ke Keranjang & Checkout",
    desc: "Pilih produk, tentukan jumlah, dan klik 'Beli' atau 'Tambah ke Keranjang'. Lanjutkan ke halaman checkout untuk menyelesaikan pesanan.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran Aman",
    desc: "Bayar dengan berbagai metode: transfer bank, e-wallet, kartu kredit/debit, atau cicilan 0%. Semua transaksi dienkripsi dan aman.",
  },
  {
    icon: Truck,
    title: "Pengiriman & Pelacakan",
    desc: "Pilih kurir favorit, dapatkan gratis ongkir untuk pesanan tertentu. Lacak status pengiriman real-time di halaman pesanan.",
  },
  {
    icon: ShieldCheck,
    title: "Garansi Resmi & Retur",
    desc: "Semua produk bergaransi resmi. Jika tidak sesuai atau cacat, kamu bisa mengajukan retur dalam 7 hari setelah barang diterima.",
  },
];

// Data FAQ
const faq = [
  {
    q: "Bagaimana cara mencari produk?",
    a: "Ketik kata kunci di kolom pencarian di bagian atas halaman. Kamu juga bisa menjelajahi kategori lewat menu 'Jelajahi Kategori'.",
  },
  {
    q: "Apakah seller di platform ini terpercaya?",
    a: "Ya, semua seller kami adalah verified. Kami melakukan verifikasi ketat terhadap setiap penjual untuk memastikan keaslian produk dan kualitas layanan.",
  },
  {
    q: "Berapa lama estimasi pengiriman?",
    a: "Estimasi pengiriman tergantung lokasi dan kurir yang dipilih. Biasanya 1-5 hari kerja untuk dalam negeri. Kamu bisa pantau status pengiriman di halaman pesanan.",
  },
  {
    q: "Apakah ada program cicilan 0%?",
    a: "Ya, kami bekerja sama dengan beberapa bank untuk menawarkan cicilan 0% hingga 12 bulan. Pilih metode pembayaran kartu kredit saat checkout.",
  },
  {
    q: "Bagaimana cara menghubungi customer service?",
    a: "Kamu bisa chat langsung dengan tim kami melalui tombol chat di pojok kanan bawah, kirim email, atau lihat kontak lengkap di bagian 'Hubungi CS' pada halaman ini.",
  },
  {
    q: "Bagaimana cara mengembalikan barang?",
    a: "Ajukan retur melalui halaman pesanan dalam 7 hari setelah barang diterima. Pastikan barang dalam kondisi lengkap dan kemasan asli. Tim kami akan memandu proses selanjutnya.",
  },
];

// Data Syarat & Ketentuan
const syaratKetentuan = [
  {
    title: "1. Akun Pengguna",
    desc: "Kamu bertanggung jawab menjaga kerahasiaan data akun dan seluruh aktivitas yang terjadi di dalamnya. Informasi yang didaftarkan harus akurat dan terbaru.",
  },
  {
    title: "2. Pemesanan & Pembayaran",
    desc: "Setiap pesanan dianggap sah setelah pembayaran berhasil diverifikasi. Harga dan stok produk dapat berubah sewaktu-waktu mengikuti ketersediaan dari seller.",
  },
  {
    title: "3. Pengiriman",
    desc: "Estimasi waktu pengiriman bersifat perkiraan dan dapat berubah karena faktor kurir atau force majeure di luar kendali platform.",
  },
  {
    title: "4. Garansi & Retur",
    desc: "Produk yang dijual mengikuti ketentuan garansi resmi masing-masing merek. Pengajuan retur berlaku maksimal 7 hari setelah barang diterima, dengan syarat kondisi barang sesuai kebijakan.",
  },
  {
    title: "5. Larangan Penyalahgunaan",
    desc: "Pengguna dilarang melakukan kecurangan transaksi, manipulasi ulasan, atau tindakan lain yang merugikan pengguna lain maupun platform.",
  },
  {
    title: "6. Perubahan Ketentuan",
    desc: "Platform berhak memperbarui syarat & ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui halaman ini.",
  },
];

// Data Kebijakan Privasi
const kebijakanPrivasi = [
  {
    title: "1. Data yang Kami Kumpulkan",
    desc: "Kami mengumpulkan data seperti nama, alamat email, nomor telepon, dan alamat pengiriman yang kamu berikan saat mendaftar atau melakukan transaksi.",
  },
  {
    title: "2. Penggunaan Data",
    desc: "Data digunakan untuk memproses pesanan, meningkatkan layanan, serta mengirimkan informasi promo atau notifikasi terkait akunmu.",
  },
  {
    title: "3. Keamanan Data",
    desc: "Seluruh data pribadi disimpan dan diproses dengan enkripsi, dan hanya dapat diakses oleh pihak yang berwenang untuk keperluan operasional platform.",
  },
  {
    title: "4. Berbagi Data ke Pihak Ketiga",
    desc: "Data hanya dibagikan ke mitra logistik atau pembayaran yang diperlukan untuk menyelesaikan transaksimu, dan tidak diperjualbelikan ke pihak lain.",
  },
  {
    title: "5. Hak Pengguna",
    desc: "Kamu berhak meminta akses, perbaikan, atau penghapusan data pribadimu dengan menghubungi tim customer service kami.",
  },
];

export default function BantuanPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-blue px-4 py-20 sm:px-6 lg:px-8">
        {/* aksen dekoratif — blob blur, bukan pola SaaS generik */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {t("helpCenter")}
          </h1>
          <p className="mt-4 text-lg text-slate-300">{t("helpIntro")}</p>

          {/* Navigasi cepat ke tiap bagian, sesuai menu footer */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {menuBantuan.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: PANDUAN MEMULAI ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900">
              {t("gettingStarted")}
            </h2>
            <p className="mt-2 text-slate-600">{t("gettingStartedIntro")}</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {panduanAwal.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-orange/10">
                  <item.icon className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: FAQ ==================== */}
      <section id="faq" className="scroll-mt-24 bg-slate-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900">{t("faq")}</h2>
            <p className="mt-2 text-slate-600">{t("faqIntro")}</p>
          </div>

          <div className="mt-12 space-y-4">
            {faq.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-slate-200 bg-white p-5 transition-colors open:border-brand-blue open:ring-1 open:ring-brand-blue/20 hover:border-brand-blue/50"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-navy-900">
                  {item.q}
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-brand-blue" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: SYARAT & KETENTUAN ==================== */}
      <section id="syarat-ketentuan" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
              <FileText className="h-7 w-7 text-brand-orange" />
            </div>
            <h2 className="text-3xl font-bold text-navy-900">
              Syarat & Ketentuan
            </h2>
            <p className="mt-2 text-slate-600">
              Dengan menggunakan platform ini, kamu dianggap telah membaca dan
              menyetujui ketentuan berikut.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            {syaratKetentuan.map((item, idx) => (
              <div key={idx} className="border-l-4 border-l-brand-blue/70 bg-white px-6 py-5">
                <h3 className="text-base font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: KEBIJAKAN PRIVASI ==================== */}
      <section id="kebijakan-privasi" className="scroll-mt-24 bg-slate-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
              <Lock className="h-7 w-7 text-brand-orange" />
            </div>
            <h2 className="text-3xl font-bold text-navy-900">
              Kebijakan Privasi
            </h2>
            <p className="mt-2 text-slate-600">
              Kami berkomitmen menjaga kerahasiaan dan keamanan data pribadi
              pengguna.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white">
            {kebijakanPrivasi.map((item, idx) => (
              <div key={idx} className="border-l-4 border-l-brand-orange/70 px-6 py-5">
                <h3 className="text-base font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: HUBUNGI CS ==================== */}
      <section
        id="hubungi-cs"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-r from-navy-900 to-navy-800 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/20">
            <MessageCircle className="h-7 w-7 text-brand-orange" />
          </div>
          <h2 className="text-3xl font-bold text-white">Hubungi CS</h2>
          <p className="mt-3 text-slate-300">
            Tim support kami siap membantu kamu melalui live chat, telepon,
            atau email.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand-orange/40">
              <MessageCircle className="mx-auto h-6 w-6 text-brand-orange" />
              <h3 className="mt-3 font-semibold text-white">Live Chat</h3>
              <p className="mt-1 text-sm text-slate-300">Setiap hari, 24 jam</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand-orange/40">
              <Mail className="mx-auto h-6 w-6 text-brand-orange" />
              <h3 className="mt-3 font-semibold text-white">Email</h3>
              <p className="mt-1 text-sm text-slate-300">
                esmodkeisya@gmail.com
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand-orange/40">
              <Phone className="mx-auto h-6 w-6 text-brand-orange" />
              <h3 className="mt-3 font-semibold text-white">Telepon</h3>
              <p className="mt-1 text-sm text-slate-300">08.00–20.00</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/beranda"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}