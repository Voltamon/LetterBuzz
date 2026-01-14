import { Button } from "@/components/ui/button";
import { CardNav, type NavItem } from "@/components/ui/card-nav";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useRef, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { Menu } from "lucide-react";

const tabs: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active tab based on current route
  const activeTab = useMemo(() => {
    const currentPath = location.pathname;
    const matchedTab = tabs.find(tab => tab.href === currentPath);
    return matchedTab?.id || "home";
  }, [location.pathname]);

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

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
          <img src="/LetterBuzz.png" alt="LetterBuzz Logo" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <span className="font-semibold text-base sm:text-lg tracking-tight">LetterBuzz</span>
        </div>

        {/* Desktop Card Nav */}
        <div ref={navItemsRef} className="hidden md:block flex-shrink-0">
          <CardNav items={tabs} defaultActive={activeTab} />
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleMobileNavClick(tab.href)}
                  className={`text-left px-4 py-3 rounded-md transition-colors ${activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground hover:bg-muted'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">

                <Button className="w-full" asChild>
                  <Link to="/app">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Buttons */}
        <div ref={buttonsRef} className="hidden md:flex items-center gap-2 sm:gap-3 flex-shrink-0">

          <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4" asChild>
            <Link to="/app">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;