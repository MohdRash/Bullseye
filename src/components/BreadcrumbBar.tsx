import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

const BreadcrumbBar: React.FC = () => {
  const { activeFile } = useEditor();

  if (!activeFile) {
    return (
      <div className="h-full bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-3">
        <div className="flex items-center gap-2 text-sm text-[#6a737d]">
          <Home size={14} />
          <span>No file selected</span>
        </div>
      </div>
    );
  }

  const pathParts = activeFile.split('/');
  
  return (
    <div className="h-full bg-[#2d2d30] border-b border-[#3e3e42] flex items-center px-3 overflow-x-auto">
      <div className="flex items-center gap-1 text-sm whitespace-nowrap">
        <Home size={14} className="text-[#cccccc] flex-shrink-0" />
        
        {pathParts.map((part, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="text-[#6a737d] flex-shrink-0" />
            <button
              className={`hover:bg-[#3e3e42] px-2 py-1 rounded transition-colors ${
                index === pathParts.length - 1 
                  ? 'text-[#cccccc] font-medium' 
                  : 'text-[#6a737d] hover:text-[#cccccc]'
              }`}
            >
              {part}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BreadcrumbBar;