"use client";

import { useLanguage } from "@/lib/i18n";

const englishContent: Record<string, string> = {
  Baru: "New",
  Elektronik: "Electronics",
  "Samsung Galaxy S24 Ultra dengan S Pen terintegrasi, kamera 200MP, layar Dynamic AMOLED 2X 6.8 inci 120Hz, chipset Snapdragon 8 Gen 3, dan baterai 5000mAh. Cocok untuk produktivitas, fotografi, dan gaming mobile.": "Samsung Galaxy S24 Ultra with an integrated S Pen, 200MP camera, 6.8-inch 120Hz Dynamic AMOLED 2X display, Snapdragon 8 Gen 3 chipset, and 5000mAh battery. Ideal for productivity, photography, and mobile gaming.",
  "Layar: 6.8 inci Dynamic AMOLED 2X, 120Hz": "Display: 6.8-inch Dynamic AMOLED 2X, 120Hz",
  "Prosesor: Snapdragon 8 Gen 3 for Galaxy": "Processor: Snapdragon 8 Gen 3 for Galaxy",
  "RAM/Storage: 12GB / 512GB": "RAM/Storage: 12GB / 512GB",
  "Kamera: 200MP + 50MP + 12MP + 10MP": "Camera: 200MP + 50MP + 12MP + 10MP",
  "Baterai: 5000mAh, fast charging 45W": "Battery: 5000mAh, 45W fast charging",
  "Garansi resmi Samsung Indonesia 1 tahun": "1-year official Samsung Indonesia warranty",
  "Barang original, kamera jernih banget. Pengiriman cepat!": "Original product, the camera is incredibly clear. Fast delivery!",
  "S Pen sangat membantu untuk catatan harian. Recommended.": "The S Pen is very helpful for daily notes. Recommended.",
  "Produk bagus, packing aman. Sedikit lama pengiriman ke luar Jawa.": "Great product, secure packaging. Delivery outside Java took a little longer.",
};

export default function ProductDetailText({
  id,
  value,
  values,
}: {
  id?: string;
  value?: string;
  values?: Record<string, string | number>;
}) {
  const { t, language } = useLanguage();
  if (value) return <>{language === "en" ? englishContent[value] ?? value : value}</>;
  return <>{id ? t(id, values) : null}</>;
}