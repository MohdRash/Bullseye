import React, { useState } from 'react';
import { Settings, User, Palette, Code, Monitor } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('14');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'editor', label: 'Editor', icon: Code },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider">Settings</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="border-b border-[#3e3e42]">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                activeTab === id
                  ? 'bg-[#2a2d2e] text-[#cccccc] border-r-2 border-[#007acc]'
                  : 'text-[#6a737d] hover:text-[#cccccc] hover:bg-[#2a2d2e]'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-auto p-3">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#cccccc] mb-2">Auto Save</label>
                <select className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc]">
                  <option>afterDelay</option>
                  <option>onFocusChange</option>
                  <option>onWindowChange</option>
                  <option>off</option>
                </select>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#cccccc] mb-2">Color Theme</label>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc]"
                >
                  <option value="dark">Dark (Visual Studio)</option>
                  <option value="light">Light (Visual Studio)</option>
                  <option value="high-contrast">High Contrast</option>
                </select>
              </div>
            </div>
          )}
          
          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#cccccc] mb-2">Font Size</label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc]"
                  min="8"
                  max="40"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-[#cccccc]">
                  <input type="checkbox" className="rounded" />
                  Word Wrap
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-[#cccccc]">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Line Numbers
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;