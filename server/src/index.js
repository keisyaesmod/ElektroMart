const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { supabase } = require("./supabase");
const { requireUser, requireRole, optionalUser } = require("./auth");

const app = express();
const port = Number(process.env.PORT || 4000);

function normalizeOrigins(raw) {
  return String(raw || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const allowedOrigins = new Set([...normalizeOrigins(process.env.CLIENT_ORIGIN), "http://localhost:3000"]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      try {
        const hostname = new URL(origin).hostname;
        if (hostname === "localhost" || hostname === "127.0.0.1" || allowedOrigins.has(origin)) {
          return callback(null, true);
        }
      } catch {
        /* fallthrough */
      }
      callback(new Error("CORS tidak mengizinkan origin: " + origin));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "kategori";
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function parseAmount(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const digits = String(value || "").replace(/[^0-9]/g, "");
  return Number(digits) || 0;
}

function mapProduct(row) {
  return {
    id: row.id,
    seller_id: row.seller_id,
    name: row.name,
    sku: row.sku,
    category: row.category,
    description: row.description,
    price: Number(row.price || 0),
    stock: Number(row.stock || 0),
    status: row.status,
    image_url: row.image_url,
    images: row.images || [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function mapOrder(row, items = []) {
  return {
    id: row.id,
    buyer_id: row.buyer_id,
    order_number: row.order_number,
    status: row.status,
    payment_method: row.payment_method,
    payment_group: row.payment_group,
    courier: row.courier,
    shipping_address: row.shipping_address,
    subtotal: Number(row.subtotal || 0),
    product_fee: Number(row.product_fee || 0),
    insurance_fee: Number(row.insurance_fee || 0),
    shipping_fee: Number(row.shipping_fee || 0),
    total: Number(row.total || 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
    items: items.map((i) => ({
      id: i.id,
      product_id: i.product_id,
      seller_id: i.seller_id,
      product_name: i.product_name,
      product_image: i.product_image,
      price: Number(i.price || 0),
      qty: Number(i.qty || 0),
      subtotal: Number(i.subtotal || 0),
    })),
  };
}

function orderNumber() {
  return "EM-" + Date.now().toString().slice(-9) + Math.floor(Math.random() * 90 + 10);
}

const DEFAULT_CATEGORIES = [
  { name: "Smartphone", slug: "smartphone", color: "#3B82F6", icon: "Smartphone", sort_order: 1, subcategories: ["Android", "iOS"], attributes: ["RAM", "Storage", "OS"] },
  { name: "Laptop", slug: "laptop", color: "#8B5CF6", icon: "Laptop", sort_order: 2, subcategories: ["Gaming", "Ultrabook", "Office"], attributes: ["Processor", "RAM", "GPU"] },
  { name: "TV & Audio", slug: "tv-audio", color: "#EC4899", icon: "Tv", sort_order: 3, subcategories: ["LED TV", "Smart TV", "Soundbar"], attributes: ["Size", "Resolution"] },
  { name: "Kamera", slug: "kamera", color: "#F59E0B", icon: "Camera", sort_order: 4, subcategories: ["Mirrorless", "DSLR", "Action Cam"], attributes: ["Sensor", "Lens"] },
  { name: "Audio", slug: "audio", color: "#10B981", icon: "Headphones", sort_order: 5, subcategories: ["TWS", "Headphone", "Speaker"], attributes: ["Connectivity", "Battery Life"] },
  { name: "Gaming", slug: "gaming", color: "#F43F5E", icon: "Gamepad2", sort_order: 6, subcategories: ["Console", "Aksesoris", "PC Gaming"], attributes: ["Platform"] },
  { name: "Smart Watch", slug: "smart-watch", color: "#06B6D4", icon: "Watch", sort_order: 7, subcategories: ["Android", "iOS"], attributes: ["Connectivity", "Battery Life"] },
  { name: "Kabel & Charger", slug: "kabel-charger", color: "#7C3AED", icon: "Cable", sort_order: 8, subcategories: ["USB-C", "Lightning", "Charger"], attributes: ["Watt", "Connector"] },
];

async function ensureDefaultCategories() {
  const { error } = await supabase.from("categories").upsert(DEFAULT_CATEGORIES, { onConflict: "slug" });
  if (error) console.warn("Gagal sinkron kategori default:", error.message);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "elektromart-api" });
});

app.get("/api/profile", requireUser, async (req, res) => {
  res.json({
    profile: {
      ...req.profile,
      email: req.user.email,
    },
  });
});

app.patch("/api/profile", requireUser, async (req, res) => {
  const body = req.body || {};
  const payload = {
    username: body.username ?? req.profile?.username,
    full_name: body.full_name ?? req.profile?.full_name,
    phone: body.phone ?? req.profile?.phone,
    date_of_birth: body.date_of_birth || null,
    gender: body.gender || null,
    bio: body.bio ?? req.profile?.bio,
    store_name: body.store_name ?? req.profile?.store_name,
    store_address: body.store_address ?? req.profile?.store_address,
    store_description: body.store_description ?? req.profile?.store_description,
    avatar_url: body.avatar_url ?? req.profile?.avatar_url,
    store_banner_url: body.store_banner_url ?? req.profile?.store_banner_url,
    operating_hours: body.operating_hours ?? req.profile?.operating_hours,
    updated_at: new Date().toISOString(),
  };
  let { data, error } = await supabase.from("profiles").update(payload).eq("id", req.user.id).select("*").single();
  if (error && /operating_hours|store_banner_url|schema cache/i.test(error.message)) {
    const compatiblePayload = { ...payload };
    delete compatiblePayload.operating_hours;
    delete compatiblePayload.store_banner_url;
    const retry = await supabase.from("profiles").update(compatiblePayload).eq("id", req.user.id).select("*").single();
    data = retry.data;
    error = retry.error;
  }
  if (error) return res.status(400).json({ error: error.message });
  res.json({ profile: { ...data, email: req.user.email } });
});

app.get("/api/addresses", requireUser, async (req, res) => {
  const userId = req.profile?.role === "admin" && req.query.userId ? String(req.query.userId) : req.user.id;
  const { data, error } = await supabase
    .from("shipping_addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ addresses: data || [] });
});

app.post("/api/addresses", requireUser, async (req, res) => {
  const body = req.body || {};
  if (!body.recipient || !body.address || !body.city) {
    return res.status(400).json({ error: "Nama penerima, alamat, dan kota wajib diisi." });
  }
  if (body.is_default) {
    await supabase.from("shipping_addresses").update({ is_default: false }).eq("user_id", req.user.id);
  }
  const { count } = await supabase
    .from("shipping_addresses")
    .select("id", { count: "exact", head: true })
    .eq("user_id", req.user.id);
  const { data, error } = await supabase
    .from("shipping_addresses")
    .insert({
      user_id: req.user.id,
      label: body.label || "home",
      recipient: body.recipient,
      phone: body.phone || "",
      address: body.address,
      city: body.city,
      province: body.province || "Jawa Timur",
      postal: body.postal || "",
      is_default: Boolean(body.is_default) || !count,
    })
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ address: data });
});

app.patch("/api/addresses/:id", requireUser, async (req, res) => {
  const body = req.body || {};
  const { data: existing, error: findError } = await supabase
    .from("shipping_addresses")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();
  if (findError) return res.status(400).json({ error: findError.message });
  if (!existing || (existing.user_id !== req.user.id && req.profile?.role !== "admin")) {
    return res.status(404).json({ error: "Alamat tidak ditemukan." });
  }
  if (body.is_default) {
    await supabase.from("shipping_addresses").update({ is_default: false }).eq("user_id", existing.user_id);
  }
  const { data, error } = await supabase
    .from("shipping_addresses")
    .update({
      label: body.label ?? existing.label,
      recipient: body.recipient ?? existing.recipient,
      phone: body.phone ?? existing.phone,
      address: body.address ?? existing.address,
      city: body.city ?? existing.city,
      province: body.province ?? existing.province,
      postal: body.postal ?? existing.postal,
      is_default: body.is_default ?? existing.is_default,
      updated_at: new Date().toISOString(),
    })
    .eq("id", req.params.id)
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ address: data });
});

app.delete("/api/addresses/:id", requireUser, async (req, res) => {
  const { data: existing } = await supabase.from("shipping_addresses").select("*").eq("id", req.params.id).maybeSingle();
  if (!existing || (existing.user_id !== req.user.id && req.profile?.role !== "admin")) {
    return res.status(404).json({ error: "Alamat tidak ditemukan." });
  }
  const { error } = await supabase.from("shipping_addresses").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  if (existing.is_default) {
    const { data: next } = await supabase
      .from("shipping_addresses")
      .select("id")
      .eq("user_id", existing.user_id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (next) {
      await supabase.from("shipping_addresses").update({ is_default: true }).eq("id", next.id);
    }
  }
  res.json({ ok: true });
});

app.get("/api/categories", async (_req, res) => {
  const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true }).order("name", { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ categories: data || [] });
});

