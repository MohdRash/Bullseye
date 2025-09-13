import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, History, Zap, FileText, Code, Folder, Hash, AtSign } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'file' | 'symbol' | 'text' | 'command' | 'recent';
  title: string;
  subtitle: string;
  path: string;
  line?: number;
  column?: number;
  preview?: string;
  score: number;
}

interface SearchFilter {
  type: 'all' | 'files' | 'symbols' | 'text' | 'commands';
  label: string;
  icon: React.ReactNode;
}

const IntelligentSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'files' | 'symbols' | 'text' | 'commands'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['useState', 'component', 'API']);
  const inputRef = useRef<HTMLInputElement>(null);

  const filters: SearchFilter[] = [
    { type: 'all', label: 'All', icon: <Search size={14} /> },
    { type: 'files', label: 'Files', icon: <FileText size={14} /> },
    { type: 'symbols', label: 'Symbols', icon: <Hash size={14} /> },
    { type: 'text', label: 'Text', icon: <AtSign size={14} /> },
    { type: 'commands', label: 'Commands', icon: <Zap size={14} /> }
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate intelligent search with fuzzy matching and semantic understanding
    const searchTimeout = setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'file',
          title: 'IDE.tsx',
          subtitle: 'src/components/',
          path: 'src/components/IDE.tsx',
          preview: 'Main IDE component with advanced features',
          score: 0.95
        },
        {
          id: '2',
          type: 'symbol',
          title: 'useState',
          subtitle: 'React Hook',
          path: 'src/components/IDE.tsx',
          line: 15,
          column: 8,
          preview: 'const [activePanel, setActivePanel] = useState(...)',
          score: 0.92
        },
        {
          id: '3',
          type: 'text',
          title: 'Advanced IDE Features',
          subtitle: 'Comment in IDE.tsx',
          path: 'src/components/IDE.tsx',
          line: 5,
          preview: '// Advanced IDE with AI-powered features and real-time collaboration',
          score: 0.88
        },
        {
          id: '4',
          type: 'command',
          title: 'Toggle Terminal',
          subtitle: 'Ctrl+`',
          path: 'command:terminal.toggle',
          preview: 'Show or hide the integrated terminal',
          score: 0.85
        },
        {
          id: '5',
          type: 'file',
          title: 'AIAssistant.tsx',
          subtitle: 'src/components/',
          path: 'src/components/AIAssistant.tsx',
          preview: 'AI-powered coding assistant with smart suggestions',
          score: 0.82
        }
      ].filter(result => {
        if (activeFilter === 'all') return true;
        return result.type === activeFilter || (activeFilter === 'commands' && result.type === 'command');
      });

      setResults(mockResults);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(searchTimeout);
  }, [query, activeFilter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setQuery('');
        setResults([]);
        break;
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    console.log('Selected result:', result);
    
    // Add to recent searches
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
    
    // Handle different result types
    switch (result.type) {
      case 'file':
        // Open file
        break;
      case 'symbol':
        // Navigate to symbol
        break;
      case 'command':
        // Execute command
        break;
      default:
        break;
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'file': return <FileText size={16} className="text-[#007acc]" />;
      case 'symbol': return <Hash size={16} className="text-[#f9c23c]" />;
      case 'text': return <AtSign size={16} className="text-[#73c991]" />;
      case 'command': return <Zap size={16} className="text-[#c586c0]" />;
      case 'recent': return <History size={16} className="text-[#6a737d]" />;
      default: return <Search size={16} className="text-[#cccccc]" />;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-[#f9c23c] text-black px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider mb-3">
          Intelligent Search
        </h3>
        
        {/* Search Input */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a737d]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search files, symbols, text, commands..."
            className="w-full pl-10 pr-4 py-2 bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-[#007acc] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Search Filters */}
        <div className="flex gap-1 mb-3">
          {filters.map(filter => (
            <button
              key={filter.type}
              onClick={() => setActiveFilter(filter.type)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
                activeFilter === filter.type
                  ? 'bg-[#007acc] text-white'
                  : 'bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4a4a4a]'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div>
            <h4 className="text-xs text-[#6a737d] mb-2 flex items-center gap-1">
              <History size={12} />
              Recent Searches
            </h4>
            <div className="flex flex-wrap gap-1">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="text-xs bg-[#3c3c3c] hover:bg-[#4a4a4a] text-[#cccccc] px-2 py-1 rounded transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-auto">
        {results.length === 0 && query ? (
          <div className="p-4 text-center">
            <Search size={32} className="text-[#6a737d] mx-auto mb-2" />
            <div className="text-sm text-[#6a737d]">
              {isLoading ? 'Searching...' : 'No results found'}
            </div>
          </div>
        ) : (
          <div className="p-2">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`p-3 rounded cursor-pointer transition-colors mb-1 ${
                  index === selectedIndex
                    ? 'bg-[#2a2d2e] border border-[#007acc]'
                    : 'hover:bg-[#2a2d2e] border border-transparent'
                }`}
                onClick={() => handleResultSelect(result)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getResultIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[#cccccc] truncate">
                        {highlightMatch(result.title, query)}
                      </span>
                      <span className="text-xs bg-[#3c3c3c] text-[#6a737d] px-2 py-0.5 rounded">
                        {result.type}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <div className="w-2 h-2 bg-[#73c991] rounded-full" />
                        <span className="text-xs text-[#6a737d]">
                          {Math.round(result.score * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-[#6a737d] mb-1">
                      {result.subtitle}
                      {result.line && ` • Line ${result.line}`}
                    </div>
                    {result.preview && (
                      <div className="text-xs text-[#cccccc] bg-[#1e1e1e] p-2 rounded border border-[#3e3e42] font-mono">
                        {highlightMatch(result.preview, query)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Tips */}
      {!query && (
        <div className="p-3 border-t border-[#3e3e42] text-xs text-[#6a737d]">
          <div className="space-y-1">
            <div><kbd className="bg-[#3c3c3c] px-1 rounded">@</kbd> Search symbols</div>
            <div><kbd className="bg-[#3c3c3c] px-1 rounded">#</kbd> Search files</div>
            <div><kbd className="bg-[#3c3c3c] px-1 rounded">{'>'}</kbd> Run commands</div>
            <div><kbd className="bg-[#3c3c3c] px-1 rounded">?</kbd> Search text</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentSearch;