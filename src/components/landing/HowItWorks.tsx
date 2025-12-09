import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlowingMenu, FlowingMenuItem } from "@/components/ui/flowing-menu";
import { ProcessStepper, StepperCard } from "@/components/ui/process-stepper";

gsap.registerPlugin(ScrollTrigger);

const steps = [
{
  number: "01",
  title: "Connect",
  description: "Link your Substack, Beehiiv, or paste your RSS feed URL. We'll import your entire archive automatically.",
  visual: "import"
},
{
  number: "02",
  title: "Analyze",
  description: "Our AI scans your content for patterns, engagement signals, and topic opportunities you might have missed.",
  visual: "analyze"
},
{
  number: "03",
  title: "Generate",
  description: "Get SEO-optimized topic suggestions and complete markdown drafts tailored to your unique voice.",
  visual: "generate"
},
{
  number: "04",
  title: "Publish",
  description: "Export your polished drafts and publish with confidence. Watch your engagement soar.",
  visual: "publish"
}];


const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create menu items from steps
  const menuItems: FlowingMenuItem[] = steps.map((step, index) => ({
    id: `step-${index}`,
    label: step.title,
    number: step.number
  }));

  // Function to start auto-advance timer
  const startAutoAdvance = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000);
  };

  // Handle menu item click - change active step and reset timer
  const handleMenuClick = (id: string) => {
    const stepIndex = parseInt(id.split("-")[1]);
    setActiveStep(stepIndex);

    // Reset the timer when user manually clicks
    startAutoAdvance();
  };

  // Auto-advance to next step every 5 seconds with loop
  useEffect(() => {
    startAutoAdvance();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Create stepper cards with visual components
  const stepperCards: StepperCard[] = steps.map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description,
    visual: step.visual === "import" ?
    <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm font-mono">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-muted-foreground">Connecting to Substack...</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-[hsl(42,88%,63%)] rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground">147 newsletters imported</p>
      </div> :
    step.visual === "analyze" ?
    <div className="grid grid-cols-3 gap-4">
        {["Topics", "Engagement", "SEO"].map((label) =>
      <div key={label} className="text-center">
            <div className="text-2xl font-bold text-[hsl(42,88%,63%)] mb-1">
              {label === "Topics" ? "24" : label === "Engagement" ? "89%" : "A+"}
            </div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
      )}
      </div> :
    step.visual === "generate" ?
    <div className="space-y-2 font-mono text-sm">
        <div className="text-[hsl(42,88%,63%)]"># Your Next Newsletter</div>
        <div className="text-muted-foreground">
          <span className="text-foreground">**Topic:**</span> Growth strategies...
        </div>
        <div className="text-muted-foreground">
          <span className="text-foreground">**Hook:**</span> What if I told you...
        </div>
      </div> :

    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[hsl(42,88%,63%)]/10 flex items-center justify-center">
            <span className="text-[hsl(42,88%,63%)] font-bold">✓</span>
          </div>
          <span className="text-sm font-medium">Ready to publish</span>
        </div>
        <div className="px-4 py-2 bg-[hsl(42,88%,63%)] text-[hsl(240,2%,13%)] text-sm font-medium">
          Export
        </div>
      </div>

  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4
      });

      // Menu animation
      gsap.from(menuRef.current, {
        scrollTrigger: {
          trigger: menuRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // Stepper animation
      gsap.from(stepperRef.current, {
        scrollTrigger: {
          trigger: stepperRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-32 overflow-hidden bg-gradient-to-br from-[hsl(42,88%,63%)]/5 via-background to-background relative !w-[99.9%] !h-[1506px]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p ref={badgeRef} className="text-sm font-medium text-[hsl(42,88%,63%)] uppercase tracking-wider mb-4">
            Process
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            How it <span className="text-[hsl(42,88%,63%)]">works</span>
          </h2>
          <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            From import to publish in four simple steps. No technical knowledge required.
          </p>
          
          {/* Flowing Menu */}
          <div ref={menuRef} className="w-full max-w-2xl mx-auto px-4">
            <FlowingMenu
              items={menuItems}
              activeItem={`step-${activeStep}`}
              onItemClick={handleMenuClick} />

          </div>
        </div>

        {/* Process Stepper */}
        <div ref={stepperRef} className="max-w-7xl mx-auto">
          <ProcessStepper
            cards={stepperCards}
            activeIndex={activeStep} />

        </div>
      </div>
    </section>);

};

export default HowItWorks;