import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen boot sequence
    const hasSeenBoot = localStorage.getItem('has_seen_boot');
    if (hasSeenBoot) {
      onComplete();
      return;
    }

    // Sequence timing
    const timers = [
      setTimeout(() => setStep(1), 1000), // Logo fade in
      setTimeout(() => setStep(2), 3000), // Pulse animation
      setTimeout(() => setStep(3), 5000), // Text reveal
      setTimeout(() => {
        localStorage.setItem('has_seen_boot', 'true');
        onComplete();
      }, 9000), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    localStorage.setItem('has_seen_boot', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gm-bg flex flex-col items-center justify-center text-gm-text overflow-hidden">
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Logo Circle */}
            <div className={`w-32 h-32 rounded-full border-2 border-gm-border flex items-center justify-center ${step >= 2 ? 'animate-pulse-slow' : ''}`}>
              <div className="w-24 h-24 rounded-full bg-gm-surface flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl font-bold tracking-tighter">A</span>
              </div>
            </div>
            
            {/* Pulse Rings */}
            {step >= 2 && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-gm-purple/20"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-gm-purple/10"
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-12 text-center"
          >
            <h1 className="text-2xl font-mono font-light tracking-[0.2em] text-gm-text/80">
              INITIALIZING GOD MODE
            </h1>
            <div className="mt-4 flex gap-1 justify-center">
              <span className="w-1 h-1 bg-gm-purple/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 bg-gm-purple/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 bg-gm-purple/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 0.5 : 0 }}
        whileHover={{ opacity: 1 }}
        onClick={handleSkip}
        className="absolute bottom-8 text-xs font-mono tracking-widest uppercase text-gm-muted hover:text-gm-text transition-colors"
      >
        [ Skip Sequence ]
      </motion.button>
    </div>
  );
}
