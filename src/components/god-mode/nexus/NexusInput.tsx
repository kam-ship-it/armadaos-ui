import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NexusInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function NexusInput({ onSend, disabled }: NexusInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-r from-[var(--gm-violet)] to-blue-500 rounded-lg opacity-0 transition duration-500 group-focus-within:opacity-30 blur",
        disabled && "hidden"
      )} />
      
      <div className="relative flex items-center bg-[var(--gm-onyx)] border border-[var(--gm-graphite)] rounded-lg overflow-hidden transition-colors group-focus-within:border-[var(--gm-violet)]/50">
        <div className="pl-3 text-[var(--gm-violet)]">
          <Sparkles className="w-4 h-4" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Nexus..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none text-sm text-[var(--gm-snow)] placeholder:text-[var(--gm-graphite-light)] focus:ring-0 px-3 py-3"
        />
        
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="p-2 mr-1 text-[var(--gm-silver)] hover:text-[var(--gm-snow)] disabled:opacity-30 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
