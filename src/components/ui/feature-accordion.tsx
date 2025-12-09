"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  image?: string;
  content: {
    heading: string;
    description: string;
  }[];
}

interface FeatureAccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
  autoPlayInterval?: number; // milliseconds
}

export const FeatureAccordion = ({
  items,
  className,
  autoPlayInterval = 10000
}: FeatureAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect with timer reset capability
  const startTimer = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        return prev === items.length - 1 ? 0 : prev + 1;
      });
    }, autoPlayInterval);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [items.length, autoPlayInterval]);

  const currentItem = items[activeIndex];
  const barOnLeft = activeIndex % 2 === 0;

  const handlePrevious = () => {
    setActiveIndex((prev) => {
      // Don't loop - stay at first feature
      if (prev === 0) return prev;
      return prev - 1;
    });
    startTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      // Don't loop - stay at last feature
      if (prev === items.length - 1) return prev;
      return prev + 1;
    });
    startTimer();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cardWidth = rect.width;

    // Click on left half = previous, right half = next
    if (clickX < cardWidth / 2) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <div
      className="!w-[99.9%] !h-full">




      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* 3D Card Container with Layered Effect - GPU Accelerated */}
        <div className="relative gpu-accelerated" style={{ perspective: '1000px' }}>
          {/* Shadow Card 1 - Deepest layer */}
          <div
            className={cn(
              "absolute inset-0 w-full h-[400px] md:h-[500px]",
              "bg-card/40 border border-border/40",
              "transform translate-x-3 translate-y-3 blur-[1px]",
              "gpu-accelerated"
            )}
            style={{
              zIndex: 0,
              transformStyle: 'preserve-3d'
            }} />

          
          {/* Shadow Card 2 - Middle layer */}
          <div
            className={cn(
              "absolute inset-0 w-full h-[400px] md:h-[500px]",
              "bg-card/70 border border-border/70",
              "transform translate-x-1.5 translate-y-1.5",
              "gpu-accelerated"
            )}
            style={{
              zIndex: 1,
              transformStyle: 'preserve-3d'
            }} />

          
          {/* Main Card - Top layer - Optimized transitions */}
          <div
            onClick={handleCardClick}
            className={cn(
              "relative flex items-stretch overflow-hidden w-full cursor-pointer",
              "bg-card border-2 border-border",
              "shadow-xl h-[400px] md:h-[500px]",
              "gpu-accelerated"
            )}
            style={{
              zIndex: 2,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) translateX(-2px)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) translateX(0)';
              e.currentTarget.style.boxShadow = '';
            }}>

            {/* Animated Orange Bar - Optimized with GPU acceleration */}
            <motion.div
              initial={{ left: "0%" }}
              animate={{
                left: barOnLeft ? "0%" : "calc(100% - 120px)"
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.8
              }}
              className={cn(
                "absolute top-0 bottom-0 w-[120px]",
                "flex flex-col items-center justify-center h-full",
                "bg-primary overflow-hidden z-10",
                "gpu-accelerated"
              )}>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`bar-content-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center h-full py-8">

                  <div className="font-bold mb-4 text-primary-foreground/30 text-4xl lg:text-5xl">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="flex items-center justify-center flex-1">
                    <h3
                      className="font-bold tracking-tight whitespace-nowrap text-primary-foreground text-lg lg:text-2xl"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed"
                      }}>

                      {currentItem.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Content Section - Optimized animations */}
            <div className="flex-1 overflow-hidden w-full">
              <div
                className={cn(
                  "flex flex-col h-full overflow-y-auto smooth-scroll p-4 md:p-6 lg:p-12",
                  barOnLeft ? "pl-[130px] md:pl-[140px] items-end text-right" : "pr-[130px] md:pr-[140px] items-start text-left"
                )}
                style={{ transition: 'padding 0.6s ease-out' }}>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeIndex}`}
                    initial={{
                      opacity: 0,
                      x: barOnLeft ? 40 : -40
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: barOnLeft ? -40 : 40
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="space-y-3 md:space-y-4 lg:space-y-5 w-full max-w-2xl py-2 gpu-accelerated">

                    {currentItem.content.map((section, sectionIndex) =>
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + sectionIndex * 0.08,
                        duration: 0.35,
                        ease: "easeOut"
                      }}
                      className="space-y-0.5 md:space-y-1">

                        <h4 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                          {section.heading}
                        </h4>
                        <p className="text-xs md:text-sm lg:text-lg text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator - GPU accelerated */}
        <div className="flex items-center justify-center gap-2">
          {items.map((_, index) =>
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "h-2 rounded-full gpu-accelerated",
              index === activeIndex ?
              "w-8 bg-primary" :
              "w-2 bg-border hover:bg-muted-foreground"
            )}
            style={{ transition: 'all 0.3s ease-out' }}
            aria-label={`Go to feature ${index + 1}`} />

          )}
        </div>
      </div>
    </div>);

};