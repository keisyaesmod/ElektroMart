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

## Menghubungkan ke Backend (Node.js + Supabase)

Backend Express ada di folder `server/` dan menulis ke tabel Supabase (`profiles`, `shipping_addresses`, `categories`, `products`).

1. Salin `.env.example` menjadi `.env`, lalu isi URL/anon key Supabase.
2. Tambahkan `SUPABASE_SERVICE_ROLE_KEY` (dari Project Settings > API) untuk backend.
3. Jalankan blok tambahan di `supabase.sql` pada SQL Editor Supabase.
4. Install dan jalankan API:

```bash
npm install --prefix server
npm run dev:api
```

5. Frontend: `npm run dev` (http://localhost:3000) memanggil `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).

CRUD admin: kategori, seller, buyer. CRUD seller: produk. Profil buyer menyimpan data pribadi + alamat pengiriman ke database.
