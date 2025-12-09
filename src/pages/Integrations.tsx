import Navbar from "@/components/landing/Navbar";
import Integrations from "@/components/landing/Integrations";
import Footer from "@/components/landing/Footer";

const IntegrationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Integrations standalone={true} />
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationsPage;
