import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepperCard {
  number: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

interface ProcessStepperProps {
  cards: StepperCard[];
  activeIndex: number;
  className?: string;
}

export const ProcessStepper = ({ 
  cards, 
  activeIndex, 
  className 
}: ProcessStepperProps) => {
  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Steps Navigation */}
      <div className="flex items-center justify-center gap-2 md:gap-4">
        {cards.map((card, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          
          return (
            <div key={index} className="flex items-center">
              {/* Step Circle */}
              <motion.div
                className="relative"
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm md:text-base font-bold transition-all duration-300 relative z-10",
                    isActive && "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                    isCompleted && "border-primary bg-primary/10 text-primary",
                    !isActive && !isCompleted && "border-border bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    card.number
                  )}
                </div>
                
                {/* Active indicator ring */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>
              
              {/* Connector Line */}
              {index < cards.length - 1 && (
                <div className="w-12 md:w-20 lg:w-32 h-0.5 bg-border mx-2 md:mx-3 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < activeIndex ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Card Content */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-card border-2 border-primary p-6 md:p-8 lg:p-10 shadow-xl shadow-primary/10">
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border-2 border-primary bg-primary/10">
              <span className="font-mono text-lg md:text-xl font-bold text-primary">
                {cards[activeIndex].number}
              </span>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                {cards[activeIndex].title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
            {cards[activeIndex].description}
          </p>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="bg-background border border-primary/30 p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative z-10">
              {cards[activeIndex].visual}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Step Labels (Mobile) */}
      <div className="flex md:hidden justify-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Step {activeIndex + 1} of {cards.length}
          </p>
          <p className="font-medium text-sm">
            {cards[activeIndex].title}
          </p>
        </div>
      </div>
    </div>
  );
};
