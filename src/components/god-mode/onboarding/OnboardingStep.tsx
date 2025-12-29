import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface OnboardingStepProps {
  title: string;
  description: string;
  children?: ReactNode;
  isActive: boolean;
}

export function OnboardingStep({ title, description, children, isActive }: OnboardingStepProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-[var(--gm-snow)] mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-[var(--gm-silver)] mb-8 leading-relaxed">
        {description}
      </p>
      {children}
    </motion.div>
  );
}
