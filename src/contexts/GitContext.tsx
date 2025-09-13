import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GitFile {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'renamed';
}

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

interface GitContextType {
  currentBranch: string;
  branches: string[];
  changes: {
    staged: GitFile[];
    unstaged: GitFile[];
  };
  commits: GitCommit[];
  isLoading: boolean;
  commitMessage: string;
  setCommitMessage: (message: string) => void;
  stageFile: (path: string) => void;
  unstageFile: (path: string) => void;
  commitChanges: () => void;
  createBranch: (name: string) => void;
  switchBranch: (name: string) => void;
  pullChanges: () => void;
  pushChanges: () => void;
}

const GitContext = createContext<GitContextType | undefined>(undefined);

export const GitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches] = useState(['main', 'develop', 'feature/new-ui']);
  const [commitMessage, setCommitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [changes, setChanges] = useState({
    staged: [] as GitFile[],
    unstaged: [
      { path: 'src/components/IDE.tsx', status: 'modified' as const },
      { path: 'src/styles/global.css', status: 'modified' as const },
      { path: 'src/utils/helpers.ts', status: 'added' as const }
    ]
  });

  const [commits] = useState([
    {
      hash: 'a1b2c3d4',
      message: 'Add AI assistant integration',
      author: 'Developer',
      date: '2 hours ago'
    },
    {
      hash: 'e5f6g7h8',
      message: 'Implement live collaboration features',
      author: 'Developer',
      date: '1 day ago'
    },
    {
      hash: 'i9j0k1l2',
      message: 'Enhanced debugging capabilities',
      author: 'Developer',
      date: '2 days ago'
    }
  ]);

  const stageFile = (path: string) => {
    setChanges(prev => {
      const fileToStage = prev.unstaged.find(f => f.path === path);
      if (!fileToStage) return prev;

      return {
        staged: [...prev.staged, fileToStage],
        unstaged: prev.unstaged.filter(f => f.path !== path)
      };
    });
  };

  const unstageFile = (path: string) => {
    setChanges(prev => {
      const fileToUnstage = prev.staged.find(f => f.path === path);
      if (!fileToUnstage) return prev;

      return {
        staged: prev.staged.filter(f => f.path !== path),
        unstaged: [...prev.unstaged, fileToUnstage]
      };
    });
  };

  const commitChanges = () => {
    if (commitMessage.trim() && changes.staged.length > 0) {
      setIsLoading(true);
      // Simulate commit
      setTimeout(() => {
        setChanges(prev => ({ ...prev, staged: [] }));
        setCommitMessage('');
        setIsLoading(false);
      }, 1000);
    }
  };

  const createBranch = (name: string) => {
    // Simulate branch creation
    console.log(`Creating branch: ${name}`);
  };

  const switchBranch = (name: string) => {
    setCurrentBranch(name);
  };

  const pullChanges = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const pushChanges = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <GitContext.Provider value={{
      currentBranch,
      branches,
      changes,
      commits,
      isLoading,
      commitMessage,
      setCommitMessage,
      stageFile,
      unstageFile,
      commitChanges,
      createBranch,
      switchBranch,
      pullChanges,
      pushChanges
    }}>
      {children}
    </GitContext.Provider>
  );
};

export const useGit = () => {
  const context = useContext(GitContext);
  if (!context) {
    throw new Error('useGit must be used within a GitProvider');
  }
  return context;
};