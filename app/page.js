import HeroSection from "./components/HomePageComponents/HeroSection";
import CategoryList from "./components/HomePageComponents/CategoryList";
import FeaturedCategories from "./components/HomePageComponents/featuredSection";
import NewArrivals from "./components/HomePageComponents/NewArrivals";

export default function Home() {
  return (
    <main className="pt-28 min-h-screen">
      <HeroSection />
      <CategoryList />
      <FeaturedCategories />
      <NewArrivals />
    </main>
  );
}