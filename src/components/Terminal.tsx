import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { X, Maximize2, Minimize2, Plus } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState('bash');
  const [tabs, setTabs] = useState([
    { id: 'bash', name: 'bash', active: true }
  ]);

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      // Initialize terminal
      const terminal = new XTerm({
        theme: {
          background: '#1e1e1e',
          foreground: '#cccccc',
          cursor: '#ffffff',
          selection: '#264f78',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#e5e5e5'
        },
        fontSize: 14,
        fontFamily: '"Fira Code", Monaco, Menlo, monospace',
        cursorBlink: true,
        scrollback: 1000,
        rows: 24,
        cols: 80
      });

      // Add addons
      const fitAddon = new FitAddon();
      const webLinksAddon = new WebLinksAddon();
      
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(webLinksAddon);
      
      terminal.open(terminalRef.current);
      
      // Initial content
      terminal.writeln('Welcome to WebIDE Terminal');
      terminal.writeln('Type commands below:');
      terminal.write('$ ');
      
      // Handle input
      let currentLine = '';
      terminal.onKey(({ key, domEvent }) => {
        const char = key;
        
        if (domEvent.keyCode === 13) { // Enter
          terminal.writeln('');
          if (currentLine.trim()) {
            // Simulate command execution
            if (currentLine.trim() === 'clear') {
              terminal.clear();
            } else if (currentLine.trim() === 'ls') {
              terminal.writeln('src/  package.json  README.md  node_modules/');
            } else if (currentLine.trim().startsWith('echo ')) {
              terminal.writeln(currentLine.replace('echo ', ''));
            } else {
              terminal.writeln(`Command not found: ${currentLine.trim()}`);
            }
          }
          currentLine = '';
          terminal.write('$ ');
        } else if (domEvent.keyCode === 8) { // Backspace
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            terminal.write('\b \b');
          }
        } else if (char.length === 1) {
          currentLine += char;
          terminal.write(char);
        }
      });
      
      // Store references
      xtermRef.current = terminal;
      fitAddonRef.current = fitAddon;
      
      // Fit terminal to container
      setTimeout(() => {
        fitAddon.fit();
      }, 100);
      
      // Handle resize
      const handleResize = () => {
        fitAddon.fit();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        terminal.dispose();
      };
    }
  }, []);

  const addNewTab = () => {
    const newTab = {
      id: `bash-${Date.now()}`,
      name: `bash ${tabs.length + 1}`,
      active: false
    };
    
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId) {
      const remaining = tabs.filter(tab => tab.id !== tabId);
      setActiveTab(remaining[0]?.id || '');
    }
  };

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="flex items-center justify-between bg-[#2d2d30] border-b border-[#3e3e42] px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-[#cccccc]">Terminal</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={addNewTab}
            className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
            title="New Terminal"
          >
            <Plus size={14} className="text-[#cccccc]" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 size={14} className="text-[#cccccc]" />
            ) : (
              <Maximize2 size={14} className="text-[#cccccc]" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
            title="Close Terminal"
          >
            <X size={14} className="text-[#cccccc]" />
          </button>
        </div>
      </div>
      
      <div className="flex bg-[#1e1e1e] border-b border-[#3e3e42]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-3 py-1 cursor-pointer group transition-colors ${
              activeTab === tab.id
                ? 'bg-[#1e1e1e] text-[#ffffff]'
                : 'bg-[#2d2d30] text-[#cccccc] hover:bg-[#37373d]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm mr-2">{tab.name}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-[#3e3e42] rounded p-0.5 transition-opacity"
              >
                <X size={10} />
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-2">
        <div ref={terminalRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default Terminal;