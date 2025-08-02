import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Experts from "@/components/Experts";
import Testimonials from "@/components/Testimonials";
import ContentLibrary from "@/components/ContentLibrary";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Experts />
      <Testimonials />
      <ContentLibrary />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;