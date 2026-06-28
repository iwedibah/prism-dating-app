import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HeroStats from "@/components/home/HeroStats";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedListings from "@/components/home/FeaturedListings";   // Features showcase
import LandlordCTA from "@/components/home/LandlordCTA";             // Safety & Privacy
import PassportSection from "@/components/home/PassportSection";     // Travel Mode
import Testimonials from "@/components/home/Testimonials";
import FeaturedUniversities from "@/components/home/FeaturedUniversities"; // Pricing
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HeroStats />
        <HowItWorks />
        <FeaturedListings />
        <LandlordCTA />
        <PassportSection />
        <Testimonials />
        <FeaturedUniversities />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
