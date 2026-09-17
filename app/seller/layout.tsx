import type { ReactNode } from "react";
import SellerShell from "./SellerShell";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return <SellerShell>{children}</SellerShell>;
}