app.post("/api/categories", requireUser, requireRole("admin"), async (req, res) => {
  const body = req.body || {};
  if (!body.name) return res.status(400).json({ error: "Nama kategori wajib diisi." });
  const { count } = await supabase.from("categories").select("id", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: body.name,
      slug: slugify(body.slug || body.name),
      color: body.color || "#1a3fd6",
      icon: body.icon || null,
      sort_order: Number(body.sort_order || (count || 0) + 1),
      subcategories: Array.isArray(body.subcategories) ? body.subcategories : String(body.subcategories || "").split(",").map((s) => s.trim()).filter(Boolean),
      attributes: Array.isArray(body.attributes) ? body.attributes : String(body.attributes || "").split(",").map((s) => s.trim()).filter(Boolean),
    })
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ category: data });
});

app.patch("/api/categories/:id", requireUser, requireRole("admin"), async (req, res) => {
  const body = req.body || {};
  const payload = {};
  if (body.name) payload.name = body.name;
  if (body.slug || body.name) payload.slug = slugify(body.slug || body.name);
  if (body.color) payload.color = body.color;
  if (body.icon !== undefined) payload.icon = body.icon;
  if (body.subcategories !== undefined) {
    payload.subcategories = Array.isArray(body.subcategories)
      ? body.subcategories
      : String(body.subcategories || "").split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (body.attributes !== undefined) {
    payload.attributes = Array.isArray(body.attributes)
      ? body.attributes
      : String(body.attributes || "").split(",").map((s) => s.trim()).filter(Boolean);
  }
  payload.updated_at = new Date().toISOString();
  const { data, error } = await supabase.from("categories").update(payload).eq("id", req.params.id).select("*").single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ category: data });
});

