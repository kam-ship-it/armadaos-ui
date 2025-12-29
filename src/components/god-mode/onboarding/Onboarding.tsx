import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface OnboardingProps {
  onComplete: () => void;
}

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to God Mode',
    message: "I am Nexus, your cognitive interface to the Immutable Supercomputer. Before we begin, how should I address you?",
    type: 'input',
    placeholder: 'Enter your name...'
  },
  {
    id: 'lens-intro',
    title: 'Three Lenses, One Truth',
    message: "God Mode is structured around three lenses: The Architecture (System), The Constitution (Law), and The Battlefield (Execution). I will guide you through each.",
    type: 'info'
  },
  {
    id: 'nexus-intro',
    title: 'I Am Your Co-Pilot',
    message: "I am always here. I monitor the system, interpret events, and predict threats. You can ask me anything, anytime.",
    type: 'info'
  },
  {
    id: 'ready',
    title: 'System Ready',
    message: "The machine is humming. The laws are set. The battlefield awaits. Are you ready to take control?",
    type: 'action',
    actionLabel: "Let's Begin"
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const currentStep = STEPS[stepIndex];

  const handleNext = () => {
    if (currentStep.type === 'input') {
      if (!inputValue.trim()) return;
      setUserName(inputValue);
    }
    
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      // TC-03: Sound + Visual Flourish
      const audio = new Audio('/sounds/startup.mp3'); // Placeholder path
      audio.play().catch(() => {}); // Ignore auto-play errors
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gm-bg/95 backdrop-blur-md">
      <div className="w-full max-w-lg p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // TC-05: Laws of Motion
            className="bg-gm-surface border border-gm-border rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gm-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-gm-surface border border-gm-purple/30 flex items-center justify-center mb-6 text-gm-purple shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                N
              </div>

              <h2 className="text-2xl font-light text-gm-text mb-4">{currentStep.title}</h2>
              
              <p className="text-gm-secondary text-lg leading-relaxed mb-8 font-light">
                {currentStep.message.replace('{{name}}', userName)}
              </p>

              {currentStep.type === 'input' && (
                <div className="mb-8">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentStep.placeholder}
                    className="w-full bg-gm-bg border border-gm-border rounded-lg px-4 py-3 text-gm-text focus:outline-none focus:border-gm-purple focus:ring-1 focus:ring-gm-purple/50 transition-all"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <div 
                      key={i} 
                      className={clsx(
                        "w-2 h-2 rounded-full transition-colors duration-300",
                        i === stepIndex ? "bg-gm-purple" : "bg-gm-border"
                      )} 
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-gm-text text-gm-bg rounded-lg font-medium hover:bg-white transition-colors shadow-lg shadow-white/5"
                >
                  {currentStep.type === 'action' ? currentStep.actionLabel : 'Continue'}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
