import { Message } from '@/hooks/useNexus';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { StreamingText } from './StreamingText';

interface NexusMessageProps {
  message: Message;
}

export function NexusMessage({ message }: NexusMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 max-w-[90%]",
        isAssistant ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
        isAssistant 
          ? "bg-[var(--gm-onyx)] border-[var(--gm-violet)]/30 text-[var(--gm-violet)]" 
          : "bg-[var(--gm-surface)] border-[var(--gm-graphite)] text-[var(--gm-silver)]"
      )}>
        {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div className={cn(
        "p-3 rounded-lg text-sm leading-relaxed border",
        isAssistant 
          ? "bg-[var(--gm-onyx)]/50 border-[var(--gm-graphite)] text-[var(--gm-snow)]" 
          : "bg-[var(--gm-violet)]/10 border-[var(--gm-violet)]/20 text-[var(--gm-sno      )}>\n        <StreamingText text={message.content} isStreaming={message.isStreaming} />\n      </div> </motion.div>
  );
}
