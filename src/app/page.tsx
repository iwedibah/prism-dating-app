import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HeroStats from "@/components/home/HeroStats";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedListings from "@/components/home/FeaturedListings";
import PassportSection from "@/components/home/PassportSection";
import LandlordCTA from "@/components/home/LandlordCTA";
import Testimonials from "@/components/home/Testimonials";
import FeaturedUniversities from "@/components/home/FeaturedUniversities";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HeroStats />
        <HowItWorks />
        <FeaturedListings />
        <PassportSection />
        <LandlordCTA />
        <Testimonials />
        <FeaturedUniversities />
      </main>
      <Footer />
    </>
  );
}