app.delete("/api/categories/:id", requireUser, requireRole("admin"), async (req, res) => {
  const { error } = await supabase.from("categories").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

app.get("/api/products", optionalUser, async (req, res) => {
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (req.profile?.role === "seller" && req.query.catalog !== "1") query = query.eq("seller_id", req.user.id);
  if (req.query.sellerId) query = query.eq("seller_id", String(req.query.sellerId));
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });
  res.json({ products: (data || []).map(mapProduct) });
});

app.get("/api/stores", async (req, res) => {
  const { data: stores, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "seller")
    .order("created_at", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });

  const { data: authUsers } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const emailById = Object.fromEntries((authUsers?.users || []).map((u) => [u.id, u.email]));
  const { data: products } = await supabase.from("products").select("seller_id, status");
  const productList = products || [];
  const countBySeller = {};
  const activeBySeller = {};
  productList.forEach((p) => {
    countBySeller[p.seller_id] = (countBySeller[p.seller_id] || 0) + 1;
    if (p.status === "active") activeBySeller[p.seller_id] = (activeBySeller[p.seller_id] || 0) + 1;
  });

  res.json({
    stores: (stores || []).map((s) => ({
      ...s,
      email: emailById[s.id] || null,
      product_count: countBySeller[s.id] || 0,
      active_product_count: activeBySeller[s.id] || 0,
      rating: 4.8,
      verified: s.seller_status === "verified",
    })),
  });
});

let productsHaveImagesCol = null;
async function productsImagesEnabled() {
  if (productsHaveImagesCol !== null) return productsHaveImagesCol;
  const { error } = await supabase.from("products").select("images").limit(1);
  productsHaveImagesCol = error === null;
  if (!productsHaveImagesCol) {
    console.warn("Kolom products.images belum ada; foto tambahan diabaikan sementara. Jalankan blok SQL terbaru di supabase.sql (ALTER TABLE ... images jsonb).");
  }
  return productsHaveImagesCol;
}

app.post("/api/products", requireUser, requireRole("seller", "admin"), async (req, res) => {
  const body = req.body || {};
  if (!body.name) return res.status(400).json({ error: "Nama produk wajib diisi." });
  const stock = Number(body.stock || 0);
  const status = body.status || (stock <= 0 ? "out_of_stock" : "active");
  const sellerId = req.profile.role === "admin" && body.seller_id ? body.seller_id : req.user.id;
  const insertRow = {
    seller_id: sellerId,
    name: body.name,
    sku: body.sku || null,
    category: body.category || null,
    description: body.description || null,
    price: parseAmount(body.price),
    stock,
    status,
    image_url: body.image_url || null,
  };
  if (await productsImagesEnabled()) {
    insertRow.images = Array.isArray(body.images) ? body.images.filter(Boolean) : null;
  }
  const { data, error } = await supabase
    .from("products")
    .insert(insertRow)
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ product: mapProduct(data) });
});

app.patch("/api/products/:id", requireUser, requireRole("seller", "admin"), async (req, res) => {
  const { data: existing } = await supabase.from("products").select("*").eq("id", req.params.id).maybeSingle();
  if (!existing) return res.status(404).json({ error: "Produk tidak ditemukan." });
  if (req.profile.role === "seller" && existing.seller_id !== req.user.id) {
    return res.status(403).json({ error: "Akses ditolak." });
  }
  const body = req.body || {};
  const payload = { updated_at: new Date().toISOString() };
  ["name", "sku", "category", "description", "image_url", "status"].forEach((key) => {
    if (body[key] !== undefined) payload[key] = body[key];
  });
  if (await productsImagesEnabled() && body.images !== undefined) {
    payload.images = Array.isArray(body.images) ? body.images.filter(Boolean) : [];
  }
  if (body.price !== undefined) payload.price = parseAmount(body.price);
  if (body.stock !== undefined) {
    payload.stock = Number(body.stock);
    if (!body.status) payload.status = payload.stock <= 0 ? "out_of_stock" : existing.status === "draft" ? "draft" : "active";
  }
  const { data, error } = await supabase.from("products").update(payload).eq("id", req.params.id).select("*").single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ product: mapProduct(data) });
});

