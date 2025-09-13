import React, { useState } from 'react';
import { Bookmark, Plus, Search, Tag, Star, Copy, Edit, Trash2, FolderPlus } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: Date;
  lastUsed: Date;
  usageCount: number;
}

interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

const CodeSnippetManager: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([
    {
      id: '1',
      title: 'React Functional Component',
      description: 'Basic React functional component template with TypeScript',
      code: `import React from 'react';\n\ninterface Props {\n  // Define props here\n}\n\nconst Component: React.FC<Props> = () => {\n  return (\n    <div>\n      {/* Component content */}\n    </div>\n  );\n};\n\nexport default Component;`,
      language: 'typescript',
      tags: ['react', 'typescript', 'component'],
      category: 'React',
      isFavorite: true,
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date(),
      usageCount: 15
    },
    {
      id: '2',
      title: 'Custom Hook',
      description: 'Template for creating custom React hooks',
      code: `import { useState, useEffect } from 'react';\n\nconst useCustomHook = (initialValue: any) => {\n  const [value, setValue] = useState(initialValue);\n\n  useEffect(() => {\n    // Effect logic here\n  }, [value]);\n\n  return { value, setValue };\n};\n\nexport default useCustomHook;`,
      language: 'typescript',
      tags: ['react', 'hooks', 'custom'],
      category: 'React',
      isFavorite: false,
      createdAt: new Date('2024-01-10'),
      lastUsed: new Date('2024-01-20'),
      usageCount: 8
    },
    {
      id: '3',
      title: 'API Error Handler',
      description: 'Robust error handling for API calls',
      code: `const handleApiError = (error: any) => {\n  if (error.response) {\n    // Server responded with error status\n    console.error('API Error:', error.response.data);\n    return error.response.data.message || 'Server error';\n  } else if (error.request) {\n    // Request made but no response\n    console.error('Network Error:', error.request);\n    return 'Network error - please check your connection';\n  } else {\n    // Something else happened\n    console.error('Error:', error.message);\n    return 'An unexpected error occurred';\n  }\n};`,
      language: 'javascript',
      tags: ['api', 'error-handling', 'utility'],
      category: 'Utilities',
      isFavorite: true,
      createdAt: new Date('2024-01-05'),
      lastUsed: new Date('2024-01-18'),
      usageCount: 12
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: '1', name: 'React', color: '#61dafb', count: 2 },
    { id: '2', name: 'Utilities', color: '#f9c23c', count: 1 },
    { id: '3', name: 'CSS', color: '#1572b6', count: 0 },
    { id: '4', name: 'Node.js', color: '#339933', count: 0 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show notification
  };

  const toggleFavorite = (id: string) => {
    setSnippets(prev => prev.map(snippet =>
      snippet.id === id ? { ...snippet, isFavorite: !snippet.isFavorite } : snippet
    ));
  };

  const deleteSnippet = (id: string) => {
    setSnippets(prev => prev.filter(snippet => snippet.id !== id));
    if (selectedSnippet?.id === id) {
      setSelectedSnippet(null);
    }
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      javascript: '#f7df1e',
      typescript: '#3178c6',
      python: '#3776ab',
      java: '#ed8b00',
      css: '#1572b6',
      html: '#e34f26',
      json: '#000000'
    };
    return colors[language] || '#cccccc';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider flex items-center gap-2">
            <Bookmark size={14} />
            Code Snippets
          </h3>
          <button
            onClick={() => setShowCreateForm(true)}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
            title="Create Snippet"
          >
            <Plus size={14} className="text-[#cccccc]" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a737d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search snippets..."
            className="w-full pl-9 pr-3 py-2 bg-[#3c3c3c] border border-[#3e3e42] rounded text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#007acc] text-white'
                : 'bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4a4a4a]'
            }`}
          >
            All ({snippets.length})
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`text-xs px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                selectedCategory === category.name
                  ? 'bg-[#007acc] text-white'
                  : 'bg-[#3c3c3c] text-[#cccccc] hover:bg-[#4a4a4a]'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Snippets List */}
        <div className="flex-1 overflow-auto border-r border-[#3e3e42]">
          {filteredSnippets.length === 0 ? (
            <div className="p-4 text-center">
              <Bookmark size={32} className="text-[#6a737d] mx-auto mb-2" />
              <div className="text-sm text-[#6a737d]">No snippets found</div>
            </div>
          ) : (
            <div className="p-2">
              {filteredSnippets.map(snippet => (
                <div
                  key={snippet.id}
                  className={`p-3 rounded cursor-pointer transition-colors mb-2 border ${
                    selectedSnippet?.id === snippet.id
                      ? 'bg-[#2a2d2e] border-[#007acc]'
                      : 'hover:bg-[#2a2d2e] border-transparent'
                  }`}
                  onClick={() => setSelectedSnippet(snippet)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-[#cccccc] truncate">
                          {snippet.title}
                        </h4>
                        {snippet.isFavorite && (
                          <Star size={12} className="text-[#f9c23c] fill-current" />
                        )}
                      </div>
                      <p className="text-xs text-[#6a737d] mb-2 line-clamp-2">
                        {snippet.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: getLanguageColor(snippet.language) + '20',
                          color: getLanguageColor(snippet.language)
                        }}
                      >
                        {snippet.language}
                      </span>
                      <div className="flex gap-1">
                        {snippet.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="text-xs bg-[#3c3c3c] text-[#6a737d] px-1 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-[#6a737d]">
                      Used {snippet.usageCount} times
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Snippet Detail */}
        {selectedSnippet && (
          <div className="w-80 flex flex-col">
            <div className="p-3 border-b border-[#3e3e42]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-[#cccccc]">
                  {selectedSnippet.title}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleFavorite(selectedSnippet.id)}
                    className={`p-1 rounded transition-colors ${
                      selectedSnippet.isFavorite
                        ? 'text-[#f9c23c]'
                        : 'text-[#6a737d] hover:text-[#cccccc]'
                    }`}
                  >
                    <Star size={14} className={selectedSnippet.isFavorite ? 'fill-current' : ''} />
                  </button>
                  <button className="p-1 text-[#6a737d] hover:text-[#cccccc] rounded transition-colors">
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => deleteSnippet(selectedSnippet.id)}
                    className="p-1 text-[#6a737d] hover:text-[#f14c4c] rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#6a737d] mb-3">
                {selectedSnippet.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {selectedSnippet.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-[#3c3c3c] text-[#6a737d] px-2 py-1 rounded flex items-center gap-1"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(selectedSnippet.code)}
                className="w-full bg-[#007acc] hover:bg-[#106ba3] text-white text-sm py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
              >
                <Copy size={14} />
                Copy to Clipboard
              </button>
            </div>

            <div className="flex-1 overflow-auto p-3">
              <pre className="text-xs bg-[#1e1e1e] p-3 rounded border border-[#3e3e42] overflow-x-auto">
                <code className="text-[#cccccc]">{selectedSnippet.code}</code>
              </pre>
            </div>

            <div className="p-3 border-t border-[#3e3e42] text-xs text-[#6a737d]">
              <div className="flex justify-between">
                <span>Created: {selectedSnippet.createdAt.toLocaleDateString()}</span>
                <span>Used: {selectedSnippet.usageCount} times</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSnippetManager;