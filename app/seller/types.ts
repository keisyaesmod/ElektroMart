export type ProductStatus = "Aktif" | "Habis" | "Draft";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  imageSrc: string;
}

export type OrderStatus =
  | "PERLU DIPROSES"
  | "SIAP DIKIRIM"
  | "DIKIRIM"
  | "SELESAI"
  | "DIBATALKAN";

export interface OrderItem {
  id: string;
  code: string;
  date: string;
  productName: string;
  variant: string;
  qty: number;
  unitPrice: number;
  buyerName: string;
  courier: string;
  total: number;
  status: OrderStatus;
  imageSrc: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Selesai" | "Tertunda";
}
