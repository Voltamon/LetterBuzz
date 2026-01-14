import Hero from "@/components/landing/Hero";
import Integrations from "@/components/landing/Integrations";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Integrations standalone={true} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;