import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const comparisonFeatures = [
  { 
    category: "Email Volume", 
    starter: "1,000/month", 
    professional: "10,000/month", 
    enterprise: "Unlimited" 
  },
  { 
    category: "Email Templates", 
    starter: "Basic", 
    professional: "Advanced", 
    enterprise: "Custom" 
  },
  { 
    category: "Email Tracking", 
    starter: true, 
    professional: true, 
    enterprise: true 
  },
  { 
    category: "Analytics & Reporting", 
    starter: "Basic", 
    professional: "Advanced", 
    enterprise: "Advanced" 
  },
  { 
    category: "A/B Testing", 
    starter: false, 
    professional: true, 
    enterprise: true 
  },
  { 
    category: "Team Members", 
    starter: "1", 
    professional: "5", 
    enterprise: "Unlimited" 
  },
  { 
    category: "API Access", 
    starter: false, 
    professional: true, 
    enterprise: true 
  },
  { 
    category: "Custom Integrations", 
    starter: false, 
    professional: true, 
    enterprise: true 
  },
  { 
    category: "Priority Support", 
    starter: false, 
    professional: false, 
    enterprise: true 
  },
  { 
    category: "Dedicated Account Manager", 
    starter: false, 
    professional: false, 
    enterprise: true 
  },
  { 
    category: "White-label Options", 
    starter: false, 
    professional: false, 
    enterprise: true 
  },
  { 
    category: "Custom SLA", 
    starter: false, 
    professional: false, 
    enterprise: true 
  },
];

const Pricing = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

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

      // Comparison table animation
      if (comparisonRef.current) {
        gsap.fromTo(comparisonRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative">
        {/* Pricing Header Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative bg-gradient-to-br from-[hsl(16,78%,49%)]/5 via-background to-background">
          {/* Header */}
          <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-tight">
              Simple, transparent{" "}
              <span className="text-primary">pricing</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card border-2 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.featured
                    ? "border-primary md:scale-105"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ opacity: 1 }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{plan.description}</p>
                </div>

                <div className="mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full text-sm"
                  variant={plan.featured ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table Section */}
        <section ref={comparisonRef} className="py-12 sm:py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
                Compare Plans
              </h2>
              
              {/* Desktop Table */}
              <div className="hidden md:block bg-card border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4 font-bold text-foreground">Feature</TableHead>
                      <TableHead className="text-center font-bold text-foreground">Starter</TableHead>
                      <TableHead className="text-center font-bold text-foreground bg-primary/5">Professional</TableHead>
                      <TableHead className="text-center font-bold text-foreground">Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonFeatures.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{feature.category}</TableCell>
                        <TableCell className="text-center">{renderCell(feature.starter)}</TableCell>
                        <TableCell className="text-center bg-primary/5">{renderCell(feature.professional)}</TableCell>
                        <TableCell className="text-center">{renderCell(feature.enterprise)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 sm:space-y-6">
                {pricingPlans.map((plan) => (
                  <div key={plan.name} className="bg-card border rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-center pb-3 border-b">
                      {plan.name}
                    </h3>
                    <div className="space-y-3">
                      {comparisonFeatures.map((feature, index) => {
                        const value = plan.name === "Starter" 
                          ? feature.starter 
                          : plan.name === "Professional" 
                          ? feature.professional 
                          : feature.enterprise;
                        
                        return (
                          <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                              {feature.category}
                            </span>
                            <div className="text-xs sm:text-sm font-semibold">
                              {renderCell(value)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[hsl(186,47%,63%)]/5 via-background to-background relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                Frequently asked questions
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-l-4 border-primary pl-4 sm:pl-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                    Can I change plans later?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-4 sm:pl-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also pay via invoice.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-4 sm:pl-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                    Is there a free trial?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
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