app.delete("/api/products/:id", requireUser, requireRole("seller", "admin"), async (req, res) => {
  const { data: existing } = await supabase.from("products").select("seller_id").eq("id", req.params.id).maybeSingle();
  if (!existing) return res.status(404).json({ error: "Produk tidak ditemukan." });
  if (req.profile.role === "seller" && existing.seller_id !== req.user.id) {
    return res.status(403).json({ error: "Akses ditolak." });
  }
  const { error } = await supabase.from("products").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

app.get("/api/users", requireUser, requireRole("admin"), async (req, res) => {
  const role = req.query.role ? String(req.query.role) : null;
  let query = supabase.from("profiles").select("*").order("created_at", { ascending: false });
  if (role) query = query.eq("role", role);
  const { data: profiles, error } = await query;
  if (error) return res.status(400).json({ error: error.message });

  const { data: authUsers } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const emailById = Object.fromEntries((authUsers?.users || []).map((u) => [u.id, u.email]));
  const { data: products } = await supabase.from("products").select("seller_id");
  const countBySeller = {};
  (products || []).forEach((p) => {
    countBySeller[p.seller_id] = (countBySeller[p.seller_id] || 0) + 1;
  });

  res.json({
    users: (profiles || []).map((p) => ({
      ...p,
      email: emailById[p.id] || null,
      product_count: countBySeller[p.id] || 0,
    })),
  });
});

app.post("/api/users", requireUser, requireRole("admin"), async (req, res) => {
  const body = req.body || {};
  if (!body.email || !body.password || !body.full_name) {
    return res.status(400).json({ error: "Email, password, dan nama lengkap wajib diisi." });
  }
  const role = body.role === "seller" || body.role === "admin" ? body.role : "buyer";
  const { data, error } = await supabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
    user_metadata: {
      role,
      full_name: body.full_name,
      phone: body.phone || "",
      store_name: body.store_name || "",
      store_address: body.store_address || "",
    },
  });
  if (error) return res.status(400).json({ error: error.message });
  const extras = {
    role,
    full_name: body.full_name,
    phone: body.phone || null,
    store_name: body.store_name || null,
    store_address: body.store_address || null,
    account_status: body.account_status || "active",
    seller_status: role === "seller" ? body.seller_status || "verified" : null,
    updated_at: new Date().toISOString(),
  };
  await supabase.from("profiles").update(extras).eq("id", data.user.id);
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
  res.status(201).json({ user: { ...profile, email: data.user.email, product_count: 0 } });
});

app.patch("/api/users/:id", requireUser, requireRole("admin"), async (req, res) => {
  const body = req.body || {};
  const payload = { updated_at: new Date().toISOString() };
  ["full_name", "phone", "store_name", "store_address", "store_description", "account_status", "seller_status", "role", "bio", "gender", "date_of_birth"].forEach((key) => {
    if (body[key] !== undefined) payload[key] = body[key];
  });
  const { data, error } = await supabase.from("profiles").update(payload).eq("id", req.params.id).select("*").single();
  if (error) return res.status(400).json({ error: error.message });
  if (body.email) {
    await supabase.auth.admin.updateUserById(req.params.id, { email: body.email });
  }
  res.json({ user: data });
});

