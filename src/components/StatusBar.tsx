import React from 'react';
import { GitBranch, AlertCircle, CheckCircle, Zap, Cpu, Wifi, Activity, Brain } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

const StatusBar: React.FC = () => {
  const { activeFile, openFiles } = useEditor();
  
  const activeFileObj = openFiles.find(f => f.path === activeFile);
  const language = activeFileObj ? 
    activeFileObj.name.split('.').pop()?.toLowerCase() || 'txt' : '';
  
  const getLanguageDisplay = (lang: string): string => {
    const langMap: { [key: string]: string } = {
      js: 'JavaScript',
      ts: 'TypeScript',
      tsx: 'TypeScript React',
      jsx: 'JavaScript React',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      md: 'Markdown',
      py: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      php: 'PHP',
      rb: 'Ruby',
      go: 'Go',
      rs: 'Rust',
      sql: 'SQL',
      xml: 'XML',
      yaml: 'YAML',
      yml: 'YAML'
    };
    return langMap[lang] || lang.toUpperCase();
  };

  return (
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-white text-xs relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#007acc] via-[#106ba3] to-[#007acc] animate-pulse opacity-20" />
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        
        <div className="flex items-center gap-1">
          <CheckCircle size={12} />
          <span>0</span>
          <AlertCircle size={12} className="ml-2" />
          <span>0</span>
        </div>
        
        {/* Performance Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" title="CPU Usage">
            <Cpu size={12} />
            <span>45%</span>
          </div>
          <div className="flex items-center gap-1" title="Memory Usage">
            <Activity size={12} />
            <span>2.1GB</span>
          </div>
          <div className="flex items-center gap-1" title="Network">
            <Wifi size={12} />
            <span>1.2MB/s</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {activeFileObj && (
          <>
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>{getLanguageDisplay(language)}</span>
          </>
        )}
        
        {/* AI Status */}
        <div className="flex items-center gap-1" title="AI Assistant Active">
          <Brain size={12} className="animate-pulse" />
          <span>AI Ready</span>
        </div>
        
        {/* Live Collaboration Status */}
        <div className="flex items-center gap-1" title="3 collaborators online">
          <div className="w-2 h-2 bg-[#73c991] rounded-full animate-pulse" />
          <span>3 online</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Zap size={12} />
          <span>WebIDE Pro</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;