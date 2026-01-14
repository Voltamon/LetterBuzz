"use client";

import { FeatureAccordion, AccordionItem } from "@/components/ui/feature-accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureItems: AccordionItem[] = [
{
  id: "archive",
  title: "Archive Import",
  image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
  content: [
  {
    heading: "Seamless Integration",
    description: "Connect your Substack, Beehiiv, or any RSS feed in seconds. We handle the heavy lifting."
  },
  {
    heading: "Instant Analysis",
    description: "Your entire content history is analyzed immediately to identify patterns and opportunities."
  },
  {
    heading: "Universal Compatibility",
    description: "Works with all major newsletter platforms and custom RSS feeds."
  }]

},
{
  id: "topic",
  title: "Topic Discovery",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  content: [
  {
    heading: "AI-Powered Insights",
    description: "AI analyzes patterns in your content to suggest topics your audience craves."
  },
  {
    heading: "Trend Identification",
    description: "Discover emerging trends and topics before they become mainstream."
  },
  {
    heading: "Audience Alignment",
    description: "Get topic suggestions that align with your unique voice and audience preferences."
  }]

},
{
  id: "analytics",
  title: "Engagement Analytics",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  content: [
  {
    heading: "Deep Reader Insights",
    description: "Deep insights into what resonates with your readers and drives engagement."
  },
  {
    heading: "Performance Metrics",
    description: "Track opens, clicks, and conversions with detailed analytics dashboards."
  },
  {
    heading: "Content Optimization",
    description: "Learn which topics, formats, and styles generate the best results."
  }]

},
{
  id: "drafts",
  title: "Markdown Drafts",
  image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
  content: [
  {
    heading: "SEO-Optimized Content",
    description: "Get SEO-optimized drafts ready to publish. Export in clean markdown format for any platform."
  },
  {
    heading: "Platform Flexibility",
    description: "Export to Substack, Ghost, Medium, or any markdown-compatible platform."
  },
  {
    heading: "Edit-Ready Format",
    description: "Clean, structured markdown that's easy to edit and customize to your style."
  }]

},
{
  id: "generation",
  title: "Quick Generation",
  image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  content: [
  {
    heading: "Lightning Fast",
    description: "From analysis to draft in under 60 seconds. No more staring at blank screens."
  },
  {
    heading: "Smart Suggestions",
    description: "AI-generated content that matches your tone and writing style perfectly."
  },
  {
    heading: "Ready to Publish",
    description: "Get publication-ready drafts that need minimal editing before sending."
  }]

},
{
  id: "growth",
  title: "Growth Focus",
  image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  content: [
  {
    heading: "Subscriber Growth",
    description: "Every suggestion is optimized for subscriber growth and retention."
  },
  {
    heading: "Retention Strategies",
    description: "Keep your existing subscribers engaged with content they love."
  },
  {
    heading: "Conversion Optimization",
    description: "Turn casual readers into loyal subscribers with data-driven content strategies."
  }]

}];


const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized scroll-triggered animations with smoother settings
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5 // Smooth scroll-linked animation
        },
        opacity: 0,
        y: 20,
        ease: "power2.out"
      });

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5
        },
        opacity: 0,
        y: 30,
        ease: "power2.out"
      });

      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5
        },
        opacity: 0,
        y: 20,
        ease: "power2.out"
      });

      // Accordion entrance animation - lighter and smoother
      gsap.from(accordionRef.current, {
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 85%",
          end: "top 65%",
          toggleActions: "play none none reverse",
          scrub: 0.5
        },
        opacity: 0,
        y: 40,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="pt-8 md:pt-16 pb-2 md:pb-4 bg-background relative overflow-hidden !w-[99.9%] !h-[938px] !py-14">
      <div className="container mx-auto px-4 md:px-6 !w-full !h-[743px] !my-0 !py-[7px]">
        <div className="max-w-2xl mb-8 md:mb-12">
          <p ref={badgeRef} className="text-sm font-medium text-[hsl(16,78%,49%)] uppercase tracking-wider mb-2">Features</p>
          <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-3">
            How we help you <span className="text-[hsl(16,78%,49%)]">grow</span>
          </h2>
          <p ref={descriptionRef} className="text-base md:text-lg text-muted-foreground">
            Discover the methodology behind creating newsletters that engage, convert, and scale.
          </p>
        </div>

        <div ref={accordionRef} className="w-full">
          <FeatureAccordion items={featureItems} defaultOpen="archive" />
        </div>
      </div>
    </section>);

};

export default Features;