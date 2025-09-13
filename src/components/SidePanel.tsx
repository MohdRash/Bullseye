import React from 'react';
import FileExplorer from './FileExplorer';
import SearchPanel from './SearchPanel';
import IntelligentSearch from './IntelligentSearch';
import CodeSnippetManager from './CodeSnippetManager';
import SmartCodeAnalyzer from './SmartCodeAnalyzer';
import GitPanel from './GitPanel';
import DebugPanel from './DebugPanel';
import ExtensionsPanel from './ExtensionsPanel';
import AIPanel from './AIPanel';
import SettingsPanel from './SettingsPanel';

interface SidePanelProps {
  activePanel: 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'ai' | 'settings' | 'snippets' | 'analyzer';
}

const SidePanel: React.FC<SidePanelProps> = ({ activePanel }) => {
  const renderPanel = () => {
    switch (activePanel) {
      case 'explorer':
        return <FileExplorer />;
      case 'search':
        return <IntelligentSearch />;
      case 'snippets':
        return <CodeSnippetManager />;
      case 'analyzer':
        return <SmartCodeAnalyzer code="" language="typescript" filePath="" />;
      case 'git':
        return <GitPanel />;
      case 'debug':
        return <DebugPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      case 'ai':
        return <AIPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <FileExplorer />;
    }
  };

  return (
    <div className="h-full bg-[#252526] border-r border-[#3e3e42] flex flex-col">
      {renderPanel()}
    </div>
  );
};

export default SidePanel;