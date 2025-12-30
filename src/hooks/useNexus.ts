import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_MESSAGES } from '@/graphql/queries';
import { SEND_MESSAGE } from '@/graphql/mutations';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  isStreaming?: boolean;
  metadata?: {
    model?: string;
    tokens?: number;
    latency?: number;
  };
}

interface MessagesData {
  messages: Message[];
}

interface SendMessageData {
  sendMessage: Message;
}

interface SendMessageVariables {
  content: string;
}

export const useMessages = (limit = 50, offset = 0) => {
  const { data, loading, error } = useQuery<MessagesData>(GET_MESSAGES, {
    variables: { limit, offset },
  });

  return {
    messages: data?.messages || [],
    loading,
    error,
  };
};

export const useSendMessage = () => {
  const [sendMessage, { loading, error }] = useMutation<SendMessageData, SendMessageVariables>(SEND_MESSAGE);

  return {
    sendMessage,
    loading,
    error,
  };
};

// Temporary hook for NexusChat component (will be replaced with GraphQL)
export const useNexus = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'I am Nexus. I am the intelligence woven into this architecture. How can I assist you in God Mode today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a placeholder response. GraphQL integration will provide real responses.',
        timestamp: new Date().toISOString(),
        isStreaming: true,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
};