app.delete("/api/users/:id", requireUser, requireRole("admin"), async (req, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ error: "Tidak dapat menghapus akun sendiri." });
  const { error } = await supabase.auth.admin.deleteUser(req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

app.get("/api/orders", requireUser, async (req, res) => {
  const role = req.profile?.role;
  let query = supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (role === "buyer") query = query.eq("buyer_id", req.user.id);
  if (role === "seller") {
    const { data: sellerItems } = await supabase
      .from("order_items")
      .select("order_id")
      .eq("seller_id", req.user.id);
    const orderIds = [...new Set((sellerItems || []).map((i) => i.order_id))];
    if (!orderIds.length) return res.json({ orders: [] });
    query = query.in("id", orderIds);
  }
  const { data: orders, error } = await query;
  if (error) return res.status(400).json({ error: error.message });

  const ids = (orders || []).map((o) => o.id);
  const { data: items } = ids.length
    ? await supabase.from("order_items").select("*").in("order_id", ids).order("created_at", { ascending: true })
    : { data: [] };
  const byOrder = {};
  (items || []).forEach((i) => {
    (byOrder[i.order_id] = byOrder[i.order_id] || []).push(i);
  });

  res.json({ orders: (orders || []).map((o) => mapOrder(o, byOrder[o.id] || [])) });
});

app.post("/api/orders", requireUser, requireRole("buyer", "admin"), async (req, res) => {
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) return res.status(400).json({ error: "Keranjang kosong." });
  if (!body.address || !body.address.city) {
    return res.status(400).json({ error: "Alamat pengiriman wajib diisi." });
  }
  if (!body.payment_method) {
    return res.status(400).json({ error: "Metode pembayaran wajib dipilih." });
  }

  const subtotal = Number(body.subtotal || 0);
  const productFee = Number(body.product_fee || 0);
  const insuranceFee = Number(body.insurance_fee || 0);
  const shippingFee = Number(body.shipping_fee || 0);
  const courier = body.courier || "";
  const total = Number(body.total || subtotal + productFee + insuranceFee + shippingFee);
  const resolvedItems = await Promise.all(
    items.map(async (item) => {
      if (isUuid(item.product_id)) return { ...item, product_id: item.product_id };
      if (!item.product_name && !item.name) return { ...item, product_id: null };
      const { data: product } = await supabase
        .from("products")
        .select("id, seller_id")
        .eq("name", item.product_name || item.name)
        .limit(1)
        .maybeSingle();
      return {
        ...item,
        product_id: product?.id || null,
        seller_id: item.seller_id || product?.seller_id || null,
      };
    })
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      buyer_id: req.user.id,
      order_number: orderNumber(),
      status: body.status || "waiting_payment",
      payment_method: body.payment_method,
      payment_group: body.payment_group || "bank",
      courier,
      shipping_address: body.address,
      subtotal,
      product_fee: productFee,
      insurance_fee: insuranceFee,
      shipping_fee: shippingFee,
      total,
    })
    .select("*")
    .single();
  if (orderError) return res.status(400).json({ error: orderError.message });

  const orderItems = resolvedItems.map((i) => ({
    order_id: order.id,
    product_id: i.product_id || null,
    seller_id: i.seller_id || null,
    product_name: i.product_name || i.name || "Produk",
    product_image: i.product_image || i.image || null,
    price: Number(i.price || 0),
    qty: Number(i.qty || 1),
    subtotal: Number(i.price || 0) * Number(i.qty || 1),
  }));
  const { data: inserted, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select("*");
  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    return res.status(400).json({ error: itemsError.message });
  }

  for (const i of resolvedItems) {
    if (i.product_id) {
      void (async () => {
        try {
          const { error: rpcError } = await supabase.rpc("decrement_product_stock", {
            product_id: i.product_id,
            qty: Number(i.qty || 1),
          });
          if (rpcError) throw rpcError;
        } catch {
          const { data: current } = await supabase.from("products").select("stock").eq("id", i.product_id).maybeSingle();
          if (current) {
            await supabase
              .from("products")
              .update({ stock: Math.max(0, Number(current.stock || 0) - Number(i.qty || 1)), updated_at: new Date().toISOString() })
              .eq("id", i.product_id);
          }
        }
      })();
    }
  }

  res.status(201).json({ order: mapOrder(order, inserted || []) });
});

app.post("/api/reports", requireUser, requireRole("buyer", "admin"), async (req, res) => {
  const body = req.body || {};
  if (!body.product_name && !body.product_id) {
    return res.status(400).json({ error: "Produk wajib diisi pada laporan." });
  }
  if (!body.reason) {
    return res.status(400).json({ error: "Alasan pelaporan wajib diisi." });
  }

  let sellerId = body.seller_id || null;
  let productName = body.product_name || null;
  let productImage = body.product_image || null;

  if (body.product_id) {
    const { data: product } = await supabase.from("products").select("id, seller_id, name, image_url").eq("id", body.product_id).maybeSingle();
    if (product) {
      sellerId = sellerId || product.seller_id;
      productName = productName || product.name;
      productImage = productImage || product.image_url;
    }
  }

  if (!sellerId && productName) {
    const { data: byName } = await supabase.from("products").select("seller_id, image_url").eq("name", productName).limit(1).maybeSingle();
    if (byName) {
      sellerId = byName.seller_id;
      productImage = productImage || byName.image_url;
    }
  }

  const { data, error } = await supabase
    .from("reports")
    .insert({
      product_id: body.product_id || null,
      seller_id: sellerId,
      reporter_id: req.user.id,
      product_name: productName,
      product_image: productImage,
      reason: body.reason,
      description: body.description || null,
      status: "pending",
    })
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ report: data });
});

