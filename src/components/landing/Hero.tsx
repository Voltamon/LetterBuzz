import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation with bounce
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      // Heading animation - split lines with stagger
      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 60,
        rotationX: -45,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      // Description animation with blur effect
      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      // Buttons animation with scale
      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.9,
      });

      // Stats animation with counter effect
      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 1.2,
      });

      // Optimized Floating cards entrance animations with improved easing
      gsap.from(card1Ref.current, {
        opacity: 0,
        y: -100,
        x: 80,
        rotation: 20,
        scale: 0.7,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.from(card2Ref.current, {
        opacity: 0,
        y: 100,
        x: -80,
        rotation: -20,
        scale: 0.7,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.6,
      });

      gsap.from(card3Ref.current, {
        opacity: 0,
        y: 100,
        x: 60,
        rotation: 15,
        scale: 0.7,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.8,
      });

      // Enhanced continuous floating animation with perfectly smooth infinite loops
      gsap.to(card1Ref.current, {
        y: -25,
        x: 15,
        rotation: 3,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(card2Ref.current, {
        y: 25,
        x: -15,
        rotation: -3,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });

      gsap.to(card3Ref.current, {
        y: 20,
        x: 10,
        rotation: 2,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      });

      // Enhanced interactive hover effects with smoother transitions
      const cards = [
        { ref: card1Ref.current, scale: 1.08, z: 60 },
        { ref: card2Ref.current, scale: 1.08, z: 60 },
        { ref: card3Ref.current, scale: 1.08, z: 60 }
      ];
      
      cards.forEach(({ ref, scale, z }) => {
        if (!ref) return;
        
        ref.addEventListener("mouseenter", () => {
          gsap.to(ref, {
            scale,
            z,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        ref.addEventListener("mouseleave", () => {
          gsap.to(ref, {
            scale: 1,
            z: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Beams */}
      <BackgroundBeams />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - Asymmetric */}
          <div className="lg:col-span-7 space-y-8">
            <div 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-[hsl(16,78%,49%)]/30 text-sm"
            >
              <Sparkles className="w-4 h-4 text-[hsl(16,78%,49%)]" />
              <span className="text-muted-foreground">AI-Powered Newsletter Analytics</span>
            </div>
            
            <h1 
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="block">Amplify your</span>
              <span className="block text-[hsl(16,78%,49%)]">newsletter</span>
              <span className="block">with AI insights</span>
            </h1>
            
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Analyze your Substack, Beehiiv, or RSS archives. Get AI-powered topic suggestions 
              and SEO-optimized drafts that drive audience engagement.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Button size="lg" className="group bg-[hsl(16,78%,49%)] hover:bg-[hsl(16,78%,45%)]">
                Start analyzing
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-[hsl(16,78%,49%)]/30 hover:bg-[hsl(16,78%,49%)]/10">
                View demo
              </Button>
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="flex flex-wrap gap-12 pt-8 pb-8 md:pb-0 border-t border-[hsl(16,78%,49%)]/20">
              <div>
                <p className="text-3xl font-bold text-[hsl(16,78%,49%)]">10K+</p>
                <p className="text-sm text-muted-foreground">Newsletters analyzed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[hsl(16,78%,49%)]">45%</p>
                <p className="text-sm text-muted-foreground">Avg. engagement boost</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[hsl(16,78%,49%)]">2M+</p>
                <p className="text-sm text-muted-foreground">Drafts generated</p>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Floating Cards */}
          <div className="lg:col-span-5 relative h-[500px] hidden lg:block" style={{ perspective: '1500px' }}>
            {/* Card 1 - Top */}
            <div 
              ref={card1Ref}
              className="absolute top-0 right-0 w-72 bg-card border border-[hsl(16,78%,49%)]/30 p-6 shadow-2xl cursor-pointer will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[hsl(16,78%,49%)]/10 flex items-center justify-center">
                  <span className="text-[hsl(16,78%,49%)] text-lg">📊</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Topic Analysis</p>
                  <p className="text-xs text-muted-foreground">AI-detected trending topics</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-[hsl(16,78%,49%)]/80 w-3/4" />
                  <span className="text-xs text-muted-foreground">78%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-[hsl(16,78%,49%)]/60 w-1/2" />
                  <span className="text-xs text-muted-foreground">52%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-[hsl(16,78%,49%)]/40 w-1/3" />
                  <span className="text-xs text-muted-foreground">34%</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Middle */}
            <div 
              ref={card2Ref}
              className="absolute top-1/3 left-0 w-64 bg-card border border-[hsl(16,78%,49%)]/30 p-5 shadow-2xl cursor-pointer will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Generated Draft</p>
              <div className="font-mono text-xs bg-background p-3 border border-[hsl(16,78%,49%)]/20">
                <p className="text-[hsl(16,78%,49%)]"># Top 5 Growth Tips</p>
                <p className="text-muted-foreground mt-2">Your newsletter has shown...</p>
              </div>
            </div>

            {/* Card 3 - Bottom */}
            <div 
              ref={card3Ref}
              className="absolute bottom-0 right-12 w-60 bg-card border border-[hsl(16,78%,49%)]/30 p-5 shadow-2xl cursor-pointer will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium">SEO Score: 94/100</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>✓ Keyword optimization</p>
                <p>✓ Meta description ready</p>
                <p>✓ Readability: Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;