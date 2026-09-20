// Seed: akun seller "Jaya store" (usergrafika02@gmail.com) + 13 produk miliknya.
// Jalankan: npm run seedseller  (dari folder server) atau node scripts/seed-jaya-store.js
// Script idempoten: aman dijalankan ulang, tidak membuat produk duplikat.

const { supabase } = require("../src/supabase");

const SELLER_EMAIL = "usergrafika02@gmail.com";
const SELLER_PASSWORD = "JayaStore2026!";
const STORE_NAME = "Jaya store";

const IMAGES = {
  samsung:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQESsGQQVqX2nRAl1g9PmyB3RJNu8B-_g34hi7fvuUNMt4lue4MQ4WDSww&s=10",
  iphone: "https://files.eci.id/documents/product/best/webiphone15pmt256tt/1697699185-1.webp",
  macbook:
    "https://macfinder.co.uk/wp-content/smush-webp/2023/02/img-MacBook-Air-13-Inch-99681-scaled-1250x1250.jpg.webp",
  sony: "https://gameone.ph/media/catalog/product/mpiowebpcache/d378a0f20f83637cdb1392af8dc032a2/s/o/sony-wh-1000xm5-headset.webp",
  ps5: "https://commons.wikimedia.org/wiki/Special:FilePath/PlayStation%205%20and%20DualSense%20with%20transparent%20background.png",
  xiaomi: "https://i02.appmifile.com/174_operator_sg/27/09/2024/b2a506bd130e53a2ff1983c074910242.jpg",
  jbl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1j5Vr3_XTYp1Uc4AbdTCPRydMSESzFdcQ6yLNbK85Rg&s=10",
  rogG14:
    "https://commons.wikimedia.org/wiki/Special:FilePath/ASUS%20ROG%20Zephyrus%202026-08-15%20G14.jpg",
  canonR50:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Canon%20EOS%20R50,%20White,%203.jpg",
  appleWatchS9:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Apple%20Watch%20Series%209%201%202023-11-14.jpg",
  mxMaster3s:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Logitech%20MX%20Master%203S%20HS12.jpg",
  anker737:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Anker%20power%20bank%20and%20cable.jpg",
  switchOled:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Nintendo%20Switch%20%E2%80%93%20OLED-Modell%20mit%20gedockter%20Konsole%2020230506%20HOF01624%20RAW-Export.png?width=800",
};

// Semua produk yang tampil di website (13 produk) dengan kepemilikan Jaya store.
const products = [
  {
    name: "ASUS ROG Zephyrus G14 Gaming Laptop",
    sku: "EM-JST-001",
    category: "Laptop",
    description:
      "Laptop gaming premium ultra-portable 14 inci dengan gaming notebook 8-core, layar QHD+ 165Hz, dan performa kelas atas untuk gaming & kreasi.",
    price: 24999000,
    stock: 10,
    image_url: IMAGES.rogG14,
  },
  {
    name: "Canon EOS R50 Mirrorless Camera",
    sku: "EM-JST-002",
    category: "Kamera",
    description:
      "Kamera mirrorless Canon EOS R50 dengan Dual Pixel CMOS AF, perekaman video 4K30p, dan konektivitas Wi-Fi/Bluetooth untuk vlog & fotografi.",
    price: 11499000,
    stock: 8,
    image_url: IMAGES.canonR50,
  },
  {
    name: "Apple Watch Series 9 GPS 45mm",
    sku: "EM-JST-003",
    category: "Smart Watch",
    description:
      "Apple Watch Series 9 dengan chip S9, layar Retina selalu aktif, pelacakan kesehatan lengkap, dan double tap gesture. GPS 45mm.",
    price: 6799000,
    stock: 20,
    image_url: IMAGES.appleWatchS9,
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    sku: "EM-JST-004",
    category: "Aksesoris",
    description:
      "Mouse wireless premium Logitech MX Master 3S dengan sensor 8K DPI, silent click, scroll wheel MagSpeed, dan multi-device (Bluetooth/2.4GHz).",
    price: 1499000,
    stock: 30,
    image_url: IMAGES.mxMaster3s,
  },
  {
    name: "Anker 737 Power Bank 24000mAh",
    sku: "EM-JST-005",
    category: "Kabel & Charger",
    description:
      "Power bank Anker 737 berkapasitas 24000mAh dengan output 140W, pengisian cepat untuk laptop & smartphone, dan layar digital real-time.",
    price: 1899000,
    stock: 25,
    image_url: IMAGES.anker737,
  },
  {
    name: "Nintendo Switch OLED White Edition",
    sku: "EM-JST-006",
    category: "Gaming",
    description:
      "Nintendo Switch Versi OLED White Edition dengan layar 7 inci OLED, storage 64GB, dock dengan port LAN, dan kickstand yang lebih lebar.",
    price: 4999000,
    stock: 15,
    image_url: IMAGES.switchOled,
  },
  {
    name: "Samsung Galaxy S24 Ultra 12/512GB",
    sku: "EM-JST-007",
    category: "Smartphone",
    description:
      "Samsung Galaxy S24 Ultra dengan S Pen, kamera 200MP, layar Dynamic AMOLED 2X 6.8 inci 120Hz, Snapdragon 8 Gen 3, dan baterai 5000mAh.",
    price: 18999000,
    stock: 25,
    image_url: IMAGES.samsung,
  },
  {
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    sku: "EM-JST-008",
    category: "Smartphone",
    description:
      "iPhone 15 Pro Max dengan desain titanium, chip A17 Pro, kamera 48MP ProRAW, Action Button, USB-C, dan layar Super Retina XDR ProMotion 120Hz.",
    price: 20999000,
    stock: 18,
    image_url: IMAGES.iphone,
  },
  {
    name: "Sony WH-1000XM5 Wireless Noise",
    sku: "EM-JST-009",
    category: "Audio",
    description:
      "Headphone premium Sony WH-1000XM5 dengan noise cancelling terdepan, driver 30mm, baterai 30 jam, multipoint, dan speak-to-chat.",
    price: 4999000,
    stock: 30,
    image_url: IMAGES.sony,
  },
  {
    name: "PlayStation 5 Slim 1TB + 2 Controller",
    sku: "EM-JST-010",
    category: "Gaming",
    description:
      "Paket PlayStation 5 Slim 1TB dengan 2 DualSense controller. Mendukung 4K 120Hz, ray tracing, SSD super cepat, dan library game PlayStation.",
    price: 8999000,
    stock: 8,
    image_url: IMAGES.ps5,
  },
  {
    name: "Xiaomi 14T Pro 12/512GB HyperOS",
    sku: "EM-JST-011",
    category: "Smartphone",
    description:
      "Xiaomi 14T Pro dengan Leica camera system, layar AMOLED 144Hz, Snapdragon 8 Gen 3, charging 120W, dan HyperOS.",
    price: 7999000,
    stock: 20,
    image_url: IMAGES.xiaomi,
  },
  {
    name: "JBL Charge 5 Portable Speaker",
    sku: "EM-JST-012",
    category: "Audio",
    description:
      "Speaker portable JBL Charge 5 dengan JBL Pro Sound, IP67 waterproof & dustproof, powerbank built-in, PartyBoost, dan baterai 20 jam.",
    price: 1799000,
    stock: 45,
    image_url: IMAGES.jbl,
  },
  {
    name: "MacBook Air M3 13 Inch 256GB",
    sku: "EM-JST-013",
    category: "Laptop",
    description:
      "MacBook Air 13 inci dengan chip Apple M3, layar Liquid Retina, baterai hingga 18 jam, dan desain fanless tipis.",
    price: 15999000,
    stock: 12,
    image_url: IMAGES.macbook,
  },
];

