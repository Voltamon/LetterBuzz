import { Button } from "@/components/ui/button";
import { CardNav, type NavItem } from "@/components/ui/card-nav";
import { useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

const tabs: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "integrations", label: "Integrations", href: "/integrations" },
];

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Determine active tab based on current route
  const activeTab = useMemo(() => {
    const currentPath = location.pathname;
    const matchedTab = tabs.find(tab => tab.href === currentPath);
    return matchedTab?.id || "home";
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animations
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(navItemsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        x: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.6,
      });

      // Navbar scroll effect
      let lastScroll = 0;
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else {
          // Scrolling up
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
        
        lastScroll = currentScroll;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <div ref={logoRef} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs sm:text-sm">LB</span>
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight">LetterBuzz</span>
        </div>
        
        {/* Card Nav */}
        <div ref={navItemsRef} className="hidden md:block flex-shrink-0">
          <CardNav items={tabs} defaultActive={activeTab} />
        </div>

        <div ref={buttonsRef} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;