app.get("/api/reports", requireUser, async (req, res) => {
  const role = req.profile?.role;
  let query = supabase.from("reports").select("*").order("created_at", { ascending: false });
  if (req.query.status) query = query.eq("status", String(req.query.status));
  if (role === "admin") {
    /* semua */
  } else if (role === "seller") {
    query = query.eq("seller_id", req.user.id);
  } else {
    query = query.eq("reporter_id", req.user.id);
  }
  const { data, error } = await query;
  if (error) return res.status(400).json({ error: error.message });

  const reporterIds = [...new Set((data || []).map((r) => r.reporter_id).filter(Boolean))];
  const { data: profiles } = reporterIds.length
    ? await supabase.from("profiles").select("id, full_name").in("id", reporterIds)
    : { data: [] };
  const nameById = Object.fromEntries((profiles || []).map((p) => [p.id, p.full_name]));

  res.json({
    reports: (data || []).map((r) => ({
      ...r,
      reporter: r.reporter_id ? nameById[r.reporter_id] || null : null,
    })),
  });
});

app.patch("/api/reports/:id", requireUser, async (req, res) => {
  const role = req.profile?.role;
  const body = req.body || {};
  const status = body.status;
  if (!["pending", "resolved", "dismissed"].includes(status)) {
    return res.status(400).json({ error: "Status tidak valid." });
  }
  const { data: existing } = await supabase.from("reports").select("*").eq("id", req.params.id).maybeSingle();
  if (!existing) return res.status(404).json({ error: "Laporan tidak ditemukan." });
  if (role !== "admin" && existing.seller_id !== req.user.id) {
    return res.status(403).json({ error: "Akses ditolak." });
  }
  const { data, error } = await supabase
    .from("reports")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ report: data });
});

app.get("/api/bank-accounts", requireUser, async (req, res) => {
  const { data, error } = await supabase.from("bank_accounts").select("*").eq("user_id", req.user.id).order("created_at", { ascending: true });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ accounts: data || [] });
});

app.post("/api/bank-accounts", requireUser, requireRole("buyer", "admin"), async (req, res) => {
  const body = req.body || {};
  if (!body.bank_name || !body.account_name || !body.account_number) {
    return res.status(400).json({ error: "Nama bank, nama pemilik, dan nomor rekening wajib diisi." });
  }
  const type = body.type === "card" ? "card" : "account";
  const { data, error } = await supabase
    .from("bank_accounts")
    .insert({
      user_id: req.user.id,
      type,
      bank_name: body.bank_name,
      account_name: body.account_name,
      account_number: body.account_number,
    })
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ account: data });
});

app.delete("/api/bank-accounts/:id", requireUser, async (req, res) => {
  const { data: existing } = await supabase.from("bank_accounts").select("id, user_id").eq("id", req.params.id).maybeSingle();
  if (!existing || existing.user_id !== req.user.id) {
    return res.status(404).json({ error: "Rekening tidak ditemukan." });
  }
  const { error } = await supabase.from("bank_accounts").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

app.get("/api/conversations", requireUser, async (req, res) => {
  const me = { id: req.user.id, role: req.profile?.role };
  let query = supabase.from("conversations").select("*").order("updated_at", { ascending: false });
  if (me.role === "seller") query = query.eq("seller_id", me.id);
  else query = query.eq("buyer_id", me.id);
  const { data: convos, error } = await query;
  if (error) return res.status(400).json({ error: error.message });

  const conversations = [];
  for (const c of convos || []) {
    const otherId = c.buyer_id === me.id ? c.seller_id : c.buyer_id;
    const { data: other } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, role, store_name")
      .eq("id", otherId)
      .maybeSingle();
    const { data: lastRow } = await supabase
      .from("messages")
      .select("text, sender_id, created_at, attachment")
      .eq("conversation_id", c.id)
      .order("created_at", { ascending: false })
      .limit(1);
    const last = lastRow?.[0] || null;
    const lastReadAt = me.role === "seller" ? c.seller_last_read_at : c.buyer_last_read_at;
    const { count: unread } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("conversation_id", c.id)
      .gt("created_at", lastReadAt)
      .filter("sender_id", "neq", me.id);
    conversations.push({
      id: c.id,
      other: {
        id: other?.id || otherId,
        name:
          me.role === "seller"
            ? other?.full_name || "Pembeli"
            : other?.store_name || other?.full_name || "Penjual",
        role: other?.role || "buyer",
        avatar_url: other?.avatar_url || null,
      },
      last_message: last
        ? last.attachment?.type === "video"
          ? "Video"
          : last.attachment?.type === "image"
            ? "Foto"
            : last.text
        : "",
      from_me: last ? last.sender_id === me.id : false,
      unread: unread || 0,
      updated_at: c.updated_at,
    });
  }
  res.json({ conversations });
});

app.post("/api/conversations", requireUser, requireRole("buyer", "admin"), async (req, res) => {
  const sellerId = req.body?.seller_id;
  if (!sellerId) return res.status(400).json({ error: "Penjual wajib diisi." });
  if (sellerId === req.user.id) return res.status(400).json({ error: "Tidak dapat chat dengan diri sendiri." });

  let conversation = null;
  const { data: a } = await supabase.from("conversations").select("*").eq("buyer_id", req.user.id).eq("seller_id", sellerId).maybeSingle();
  if (a) conversation = a;
  else {
    const { data: b } = await supabase.from("conversations").select("*").eq("buyer_id", sellerId).eq("seller_id", req.user.id).maybeSingle();
    if (b) conversation = b;
  }
  if (!conversation) {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ buyer_id: req.user.id, seller_id: sellerId })
      .select("*")
      .single();
    if (error) return res.status(400).json({ error: error.message });
    conversation = data;
  }
  res.json({ conversation });
});

