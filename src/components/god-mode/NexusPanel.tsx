import { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface NexusPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function NexusPanel({ isOpen, onToggle }: NexusPanelProps) {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // TODO: Implement Nexus API call
    console.log('Nexus Query:', query);
    setQuery('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  return (
    <div className={clsx(
      "h-full border-l border-armada-border bg-armada-surface flex flex-col transition-all duration-300 ease-in-out relative",
      isOpen ? "w-[320px]" : "w-0 border-l-0"
    )}>
      {/* Toggle Button (Outside panel when closed, inside when open) */}
      <button
        onClick={onToggle}
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 w-6 h-12 bg-armada-surface border border-armada-border flex items-center justify-center hover:bg-white/5 transition-colors z-30",
          isOpen ? "-left-3 border-r-0 rounded-l" : "-left-6 border-r-0 rounded-l"
        )}
      >
        <div className="w-1 h-4 bg-armada-text-muted/50 rounded-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-12 border-b border-armada-border flex items-center px-4 shrink-0">
              <span className="text-armada-text font-mono text-sm">NEXUS AI</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-armada-green animate-pulse" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-4">
              <div className="text-armada-text-muted">
                Nexus online. Systems nominal.
                <br />
                Standing by for command.
              </div>
              
              {isTyping && (
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-armada-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-armada-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-armada-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-armada-border bg-armada-bg/50">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Command Nexus..."
                  className="w-full bg-armada-bg border border-armada-border rounded px-3 py-2 text-sm font-mono text-armada-text focus:outline-none focus:border-armada-purple focus:ring-1 focus:ring-armada-purple placeholder:text-armada-text-muted/50"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
