import { Rss, Link2, Mail, FileText } from "lucide-react";
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

const setupGuides = [
  {
    title: "1. Substack Integration",
    icon: Mail,
    steps: [
      {
        step: "Find Your Publication URL",
        description: "Locate your Substack publication URL (e.g., yourname.substack.com)"
      },
      {
        step: "Click 'Connect Substack'",
        description: "In LetterBuzz, select the Substack integration option from your dashboard"
      },
      {
        step: "Enter Your Publication Name",
        description: "Input your Substack username or full publication URL"
      },
      {
        step: "Authorize Access",
        description: "Grant LetterBuzz read-only access to your newsletter archives"
      },
      {
        step: "Import Complete",
        description: "Your entire Substack archive will be automatically imported and analyzed. Draft generation begins immediately."
      }
    ]
  },
  {
    title: "2. Beehiiv Integration",
    icon: Link2,
    steps: [
      {
        step: "Access Your Beehiiv Settings",
        description: "Log into your Beehiiv account and navigate to Settings → Integrations"
      },
      {
        step: "Generate API Key",
        description: "Create a new API key with 'Read' permissions for your publication"
      },
      {
        step: "Connect in LetterBuzz",
        description: "Select 'Connect Beehiiv' and paste your API key"
      },
      {
        step: "Select Publications",
        description: "Choose which Beehiiv newsletters to import (supports multiple publications)"
      },
      {
        step: "Sync & Analyze",
        description: "All your posts are synced automatically. Our AI analyzes patterns and generates topic suggestions within minutes."
      }
    ]
  },
  {
    title: "3. RSS Feed Integration",
    icon: Rss,
    steps: [
      {
        step: "Locate Your RSS Feed",
        description: "Find your newsletter's RSS feed URL. Common locations: /feed, /rss, or /feed.xml"
      },
      {
        step: "Verify Feed Format",
        description: "Ensure your RSS feed is publicly accessible and contains full post content (not just excerpts)"
      },
      {
        step: "Add RSS Feed URL",
        description: "In LetterBuzz, click 'Add RSS Feed' and paste your complete feed URL"
      },
      {
        step: "Configure Settings",
        description: "Set import frequency (daily/weekly) and choose whether to import future posts automatically"
      }
    ]
  }
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
  const guidesRef = useRef<HTMLDivElement>(null);

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

        // Guides animation
        if (guidesRef.current) {
          gsap.fromTo(guidesRef.current?.children || [],
            { opacity: 0, y: 40 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.2,
              ease: "power3.out",
              delay: 1.2
            }
          );
        }
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
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
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

        {/* Setup Guides - Only show on standalone page */}
        {standalone && (
          <div className="max-w-6xl mx-auto mt-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                How to Connect & Generate Drafts
              </h3>
              <p className="text-muted-foreground text-lg">
                Follow these simple steps to connect your newsletter and start generating AI-powered drafts
              </p>
            </div>

            <div ref={guidesRef} className="grid md:grid-cols-3 gap-8">
              {setupGuides.map((guide, guideIndex) => (
                <div 
                  key={guideIndex}
                  className="bg-background border border-border p-6 rounded-lg hover:border-primary/50 transition-colors"
                >
                  {/* Guide Header */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded flex-shrink-0">
                      <guide.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold tracking-tight leading-tight pt-1">
                      {guide.title}
                    </h4>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    {guide.steps.map((stepItem, stepIndex) => (
                      <div key={stepIndex} className="relative pl-6">
                        {/* Step number indicator */}
                        <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{stepIndex + 1}</span>
                        </div>
                        
                        {/* Connecting line (except for last item) */}
                        {stepIndex < guide.steps.length - 1 && (
                          <div className="absolute left-2.5 top-5 w-px h-full bg-border" />
                        )}

                        {/* Step content */}
                        <div className="pb-4">
                          <h5 className="font-semibold text-sm mb-1">{stepItem.step}</h5>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {stepItem.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Tips Section */}
            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Tips for Best Results
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Import at least 10 newsletters</strong> for optimal AI analysis and pattern recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Keep your feed active</strong> - Enable auto-sync to continuously improve draft quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Review engagement metrics</strong> - Our AI uses open rates and clicks to suggest high-performing topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">RSS feed not working?</strong> Try adding /feed, /rss, or /feed.xml to your domain URL</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Bottom Text */}
        <p ref={bottomTextRef} className="text-center text-sm text-muted-foreground mt-12">
          Don&apos;t see your platform? <a href="#" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Request an integration</a>
        </p>
      </div>
    </section>
  );
};

export default Integrations;