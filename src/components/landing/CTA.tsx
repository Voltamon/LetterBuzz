import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card container animation with tilted entrance
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.9,
        y: 60,
        rotationY: -8,
        rotationX: 5,
        duration: 1.2,
        ease: "power3.out",
      });

      // Add continuous subtle tilt animation on scroll
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        rotationY: 3,
        rotationX: -2,
        ease: "none",
      });

      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Description animation
      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      // Buttons animation
      gsap.from(buttonsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.7,
      });

      // Features list animation
      const features = featuresRef.current?.children;
      if (features) {
        gsap.from(features, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Enhanced 3D tilt effect in all directions
      if (cardRef.current) {
        const card = cardRef.current;
        let tiltAnimationFrame: number;
        
        // Enhanced mouse move tilt - more responsive in all directions
        card.addEventListener('mousemove', (e) => {
          if (tiltAnimationFrame) {
            cancelAnimationFrame(tiltAnimationFrame);
          }

          tiltAnimationFrame = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angles - increased sensitivity for all directions
            const rotateX = ((y - centerY) / centerY) * 15; // -15 to 15 degrees (top to bottom)
            const rotateY = ((centerX - x) / centerX) * 15; // -15 to 15 degrees (left to right)
            
            // Calculate distance from center for scale effect
            const distance = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
            const maxDistance = Math.sqrt(
              Math.pow(centerX, 2) + Math.pow(centerY, 2)
            );
            const proximity = 1 - (distance / maxDistance);
            
            gsap.to(card, {
              rotationX: -rotateX, // Inverted for natural feel
              rotationY: rotateY,
              scale: 1 + (proximity * 0.02), // Subtle scale based on proximity
              transformPerspective: 1000,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
        
        card.addEventListener('mouseleave', () => {
          if (tiltAnimationFrame) {
            cancelAnimationFrame(tiltAnimationFrame);
          }
          
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        // Add continuous floating tilt animation when not hovering
        let isHovering = false;
        
        card.addEventListener('mouseenter', () => {
          isHovering = true;
        });
        
        card.addEventListener('mouseleave', () => {
          isHovering = false;
        });

        // Subtle continuous tilt animation
        gsap.to(card, {
          rotationY: 2,
          rotationX: 1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: false,
          onUpdate: function() {
            // Pause the animation if user is hovering
            if (isHovering && !this.paused()) {
              this.pause();
            } else if (!isHovering && this.paused()) {
              this.resume();
            }
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-gradient-to-br from-[hsl(240,2%,13%)]/5 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(16,78%,49%)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(186,47%,63%)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative" style={{ perspective: '2000px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card with Enhanced Tilt Effect and Shining Animation */}
          <div 
            ref={cardRef} 
            className="bg-card border-2 border-[hsl(16,78%,49%)]/30 p-10 md:p-14 lg:p-20 relative shadow-2xl cursor-pointer overflow-hidden group"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'rotateY(-2deg) rotateX(1deg)',
              willChange: 'transform'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(16,78%,49%)] via-[hsl(42,88%,63%)] to-[hsl(186,47%,63%)]" />
            
            {/* Shining effect overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 60%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shine 2s infinite'
              }}
            />
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
              <div>
                <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8">
                  Ready to <span className="text-[hsl(16,78%,49%)]">grow</span> your newsletter?
                </h2>
                <p ref={descriptionRef} className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed">
                  Join thousands of creators using AI to understand their audience 
                  and create content that converts.
                </p>
                
                <div ref={buttonsRef} className="flex flex-wrap gap-4 md:gap-5">
                  <Button size="lg" className="group text-base bg-[hsl(16,78%,49%)] hover:bg-[hsl(16,78%,45%)]">
                    Start for free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-base border-[hsl(16,78%,49%)]/30 hover:bg-[hsl(16,78%,49%)]/10">
                    Schedule demo
                  </Button>
                </div>
              </div>

              {/* Right Side - Feature List */}
              <div ref={featuresRef} className="space-y-6 md:space-y-7">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[hsl(16,78%,49%)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[hsl(16,78%,49%)] text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-base md:text-lg">Free to start</p>
                    <p className="text-sm md:text-base text-muted-foreground">No credit card required. Analyze up to 50 posts free.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[hsl(186,47%,63%)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[hsl(186,47%,63%)] text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-base md:text-lg">Export anywhere</p>
                    <p className="text-sm md:text-base text-muted-foreground">Clean markdown output works with any platform.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[hsl(42,88%,63%)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[hsl(42,88%,63%)] text-base">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-base md:text-lg">Cancel anytime</p>
                    <p className="text-sm md:text-base text-muted-foreground">No lock-in. Your data is always yours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;