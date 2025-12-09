import { Rss } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  {
    name: "Substack",
    description: "Direct integration with your Substack newsletter archives",
    logo: "S",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    name: "Beehiiv",
    description: "Seamless connection to Beehiiv newsletters",
    logo: "B",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    name: "RSS Feeds",
    description: "Any newsletter with an RSS feed works perfectly",
    logo: null,
    icon: Rss,
    color: "bg-primary/10 text-primary",
  },
];

interface IntegrationsProps {
  standalone?: boolean;
}

const Integrations = ({ standalone = false }: IntegrationsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (standalone) {
        // Set initial visibility to ensure elements are visible
        gsap.set([badgeRef.current, headingRef.current, descriptionRef.current, bottomTextRef.current], {
          opacity: 1
        });

        // Set cards to visible initially with permanent tilt
        const cards = cardsRef.current?.children;
        if (cards) {
          Array.from(cards).forEach((card, index) => {
            const permanentRotation = index === 0 ? -3 : index === 2 ? 3 : 0;
            gsap.set(card, { opacity: 1, rotation: permanentRotation });
          });
        }

        // Immediate animations for standalone page
        const tl = gsap.timeline();
        
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(descriptionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

        // Cards animation with stagger - KEEP PERMANENT ROTATION
        if (cards && cards.length > 0) {
          Array.from(cards).forEach((card, index) => {
            const permanentRotation = index === 0 ? -3 : index === 2 ? 3 : 0;
            gsap.fromTo(card,
              {
                opacity: 0,
                y: 60,
                rotation: permanentRotation * 3,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                rotation: permanentRotation, // Keep the permanent tilt
                scale: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.6 + (index * 0.15),
              }
            );
          });
        }

        // Bottom text animation
        tl.fromTo(bottomTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      } else {
        // Scroll-triggered animations for homepage section
        gsap.from(badgeRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });

        // Cards animation with stagger - KEEP PERMANENT ROTATION
        const cards = cardsRef.current?.children;
        if (cards) {
          Array.from(cards).forEach((card, index) => {
            const permanentRotation = index === 0 ? -3 : index === 2 ? 3 : 0;
            gsap.fromTo(card,
              {
                scrollTrigger: {
                  trigger: cardsRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 60,
                rotation: permanentRotation * 3,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                rotation: permanentRotation, // Keep permanent tilt
                scale: 1,
                duration: 1,
                ease: "power3.out",
                delay: index * 0.15,
              }
            );
          });
        }

        // Bottom text animation
        gsap.from(bottomTextRef.current, {
          scrollTrigger: {
            trigger: bottomTextRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, [standalone]);

  return (
    <section id="integrations" ref={sectionRef} className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p ref={badgeRef} className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Integrations</p>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Works with your stack
          </h2>
          <p ref={descriptionRef} className="text-lg text-muted-foreground">
            Connect your existing newsletter platform in one click. 
            We support all major providers and any RSS feed.
          </p>
        </div>

        {/* Integration Cards - Permanently Tilted */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="group relative bg-background border border-border p-8 transition-all duration-300 hover:border-primary hover:shadow-xl cursor-pointer"
            >
              <div className={`w-16 h-16 ${integration.color} flex items-center justify-center mb-6 text-2xl font-bold`}>
                {integration.logo || (integration.icon && <integration.icon className="w-8 h-8" />)}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 tracking-tight">
                {integration.name}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {integration.description}
              </p>

              <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p ref={bottomTextRef} className="text-center text-sm text-muted-foreground mt-12">
          Don&apos;t see your platform? <a href="#" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Request an integration</a>
        </p>
      </div>
    </section>
  );
};

export default Integrations;