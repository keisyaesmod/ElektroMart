import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "./Hero";
import TrustBadges from "./TrustBadges";
import Categories from "./Categories";
import FlashSale from "./FlashSale";
import BestSellers from "./BestSellers";
import Brands from "./Brands";
import PromoBanners from "./PromoBanners";

export default function BerandaPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBadges />
      <Categories />
      <FlashSale />
      <BestSellers />
      <Brands />
      <PromoBanners />
      <Footer />
    </main>
  );
}
