import { useRef, useEffect } from 'react';
import { useNexus } from '@/hooks/useNexus';
import { NexusMessage } from './NexusMessage';
import { NexusInput } from './NexusInput';

export function NexusChat() {
  const { messages, isTyping, sendMessage } = useNexus();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[var(--gm-onyx)] border-l border-[var(--gm-graphite)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--gm-graphite)] flex items-center justify-between shrink-0">
        <h3 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--gm-violet)] rounded-full animate-pulse" />
          Nexus Intelligence
        </h3>
        <span className="text-[10px] font-mono text-[var(--gm-silver)]">v2.1.0</span>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
      >
        {messages.map(msg => (
          <NexusMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--gm-graphite)] shrink-0">
        <NexusInput onSend={sendMessage} disabled={isTyping} />
        <div className="mt-2 text-[10px] text-center text-[var(--gm-graphite-light)]">
          Nexus can make mistakes. Verify critical intel.
        </div>
      </div>
    </div>
  );
}
