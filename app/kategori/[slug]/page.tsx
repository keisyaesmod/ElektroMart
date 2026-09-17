import KategoriPageClient from "@/components/KategoriPageClient";

// Contoh: /kategori/semua, /kategori/audio, /kategori/smartphone
export default function KategoriPage({
  params,
}: {
  params: { slug: string };
}) {
  return <KategoriPageClient slug={params.slug} />;
}