app.get("/api/conversations/:id/messages", requireUser, async (req, res) => {
  const { data: convo } = await supabase.from("conversations").select("*").eq("id", req.params.id).maybeSingle();
  if (!convo || (convo.buyer_id !== req.user.id && convo.seller_id !== req.user.id)) {
    return res.status(404).json({ error: "Percakapan tidak ditemukan." });
  }
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", req.params.id)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error) return res.status(400).json({ error: error.message });
  if (req.profile?.role === "seller") {
    await supabase.from("conversations").update({ seller_last_read_at: new Date().toISOString() }).eq("id", req.params.id);
  } else {
    await supabase.from("conversations").update({ buyer_last_read_at: new Date().toISOString() }).eq("id", req.params.id);
  }
  res.json({ messages: messages || [] });
});

function normalizeAttachment(value) {
  if (!value || typeof value !== "object") return null;
  const type = ["image", "video"].includes(value.type) ? value.type : null;
  const url = String(value.url || "");
  if (!type || !/^https?:\/\//.test(url)) return null;
  return {
    type,
    url: url.slice(0, 2000),
    name: String(value.name || "").slice(0, 255),
    size: Number(value.size) || 0,
  };
}

app.post("/api/conversations/:id/messages", requireUser, async (req, res) => {
  const { data: convo } = await supabase.from("conversations").select("*").eq("id", req.params.id).maybeSingle();
  if (!convo || (convo.buyer_id !== req.user.id && convo.seller_id !== req.user.id)) {
    return res.status(404).json({ error: "Percakapan tidak ditemukan." });
  }
  const body = req.body || {};
  const text = String(body.text || "").trim();
  const attachment = normalizeAttachment(body.attachment);
  if (!text && !attachment) return res.status(400).json({ error: "Pesan kosong." });
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: req.params.id, sender_id: req.user.id, text: text || null, attachment })
    .select("*")
    .single();
  if (error) return res.status(400).json({ error: error.message });
  await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", req.params.id);
  res.status(201).json({ message: data });
});

app.get("/api/dashboard/admin", requireUser, requireRole("admin"), async (_req, res) => {
  const [
    { count: sellers },
    { count: buyers },
    { count: products },
    { data: categoryRows, error: categoryError },
    { data: productRows },
    { data: sellerRows },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "seller"),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "buyer"),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }).order("name", { ascending: true }),
    supabase.from("products").select("id, name, stock, category, price, status, seller_id").order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name, store_name, role").eq("role", "seller"),
  ]);
  if (categoryError) return res.status(400).json({ error: categoryError.message });

  const productsList = productRows || [];
  const categories = (categoryRows || []).map((category) => {
    const related = productsList.filter((product) => product.category === category.name || product.category === category.slug);
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      color: category.color || "#94a3b8",
      icon: category.icon,
      product_count: related.length,
      stock_total: related.reduce((sum, product) => sum + Number(product.stock || 0), 0),
    };
  });

  const topProducts = [...productsList]
    .sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0))
    .slice(0, 5)
    .map((product) => ({
      id: product.id,
      name: product.name,
      stock: Number(product.stock || 0),
      category: product.category,
    }));

  const countBySeller = {};
  productsList.forEach((product) => {
    if (product.seller_id) countBySeller[product.seller_id] = (countBySeller[product.seller_id] || 0) + 1;
  });
  const topSellers = (sellerRows || [])
    .map((seller) => ({
      id: seller.id,
      name: seller.store_name || seller.full_name || "Seller",
      products: countBySeller[seller.id] || 0,
    }))
    .sort((a, b) => b.products - a.products)
    .slice(0, 5);

  const { data: orderRows } = await supabase
    .from("orders")
    .select("id, buyer_id, order_number, status, payment_method, payment_group, courier, shipping_address, subtotal, product_fee, insurance_fee, shipping_fee, total, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  const ordersList = orderRows || [];
  const paidStatuses = ["paid", "shipped", "completed"];
  const revenueOrders = ordersList.filter((o) => paidStatuses.includes(o.status));
  const totalRevenue = revenueOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const commissionRevenue = revenueOrders.reduce((sum, o) => sum + Number(o.product_fee || 0), 0);
  const now = new Date();
  const ordersThisMonth = ordersList.filter(
    (o) => o.created_at && new Date(o.created_at).getMonth() === now.getMonth() && new Date(o.created_at).getFullYear() === now.getFullYear()
  );
  const escrowHeldFunds = ordersList
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalPayoutToSellers = totalRevenue - commissionRevenue;

  const paymentCounts = {};
  ordersList.forEach((o) => {
    const key = o.payment_method || o.payment_group || "Lainnya";
    paymentCounts[key] = (paymentCounts[key] || 0) + 1;
  });
  const paymentMethods = Object.entries(paymentCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  res.json({
    stats: {
      sellers: sellers || 0,
      buyers: buyers || 0,
      products: products || 0,
      categories: categories.length,
    },
    categories,
    products: topProducts,
    sellers: topSellers,
    orders: {
      total: ordersList.length,
      thisMonth: ordersThisMonth.length,
      totalRevenue,
      commissionRevenue,
      escrowHeldFunds,
      totalPayoutToSellers,
      revenueOrders: revenueOrders.length,
    },
    paymentMethods,
  });
});

