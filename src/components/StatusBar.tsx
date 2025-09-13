import React from 'react';
import { GitBranch, AlertCircle, CheckCircle, Zap } from 'lucide-react';
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
    <div className="h-6 bg-[#007acc] flex items-center justify-between px-3 text-white text-xs">
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
        
        <div className="flex items-center gap-1">
          <Zap size={12} />
          <span>WebIDE</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;