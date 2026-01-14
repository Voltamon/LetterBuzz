import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src="/LetterBuzz.png" alt="LetterBuzz Logo" className="w-8 h-8 object-contain" />
            <span className="font-semibold">LetterBuzz</span>
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            AI-powered newsletter analytics and content generation.
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 LetterBuzz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;