app.get("/api/dashboard/seller", requireUser, requireRole("seller", "admin"), async (req, res) => {
  const sellerId = req.profile.role === "admin" && req.query.sellerId ? String(req.query.sellerId) : req.user.id;
  const { data: products, error } = await supabase.from("products").select("*").eq("seller_id", sellerId);
  if (error) return res.status(400).json({ error: error.message });
  const list = products || [];

  const { data: sellerItems } = await supabase
    .from("order_items")
    .select("order_id, subtotal")
    .eq("seller_id", sellerId);
  const itemRows = sellerItems || [];
  const orderIds = [...new Set(itemRows.map((i) => i.order_id))];

  let revenue = 0;
  let activeOrders = 0;
  let totalOrders = 0;
  let orderMap = {};

  if (orderIds.length) {
    const { data: sellerOrderRows } = await supabase
      .from("orders")
      .select("id, status, created_at")
      .in("id", orderIds);
    orderMap = Object.fromEntries((sellerOrderRows || []).map((o) => [o.id, o]));
    const activeStats = new Set();
    itemRows.forEach((i) => {
      const order = orderMap[i.order_id];
      if (!order) return;
      totalOrders += 1;
      if (["paid", "shipped", "completed"].includes(order.status)) {
        revenue += Number(i.subtotal || 0);
      }
      if (["waiting_payment", "paid", "shipped"].includes(order.status)) {
        activeStats.add(order.id);
      }
    });
    activeOrders = activeStats.size;
  }

  const sorted = [...list].sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0));
  const recentProducts = sorted.slice(0, 5).map((p) => ({
    id: p.id,
    name: p.name,
    stock: Number(p.stock || 0),
    price: Number(p.price || 0),
    status: p.status,
    category: p.category,
    image_url: p.image_url,
  }));

  const weekdayMeta = [
    { day: "Min", key: "seller.daySun" },
    { day: "Sen", key: "seller.dayMon" },
    { day: "Sel", key: "seller.dayTue" },
    { day: "Rab", key: "seller.dayWed" },
    { day: "Kam", key: "seller.dayThu" },
    { day: "Jum", key: "seller.dayFri" },
    { day: "Sab", key: "seller.daySat" },
  ];
  const weekly = weekdayMeta.map((w) => ({ ...w, value: 0 }));
  const nowRef = new Date();
  itemRows.forEach((i) => {
    const order = orderMap[i.order_id];
    if (!order || !order.created_at) return;
    const d = new Date(order.created_at);
    if (nowRef.getTime() - d.getTime() >= 0 && nowRef.getTime() - d.getTime() <= 7 * 24 * 3600 * 1000) {
      weekly[d.getDay()].value += Number(i.subtotal || 0);
    }
  });

  res.json({
    stats: {
      products: list.length,
      active: list.filter((p) => p.status === "active").length,
      lowStock: list.filter((p) => p.stock > 0 && p.stock <= 5).length,
      outOfStock: list.filter((p) => p.stock <= 0 || p.status === "out_of_stock").length,
      totalRevenue: revenue,
      totalOrders,
      activeOrders,
    },
    recentProducts,
    weekly,
  });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err.message || "Kesalahan server." });
});

app.listen(port, () => {
  console.log(`ElektroMart API berjalan di http://localhost:${port}`);
  void ensureDefaultCategories();
});
