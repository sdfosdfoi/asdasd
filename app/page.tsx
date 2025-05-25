import { HeroSection } from '@/components/home/hero-section';
import { CategorySection } from '@/components/home/category-section';
import { LatestListings } from '@/components/home/latest-listings';
import { SellerBenefits } from '@/components/home/seller-benefits';

export default function Home() {
  return (
    <div className="space-y-12 pb-10">
      <HeroSection />
      <CategorySection />
      <LatestListings />
      <SellerBenefits />
    </div>
  );
}