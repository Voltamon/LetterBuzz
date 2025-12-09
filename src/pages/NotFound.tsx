import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container fade in
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      });

      // 404 number animation with glitch effect
      gsap.fromTo(numberRef.current,
        { 
          opacity: 0, 
          y: -50,
          scale: 0.8,
          rotationX: -45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.2,
        }
      );

      // Continuous floating animation for 404 number
      gsap.to(numberRef.current, {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Text animations with stagger
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(messageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.7,
      });

      // Buttons animation with stagger
      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.9,
      });

      // Add subtle pulse to the container
      gsap.to(containerRef.current, {
        boxShadow: "0 0 30px rgba(255, 119, 51, 0.1)",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[hsl(16,78%,49%)]/5 via-background to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 text-center bg-card border border-border p-12 max-w-2xl mx-4"
      >
        <h1 
          ref={numberRef}
          className="mb-6 text-8xl md:text-9xl font-bold text-primary"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          404
        </h1>
        
        <p 
          ref={textRef}
          className="mb-4 text-2xl md:text-3xl font-semibold"
        >
          Oops! Page not found
        </p>
        
        <p 
          ref={messageRef}
          className="mb-8 text-base md:text-lg text-muted-foreground max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="group w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group w-full sm:w-auto border-primary/30 hover:bg-primary/10"
            onClick={() => window.location.href = "/"}
          >
            <Home className="mr-2 w-5 h-5" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;