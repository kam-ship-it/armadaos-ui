import { useState, useEffect } from 'react';

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  speed?: number; // ms per character
}

export function StreamingText({ text, isStreaming = false, speed = 20 }: StreamingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(text);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [text, isStreaming, currentIndex, speed]);

  // Reset when text changes
  useEffect(() => {
    setCurrentIndex(0);
    setDisplayed(isStreaming ? '' : text);
  }, [text, isStreaming]);

  return (
    <>
      {displayed}
      {isStreaming && currentIndex < text.length && (
        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-[var(--gm-violet)] animate-pulse" />
      )}
    </>
  );
}
