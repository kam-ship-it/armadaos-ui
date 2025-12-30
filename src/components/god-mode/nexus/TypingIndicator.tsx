import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 max-w-[90%] self-start"
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-[var(--gm-onyx)] border-[var(--gm-violet)]/30 text-[var(--gm-violet)]">
        <Bot className="w-4 h-4" />
      </div>

      <div className="p-3 rounded-lg text-sm leading-relaxed border bg-[var(--gm-onyx)]/50 border-[var(--gm-graphite)] text-[var(--gm-snow)]">
        <div className="flex gap-1.5">
          <motion.div
            className="w-2 h-2 bg-[var(--gm-violet)] rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-[var(--gm-violet)] rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-[var(--gm-violet)] rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
