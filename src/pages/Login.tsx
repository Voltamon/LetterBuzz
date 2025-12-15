import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

export default function Login() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formHeaderRef = useRef<HTMLDivElement>(null);
  const googleBtnRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const termsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setIsSignUp(searchParams.get("mode") === "signup");
  }, [searchParams]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      if (headingRef.current) {
        tl.fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      if (barsRef.current) {
        tl.fromTo(barsRef.current.children,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, stagger: 0.15 },
          "-=0.3"
        );
      }

      if (formHeaderRef.current) {
        tl.fromTo(formHeaderRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5 },
          "-=0.6"
        );
      }

      if (googleBtnRef.current) {
        tl.fromTo(googleBtnRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.3"
        );
      }

      if (footerRef.current) {
        tl.fromTo(footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );
      }

      if (termsRef.current) {
        tl.fromTo(termsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0.5, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
    if (descRef.current) {
      gsap.fromTo(descRef.current,
        { opacity: 0.5 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    if (formHeaderRef.current) {
      gsap.fromTo(formHeaderRef.current,
        { opacity: 0.5, x: 10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isSignUp]);

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/auth/google/login";
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div ref={leftPanelRef} className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/25 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link ref={logoRef} to="/" className="mb-12">
            <h1 className="text-4xl font-bold text-foreground">
              Newsletter<span className="text-primary">Navigator</span>
            </h1>
          </Link>

          <h2 ref={headingRef} className="text-5xl font-bold text-foreground leading-tight mb-6">
            {isSignUp ? "Start your journey" : "Welcome back"}
          </h2>
          <p ref={descRef} className="text-xl text-muted-foreground max-w-md">
            {isSignUp
              ? "Join thousands of readers who organize their newsletters effortlessly."
              : "Your curated newsletter inbox awaits. Sign in to continue reading."}
          </p>

          <div ref={barsRef} className="mt-16 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-gradient-to-r from-primary/60 to-accent/60"
                style={{ opacity: 0.3 + i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={formContainerRef} className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10">
            <Link to="/">
              <h1 className="text-2xl font-bold text-foreground">
                Newsletter<span className="text-primary">Navigator</span>
              </h1>
            </Link>
          </div>

          <div ref={formHeaderRef} className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isSignUp ? "Create account" : "Sign in"}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp
                ? "Get started with your Google account"
                : "Continue with your Google account"}
            </p>
          </div>

          <Button
            ref={googleBtnRef}
            type="button"
            variant="outline"
            className="w-full h-14 mb-6 border-border hover:bg-muted/50 transition-all duration-200 text-base"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <p ref={footerRef} className="mt-8 text-center text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

          <p ref={termsRef} className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}