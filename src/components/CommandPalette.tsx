import React, { useState, useEffect, useRef } from 'react';
import { Search, File, FolderOpen, Settings, Terminal, Palette } from 'lucide-react';

interface CommandPaletteProps {
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: 'file.new', label: 'File: New File', icon: File, shortcut: 'Ctrl+N' },
    { id: 'file.open', label: 'File: Open File', icon: FolderOpen, shortcut: 'Ctrl+O' },
    { id: 'file.save', label: 'File: Save', icon: File, shortcut: 'Ctrl+S' },
    { id: 'terminal.new', label: 'Terminal: Create New Terminal', icon: Terminal, shortcut: 'Ctrl+`' },
    { id: 'view.theme', label: 'Preferences: Color Theme', icon: Palette, shortcut: '' },
    { id: 'view.settings', label: 'Preferences: Open Settings', icon: Settings, shortcut: 'Ctrl+,' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            console.log('Execute command:', filteredCommands[selectedIndex].id);
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-[#252526] border border-[#3e3e42] rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="p-4 border-b border-[#3e3e42]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6a737d]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search..."
              className="w-full pl-10 pr-4 py-3 bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
            />
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-[#6a737d]">
              No commands found
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <div
                key={cmd.id}
                className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? 'bg-[#2a2d2e] text-[#ffffff]'
                    : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                }`}
                onClick={() => {
                  console.log('Execute command:', cmd.id);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <cmd.icon size={16} />
                  <span>{cmd.label}</span>
                </div>
                {cmd.shortcut && (
                  <span className="text-xs text-[#6a737d] bg-[#3c3c3c] px-2 py-1 rounded">
                    {cmd.shortcut}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;