import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Participant {
  id: string;
  name: string;
  color: string;
  isHost: boolean;
  isViewing: boolean;
  cursor?: { x: number; y: number };
}

interface CollaborationContextType {
  isSessionActive: boolean;
  sessionId: string;
  participants: Participant[];
  shareLink: string;
  startSession: () => void;
  endSession: () => void;
  inviteUser: (email: string) => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const CollaborationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSessionActive, setIsSessionActive] = useState(true); // Demo: start with active session
  const [sessionId] = useState('abc-def-123');
  const [shareLink] = useState('https://webide.dev/share/abc-def-123');
  
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'You',
      color: '#007acc',
      isHost: true,
      isViewing: true
    },
    {
      id: '2',
      name: 'Alice',
      color: '#73c991',
      isHost: false,
      isViewing: true
    },
    {
      id: '3',
      name: 'Bob',
      color: '#f9c23c',
      isHost: false,
      isViewing: false
    }
  ]);

  const startSession = () => {
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
  };

  const inviteUser = (email: string) => {
    console.log(`Inviting user: ${email}`);
    // Simulate sending invitation
  };

  return (
    <CollaborationContext.Provider value={{
      isSessionActive,
      sessionId,
      participants,
      shareLink,
      startSession,
      endSession,
      inviteUser
    }}>
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};