async function ensureSeller() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: SELLER_EMAIL,
    password: SELLER_PASSWORD,
    email_confirm: true,
    user_metadata: { role: "seller", full_name: STORE_NAME },
  });

  if (error && !/already registered|registered/i.test(error.message)) {
    throw error;
  }

  let sellerId = data?.user?.id;
  if (!sellerId) {
    const { data: users } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const existing = (users?.users || []).find(
      (u) => u.email && u.email.toLowerCase() === SELLER_EMAIL.toLowerCase()
    );
    if (!existing) throw new Error(`Pengguna ${SELLER_EMAIL} tidak ditemukan di auth.users.`);
    sellerId = existing.id;
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: sellerId,
      role: "seller",
      full_name: STORE_NAME,
      store_name: STORE_NAME,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (profileError) throw profileError;

  console.log(`Seller siap: ${SELLER_EMAIL} (id ${sellerId})`);
  console.log(`  Nama toko: ${STORE_NAME}`);
  console.log(`  Password login: ${SELLER_PASSWORD}`);
  return sellerId;
}

async function seedProducts(sellerId) {
  const { data: existing, error } = await supabase
    .from("products")
    .select("id, name")
    .eq("seller_id", sellerId);
  if (error) throw error;

  const byName = new Map((existing || []).map((p) => [p.name.toLowerCase(), p.id]));
  let inserted = 0;
  let updated = 0;

  for (const product of products) {
    const row = {
      seller_id: sellerId,
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      status: "active",
      image_url: product.image_url,
      updated_at: new Date().toISOString(),
    };
    const key = product.name.toLowerCase();
    if (byName.has(key)) {
      const { error: updateError } = await supabase
        .from("products")
        .update(row)
        .eq("id", byName.get(key));
      if (updateError) throw updateError;
      updated += 1;
    } else {
      const { error: insertError } = await supabase.from("products").insert(row);
      if (insertError) throw insertError;
      inserted += 1;
    }
  }

  console.log(`Produk: ${inserted} baru, ${updated} diperbarui. Total ${products.length} produk milik ${STORE_NAME}.`);
}

async function ensureBucket() {
  const { error } = await supabase.storage.createBucket("products", { public: true });
  if (error && !/already exists/i.test(error.message)) {
    console.log("Catatan:", error.message);
  } else {
    console.log("Storage bucket 'products' siap (publik).");
  }
  const { error: chatError } = await supabase.storage.createBucket("chat-files", { public: true });
  if (chatError && !/already exists/i.test(chatError.message)) {
    console.log("Catatan:", chatError.message);
  } else {
    console.log("Storage bucket 'chat-files' siap (publik).");
  }
}

async function main() {
  try {
    await ensureBucket();
    const sellerId = await ensureSeller();
    await seedProducts(sellerId);
    console.log("Seed selesai. Login sebagai penjual dan buka Manajemen Produk untuk CRUD 13 produk.");
  } catch (err) {
    console.error("Seed gagal:", err.message || err);
    process.exit(1);
  }
}

main();