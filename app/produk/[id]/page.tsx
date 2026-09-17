import ProductGallery from "@/components/produk/ProductGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store as StoreIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductActions from "@/components/produk/ProductActions";
import { BestSellerCard } from "@/components/produk/ProductCard";
import { getAllProducts, getProductById, getRelatedProducts, formatRupiah } from "@/lib/data";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  const store = product.store ?? {
    name: "ElektroMart Official",
    location: "Jakarta",
    rating: product.rating ?? 4.8,
    verified: true,
  };

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link href="/beranda" className="hover:text-navy-900">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Produk</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-700">{product.name}</span>
        </nav>

        {/* Gambar + Info utama + Toko */}
        <div className="mt-4 grid gap-5 lg:grid-cols-[1.3fr_1.2fr_0.7fr]">
          {/* Gambar produk — sama persis dengan gambar yang tampil di kartu sebelumnya */}
          <ProductGallery
            images={product.images ?? [product.image]}
            alt={product.name}
          />

          {/* Panel info produk */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            {product.badge === "Original" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" /> Original
              </span>
            ) : product.badge === "FLASH SALE" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                Flash Sale
              </span>
            ) : null}

            <h1 className="mt-3 text-2xl font-bold text-navy-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {product.rating ?? 4.9}
              </span>
              <span>|</span>
              <span>{product.reviewCount ?? product.sold ?? 0} ulasan</span>
              <span>|</span>
              <span>{product.soldTotal ?? product.sold ?? 0} terjual</span>
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-navy-900">
                  {formatRupiah(product.price)}
                </p>
                {product.discountPercent && (
                  <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="mt-1 text-sm text-slate-400 line-through">
                  {formatRupiah(product.originalPrice)}
                </p>
              )}
            </div>

            <dl className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Stok</dt>
                <dd className="font-medium text-navy-900">
                  {product.stock ?? 10} unit
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Berat</dt>
                <dd className="font-medium text-navy-900">
                  {product.weight ?? "1 kg"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Kondisi</dt>
                <dd className="font-medium text-navy-900">
                  {product.condition ?? "Baru"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Kategori</dt>
                <dd className="font-medium text-brand-blue">
                  {product.category ?? "Elektronik"}
                </dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-slate-100 pt-5">
              <ProductActions product={product} stock={product.stock ?? 10} />
            </div>
          </div>

          {/* Kartu toko + jaminan */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                  <StoreIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">{store.name}</p>
                  <p className="text-xs text-slate-500">{store.location}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                {store.verified && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-600">
                    ✓ Verified
                  </span>
                )}
                <span className="rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-600">
                  Rating {store.rating}
                </span>
              </div>
              <button className="mt-4 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-navy-900 hover:bg-slate-50">
                Kunjungi Toko
              </button>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    Garansi Original
                  </p>
                  <p className="text-xs text-slate-500">Barang 100% asli</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Truck className="h-5 w-5 shrink-0 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    Pengiriman Cepat
                  </p>
                  <p className="text-xs text-slate-500">
                    Same day Jabodetabek
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw className="h-5 w-5 shrink-0 text-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">
                    Bisa Dikembalikan
                  </p>
                  <p className="text-xs text-slate-500">
                    7 hari setelah terima
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi + Ulasan */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-900">
              Deskripsi Produk
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {product.description ??
                "Produk berkualitas dari ElektroMart, dijamin original dan bergaransi resmi."}
            </p>

            {product.specs && (
              <>
                <h3 className="mt-5 text-sm font-bold text-navy-900">
                  Spesifikasi
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {product.specs.map((spec) => (
                    <li key={spec}>&bull; {spec}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-900">
              Ulasan Pembeli
            </h2>
            <div className="mt-3 space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.name} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-navy-900">
                        {review.name}
                      </p>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">Belum ada ulasan.</p>
              )}
            </div>
          </div>
        </div>

        {/* Produk Serupa */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-navy-900">Produk Serupa</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <BestSellerCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </main>
  );
}