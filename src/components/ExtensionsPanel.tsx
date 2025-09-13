import React from 'react';
import { Download, Star, Verified } from 'lucide-react';

const ExtensionsPanel: React.FC = () => {
  const extensions = [
    { name: 'Prettier', description: 'Code formatter', stars: '12.5M', verified: true },
    { name: 'ESLint', description: 'JavaScript linting', stars: '8.2M', verified: true },
    { name: 'GitLens', description: 'Git supercharged', stars: '6.1M', verified: true },
    { name: 'Live Server', description: 'Local development server', stars: '4.8M', verified: false },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider mb-3">Extensions</h3>
        <input
          type="text"
          placeholder="Search Extensions in Marketplace"
          className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-3 space-y-3">
          {extensions.map((ext, index) => (
            <div key={index} className="p-3 border border-[#3e3e42] rounded hover:bg-[#2a2d2e] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-[#cccccc] flex items-center gap-1">
                  {ext.name}
                  {ext.verified && <Verified size={12} className="text-blue-400" />}
                </h4>
                <button className="p-1 hover:bg-[#3c3c3c] rounded transition-colors">
                  <Download size={14} className="text-[#cccccc]" />
                </button>
              </div>
              <p className="text-sm text-[#6a737d] mb-2">{ext.description}</p>
              <div className="flex items-center gap-1 text-xs text-[#6a737d]">
                <Star size={10} />
                <span>{ext.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPanel;