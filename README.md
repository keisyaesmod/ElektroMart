# ElektroMart — Frontend

Landing page e-commerce dibangun dengan **Next.js 14 (App Router)**, **React**, dan **Tailwind CSS**, mereplikasi desain pada gambar referensi.

## Struktur project

```
elektromart/
├── app/
│   ├── layout.tsx      # root layout + metadata
│   ├── page.tsx         # merangkai semua section jadi 1 halaman
│   └── globals.css      # tailwind + style global
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TrustBadges.tsx
│   ├── Categories.tsx
│   ├── FlashSale.tsx    # ada countdown timer live
│   ├── ProductCard.tsx  # kartu produk flash sale & best seller
│   ├── BestSellers.tsx
│   ├── Brands.tsx
│   ├── PromoBanners.tsx
│   └── Footer.tsx
├── lib/
│   └── data.ts          # MOCK DATA produk, kategori, brand, dll
├── tailwind.config.js
└── package.json
```

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Menghubungkan ke Backend (Node.js / Laravel + Supabase)

Semua data saat ini ada di `lib/data.ts` (mock/dummy) supaya frontend bisa langsung jalan.
Untuk menyambungkan ke backend nanti:

1. **Buat API client**, mis. `lib/api.ts`, yang fetch ke endpoint backend kamu
   (Node.js/Express atau Laravel API), contoh:
   ```ts
   export async function getFlashSaleProducts() {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/flash-sale`);
     return res.json();
   }
   ```
2. **Ganti import** di komponen seperti `FlashSale.tsx` dan `BestSellers.tsx`
   dari `import { flashSaleProducts } from "@/lib/data"` menjadi hasil fetch
   (bisa pakai Server Component `async function`, atau `useEffect` bila perlu client-side).
3. **Supabase**: jika Supabase dipakai untuk auth/database langsung dari frontend,
   install `@supabase/supabase-js`, buat `lib/supabase.ts` untuk inisialisasi client,
   lalu query tabel produk/kategori langsung dari sana.
4. **Laravel**: kalau Laravel jadi REST API terpisah, cukup arahkan `NEXT_PUBLIC_API_URL`
   ke base URL Laravel (mis. `https://api.elektromart.test`), pastikan CORS
   di Laravel mengizinkan origin frontend Next.js.

## Catatan

- Gambar produk memakai Unsplash sebagai placeholder — ganti dengan URL gambar asli
  (dari Supabase Storage / S3 / dsb) setelah backend siap.
- Warna brand (navy + orange) diatur di `tailwind.config.js` (`navy.*`, `brand.blue`, `brand.orange`).
- Countdown flash sale murni client-side (`FlashSale.tsx`); untuk versi production
  sebaiknya waktu berakhir diambil dari backend agar konsisten antar user.
