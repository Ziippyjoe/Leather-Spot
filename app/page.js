import CategoryList from "./components/HomePageComponents/CategoryList";
import HeroSection from "./components/HomePageComponents/HeroSection";

export default function Home() {
  return (
    <main className="pt-12 min-h-screen">
      <HeroSection/>
      <CategoryList />
    </main>
  );
}