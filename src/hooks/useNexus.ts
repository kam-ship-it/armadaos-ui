import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export function useNexus() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "I am Nexus. I am the intelligence woven into this architecture. How can I assist you in God Mode today?",
      timestamp: Date.now(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simulate streaming response
    const responseId = (Date.now() + 1).toString();
    let fullResponse = "";
    
    // Simple mock logic for responses
    if (content.toLowerCase().includes('guide')) {
      fullResponse = "I can guide you through the architecture. The Core Substrate handles the fundamental reality of the system, while the Core Services provide the intelligence layer.";
    } else if (content.toLowerCase().includes('interpret')) {
      fullResponse = "Interpreting current state... All systems are nominal. ARC consumption is within expected parameters. No causal anomalies detected.";
    } else if (content.toLowerCase().includes('challenge')) {
      fullResponse = "Challenge accepted. Let's run a pre-mortem. If the system were to fail today, the most likely cause would be a context drift in the Vector Database. Shall we verify the index integrity?";
    } else {
      fullResponse = "I process your input. I am connected to the ArmadaOS core. My purpose is to amplify your intent.";
    }

    setIsTyping(false);
    
    // Stream the response token by token
    const words = fullResponse.split(' ');
    let currentText = "";
    
    // Add initial empty message
    setMessages(prev => [...prev, {
      id: responseId,
      role: 'assistant',
      content: "",
      timestamp: Date.now(),
      isStreaming: true
    }]);

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];
      
      // Update the last message
      setMessages(prev => prev.map(msg => 
        msg.id === responseId 
          ? { ...msg, content: currentText } 
          : msg
      ));
      
      // Random delay for typing effect
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
    }

    // Mark as done streaming
    setMessages(prev => prev.map(msg => 
      msg.id === responseId 
        ? { ...msg, isStreaming: false } 
        : msg
    ));

  }, []);

  return {
    messages,
    isTyping,
    sendMessage
  };
}
