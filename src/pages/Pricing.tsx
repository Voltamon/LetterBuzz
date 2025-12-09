import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const pricingPlans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 1,000 emails per month",
      "Basic email templates",
      "Email tracking & analytics",
      "24/7 email support",
      "1 team member",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Professional",
    price: "79",
    description: "Ideal for growing businesses with advanced needs",
    features: [
      "Up to 10,000 emails per month",
      "Advanced email templates",
      "Priority email tracking",
      "A/B testing & optimization",
      "Up to 5 team members",
      "API access",
      "Custom integrations",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "For large organizations requiring full control",
    features: [
      "Unlimited emails per month",
      "Custom email templates",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Unlimited team members",
      "Priority support",
      "White-label options",
      "Custom SLA",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

const Pricing = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure cards are visible from the start
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.set(cards, { opacity: 1, clearProps: "all" });
      }

      // Header animations
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Pricing cards animations - ensure visibility
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.6,
            clearProps: "opacity", // Clear opacity after animation
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative">
        {/* Pricing Header Section */}
        <section className="container mx-auto px-6 pt-32 pb-24 relative bg-gradient-to-br from-[hsl(16,78%,49%)]/5 via-background to-background">
          {/* Header */}
          <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Simple, transparent{" "}
              <span className="text-primary">pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.featured
                    ? "border-primary scale-105 md:scale-110"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ opacity: 1 }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-[hsl(186,47%,63%)]/5 via-background to-background relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Can I change plans later?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also pay via invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Is there a free trial?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! All plans come with a 14-day free trial. No credit card required to get started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;