import React from 'react';
import { Files, Search, Package, Settings, GitBranch, Bug, Bot, Users, Zap } from 'lucide-react';

interface ActivityBarProps {
  activePanel: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'ai' | 'settings';
  onPanelChange: (panel: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'ai' | 'settings') => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activePanel, onPanelChange }) => {
  const buttons = [
    { id: 'explorer' as const, icon: Files, label: 'Explorer' },
    { id: 'search' as const, icon: Search, label: 'Search' },
    { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
    { id: 'debug' as const, icon: Bug, label: 'Run and Debug' },
    { id: 'extensions' as const, icon: Package, label: 'Extensions' },
    { id: 'ai' as const, icon: Bot, label: 'AI Assistant' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-12 bg-[#2d2d30] flex flex-col border-r border-[#3e3e42]">
      <div className="flex flex-col">
        {buttons.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPanelChange(id)}
            className={`h-12 w-12 flex items-center justify-center relative group transition-colors ${
              activePanel === id
                ? 'text-white bg-[#37373d] border-l-2 border-[#007acc]'
                : 'text-[#cccccc] hover:text-white hover:bg-[#37373d]'
            }`}
            title={label}
          >
            <Icon size={20} />
            {id === 'git' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#f14c4c] rounded-full text-xs flex items-center justify-center text-white">
                3
              </div>
            )}
            {id === 'ai' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
            )}
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e1e1e] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {label}
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex-1" />
      
      <div className="mb-2">
        <button className="h-12 w-12 flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-[#37373d] transition-colors group">
          <Users size={20} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e1e1e] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Live Share
          </div>
        </button>
        <button className="h-12 w-12 flex items-center justify-center text-[#cccccc] hover:text-white hover:bg-[#37373d] transition-colors group">
          <Zap size={20} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1e1e1e] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Performance
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;