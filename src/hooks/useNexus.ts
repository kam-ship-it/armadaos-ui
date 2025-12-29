import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'nexus';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export function useNexus() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'nexus',
      content: 'I am Nexus. How can I assist you today?',
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const streamResponse = useCallback((fullText: string) => {
    const messageId = Date.now().toString();
    setIsTyping(true);
    
    // Add empty message first
    setMessages(prev => [...prev, {
      id: messageId,
      role: 'nexus',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    }]);

    let currentText = '';
    const tokens = fullText.split('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentText += tokens[index];
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: currentText } : msg
        ));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isStreaming: false } : msg
        ));
      }
    }, 30); // 30ms per token for typing effect
  }, []);

  const sendMessage = useCallback((content: string) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }]);

    // Simulate Nexus thinking & response
    setTimeout(() => {
      let response = "I'm processing your request.";
      
      // Slash commands (TC-04)
      if (content.startsWith('/guide')) {
        response = "I can explain any component in the Architecture Lens. Click on a component to see details.";
      } else if (content.startsWith('/interpret')) {
        response = "I will analyze the causal chain of the recent event. It appears to be a standard deployment sequence.";
      } else if (content.startsWith('/challenge')) {
        response = "Running pre-mortem analysis... Potential failure modes: 1. API Rate Limiting, 2. Database Latency.";
      } else {
        response = `I understand you said: "${content}". As an AI co-pilot, I am here to help you navigate the Immutable Supercomputer.`;
      }

      streamResponse(response);
    }, 600);
  }, [streamResponse]);

  return {
    messages,
    sendMessage,
    isTyping
  };
}
