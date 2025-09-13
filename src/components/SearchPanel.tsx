import React, { useState } from 'react';
import { Search, Replace, CaseSensitive, Regex, WholeWord } from 'lucide-react';

const SearchPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider mb-3">Search</h3>
        
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 pr-8 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
            />
            <Search size={14} className="absolute right-2 top-2.5 text-[#6a737d]" />
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={replaceTerm}
              onChange={(e) => setReplaceTerm(e.target.value)}
              placeholder="Replace"
              className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 pr-8 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
            />
            <Replace size={14} className="absolute right-2 top-2.5 text-[#6a737d]" />
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setCaseSensitive(!caseSensitive)}
              className={`p-2 rounded transition-colors ${
                caseSensitive ? 'bg-[#007acc] text-white' : 'hover:bg-[#2a2d2e] text-[#cccccc]'
              }`}
              title="Match Case"
            >
              <CaseSensitive size={14} />
            </button>
            <button
              onClick={() => setWholeWord(!wholeWord)}
              className={`p-2 rounded transition-colors ${
                wholeWord ? 'bg-[#007acc] text-white' : 'hover:bg-[#2a2d2e] text-[#cccccc]'
              }`}
              title="Match Whole Word"
            >
              <WholeWord size={14} />
            </button>
            <button
              onClick={() => setUseRegex(!useRegex)}
              className={`p-2 rounded transition-colors ${
                useRegex ? 'bg-[#007acc] text-white' : 'hover:bg-[#2a2d2e] text-[#cccccc]'
              }`}
              title="Use Regular Expression"
            >
              <Regex size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        <div className="text-sm text-[#6a737d]">
          {searchTerm ? 'No results found' : 'Enter search term above'}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;