import ProductDetail from "@/components/produk/ProductDetail";
import { getAllProducts } from "@/lib/data";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetail productId={params.id} />;
}