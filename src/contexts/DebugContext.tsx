import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Breakpoint {
  file: string;
  line: number;
  condition?: string;
}

interface Variable {
  name: string;
  value: string;
  type: string;
}

interface CallStackFrame {
  function: string;
  file: string;
  line: number;
}

interface WatchExpression {
  expression: string;
  value: string;
}

interface DebugContextType {
  isDebugging: boolean;
  isPaused: boolean;
  breakpoints: Breakpoint[];
  variables: Variable[];
  callStack: CallStackFrame[];
  watchExpressions: WatchExpression[];
  startDebugging: () => void;
  stopDebugging: () => void;
  pauseDebugging: () => void;
  resumeDebugging: () => void;
  stepOver: () => void;
  stepInto: () => void;
  stepOut: () => void;
  addBreakpoint: (file: string, line: number) => void;
  removeBreakpoint: (file: string, line: number) => void;
  addWatchExpression: (expression: string) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const DebugProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([
    { file: 'src/components/IDE.tsx', line: 45 },
    { file: 'src/utils/helpers.ts', line: 12 }
  ]);

  const [variables, setVariables] = useState<Variable[]>([]);
  const [callStack, setCallStack] = useState<CallStackFrame[]>([]);
  const [watchExpressions, setWatchExpressions] = useState<WatchExpression[]>([
    { expression: 'activeFile', value: 'src/components/IDE.tsx' },
    { expression: 'openFiles.length', value: '3' }
  ]);

  const startDebugging = () => {
    setIsDebugging(true);
    setIsPaused(true);
    
    // Simulate debug session
    setVariables([
      { name: 'activeFile', value: 'src/components/IDE.tsx', type: 'string' },
      { name: 'openFiles', value: 'Array(3)', type: 'array' },
      { name: 'showTerminal', value: 'true', type: 'boolean' }
    ]);

    setCallStack([
      { function: 'handleKeyDown', file: 'src/components/IDE.tsx', line: 45 },
      { function: 'addEventListener', file: 'browser', line: 0 },
      { function: 'main', file: 'src/main.tsx', line: 8 }
    ]);
  };

  const stopDebugging = () => {
    setIsDebugging(false);
    setIsPaused(false);
    setVariables([]);
    setCallStack([]);
  };

  const pauseDebugging = () => {
    setIsPaused(true);
  };

  const resumeDebugging = () => {
    setIsPaused(false);
  };

  const stepOver = () => {
    // Simulate step over
    console.log('Step over');
  };

  const stepInto = () => {
    // Simulate step into
    console.log('Step into');
  };

  const stepOut = () => {
    // Simulate step out
    console.log('Step out');
  };

  const addBreakpoint = (file: string, line: number) => {
    setBreakpoints(prev => [...prev, { file, line }]);
  };

  const removeBreakpoint = (file: string, line: number) => {
    setBreakpoints(prev => prev.filter(bp => !(bp.file === file && bp.line === line)));
  };

  const addWatchExpression = (expression: string) => {
    setWatchExpressions(prev => [...prev, { expression, value: 'undefined' }]);
  };

  return (
    <DebugContext.Provider value={{
      isDebugging,
      isPaused,
      breakpoints,
      variables,
      callStack,
      watchExpressions,
      startDebugging,
      stopDebugging,
      pauseDebugging,
      resumeDebugging,
      stepOver,
      stepInto,
      stepOut,
      addBreakpoint,
      removeBreakpoint,
      addWatchExpression
    }}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};