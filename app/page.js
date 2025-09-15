import HeroSection from "./components/HomePageComponents/HeroSection";
import CategoryList from "./components/HomePageComponents/CategoryList";
import FeaturedCategories from "./components/HomePageComponents/featuredSection";
import NewArrivals from "./components/HomePageComponents/NewArrivals";
import GallerySection from "./components/HomePageComponents/GallerySection";

export default function Home() {
  return (
    <main className="min-h-screen pb-30">
      <HeroSection />
      <CategoryList />
      <FeaturedCategories />
      <GallerySection/>
      <NewArrivals />
    </main>
  );
}