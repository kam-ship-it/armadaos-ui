import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OnboardingStep } from './OnboardingStep';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { playSound } from '@/lib/sounds';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const steps = [
    {
      title: "Welcome to God Mode",
      description: "You are entering the supreme control interface of ArmadaOS. Here, you have total visibility and command over the entire architecture.",
    },
    {
      title: "Identify Yourself",
      description: "I am Nexus, your intelligent co-pilot. Who am I addressing?",
      input: true,
    },
    {
      title: `Greetings, ${name}`,
      description: "I have calibrated the interface to your biometrics. You now have Level 5 clearance.",
    },
    {
      title: "The Three Lenses",
      description: "You will navigate through three primary lenses: Architecture (Structure), Constitution (Law), and Battlefield (Action).",
    },
    {
      title: "Ready to Begin?",
      description: "The system is primed. Your command awaits.",
      action: "Initialize God Mode",
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Play sound when initializing God Mode
      playSound('initialize', 0.3);
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--gm-onyx)] text-[var(--gm-snow)]">
      <div className="w-full max-w-2xl p-8">
        <AnimatePresence mode="wait">
          <OnboardingStep 
            key={step}
            title={steps[step].title}
            description={steps[step].description}
            isActive={true}
          >
            {steps[step].input && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-xs bg-transparent border-b border-[var(--gm-graphite)] text-center text-xl py-2 focus:outline-none focus:border-[var(--gm-violet)] transition-colors mb-8"
                autoFocus
              />
            )}

            <Button 
              onClick={handleNext}
              disabled={steps[step].input && !name.trim()}
              className="bg-[var(--gm-violet)] hover:bg-[var(--gm-violet)]/90 text-white px-8 py-6 text-lg rounded-full group"
            >
              {steps[step].action || "Continue"}
              {step === steps.length - 1 ? (
                <Check className="ml-2 w-5 h-5" />
              ) : (
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </OnboardingStep>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === step ? "bg-[var(--gm-violet)]" : "bg-[var(--gm-graphite)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
