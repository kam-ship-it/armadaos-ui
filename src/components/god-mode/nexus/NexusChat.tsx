import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useNexus, Message } from '../../../hooks/useNexus';

function NexusMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "flex gap-3 mb-4",
        message.role === 'user' ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div className={clsx(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
        message.role === 'nexus' 
          ? "bg-gm-surface border-gm-purple/30 text-gm-purple" 
          : "bg-gm-elevated border-gm-border text-gm-secondary"
      )}>
        {message.role === 'nexus' ? 'N' : 'U'}
      </div>
      
      <div className={clsx(
        "max-w-[80%] p-3 rounded-lg text-sm font-mono leading-relaxed",
        message.role === 'nexus' 
          ? "bg-gm-surface border border-gm-border text-gm-text" 
          : "bg-gm-elevated border border-gm-border text-gm-text"
      )}>
        {message.content}
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-gm-purple animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}

export function NexusChat() {
  const { messages, sendMessage, isTyping } = useNexus();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gm-bg border-l border-gm-border">
      {/* Header */}
      <div className="p-4 border-b border-gm-border bg-gm-surface/50 backdrop-blur-sm">
        <h2 className="text-sm font-mono text-gm-secondary uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gm-purple animate-pulse" />
          Nexus Intelligence
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <NexusMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gm-border bg-gm-surface/30">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nexus anything..."
            className="w-full bg-gm-bg border border-gm-border rounded-lg px-4 py-3 text-sm font-mono text-gm-text focus:outline-none focus:border-gm-purple focus:ring-1 focus:ring-gm-purple/50 transition-all placeholder:text-gm-muted"
          />
          {/* TC-01: Pulsing glow when active/typing */}
          <div className={clsx(
            "absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-500",
            input ? "opacity-100 shadow-[0_0_15px_rgba(124,58,237,0.1)]" : "opacity-0"
          )} />
        </form>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-[10px] font-mono text-gm-muted">
            {isTyping ? "Nexus is thinking..." : "Nexus v1.0 Online"}
          </span>
          <span className="text-[10px] font-mono text-gm-muted">
            Press Enter to send
          </span>
        </div>
      </div>
    </div>
  );
}
