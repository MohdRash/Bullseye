import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  timestamp: Date;
}

interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
}

interface AIContextType {
  conversations: AIConversation[];
  currentConversation: AIConversation | null;
  isLoading: boolean;
  sendMessage: (message: string) => void;
  createNewConversation: () => void;
  generateCode: (prompt: string) => void;
  explainCode: (code: string) => void;
  optimizeCode: (code: string) => void;
  findBugs: (code: string) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<AIConversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewConversation = () => {
    const newConversation: AIConversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
  };

  const sendMessage = async (message: string) => {
    if (!currentConversation) {
      createNewConversation();
      return;
    }

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    // Add user message
    setCurrentConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, userMessage]
    } : null);

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date()
      };

      setCurrentConversation(prev => prev ? {
        ...prev,
        messages: [...prev.messages, aiResponse]
      } : null);

      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (prompt: string): string => {
    const responses = [
      "I can help you with that! Here's what I suggest...",
      "That's a great question. Let me break it down for you:",
      "Based on your code, I notice a few things that could be improved:",
      "Here's a solution that should work for your use case:",
      "I'd recommend the following approach:"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateCode = (prompt: string) => {
    sendMessage(`Generate code for: ${prompt}`);
  };

  const explainCode = (code: string) => {
    sendMessage(`Please explain this code:\n\`\`\`\n${code}\n\`\`\``);
  };

  const optimizeCode = (code: string) => {
    sendMessage(`How can I optimize this code?\n\`\`\`\n${code}\n\`\`\``);
  };

  const findBugs = (code: string) => {
    sendMessage(`Please find any bugs in this code:\n\`\`\`\n${code}\n\`\`\``);
  };

  return (
    <AIContext.Provider value={{
      conversations,
      currentConversation,
      isLoading,
      sendMessage,
      createNewConversation,
      generateCode,
      explainCode,
      optimizeCode,
      findBugs
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};