import React, { useState, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ActivityBar from './ActivityBar';
import SidePanel from './SidePanel';
import EditorArea from './EditorArea';
import Terminal from './Terminal';
import StatusBar from './StatusBar';
import CommandPalette from './CommandPalette';
import AIAssistant from './AIAssistant';
import GitPanel from './GitPanel';
import DebugPanel from './DebugPanel';
import LiveShare from './LiveShare';
import MiniMap from './MiniMap';
import BreadcrumbBar from './BreadcrumbBar';
import NotificationCenter from './NotificationCenter';
import { FileTreeProvider } from '../contexts/FileTreeContext';
import { EditorProvider } from '../contexts/EditorContext';
import { GitProvider } from '../contexts/GitContext';
import { DebugProvider } from '../contexts/DebugContext';
import { AIProvider } from '../contexts/AIContext';
import { CollaborationProvider } from '../contexts/CollaborationContext';

const IDE: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'ai' | 'settings'>('explorer');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      setShowCommandPalette(true);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === '`') {
      e.preventDefault();
      setShowTerminal(prev => !prev);
    }
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      setShowAIAssistant(prev => !prev);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'F5') {
      e.preventDefault();
      // Start debugging
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <CollaborationProvider>
      <AIProvider>
        <GitProvider>
          <DebugProvider>
            <FileTreeProvider>
              <EditorProvider>
                <div className="h-screen bg-[#1e1e1e] text-[#cccccc] font-mono overflow-hidden">
                  <div className="flex h-full">
                    <ActivityBar activePanel={activePanel} onPanelChange={setActivePanel} />
                    
                    <PanelGroup direction="horizontal" className="flex-1">
                      <Panel defaultSize={20} minSize={15} maxSize={40}>
                        <SidePanel activePanel={activePanel} />
                      </Panel>
                      
                      <PanelResizeHandle className="w-1 bg-[#2d2d30] hover:bg-[#3e3e42] transition-colors" />
                      
                      <Panel defaultSize={showAIAssistant ? 60 : 80}>
                        <PanelGroup direction="vertical">
                          {showBreadcrumbs && (
                            <Panel defaultSize={4} minSize={4} maxSize={4}>
                              <BreadcrumbBar />
                            </Panel>
                          )}
                          
                          <Panel defaultSize={showTerminal ? 70 : 100}>
                            <PanelGroup direction="horizontal">
                              <Panel defaultSize={showMiniMap ? 85 : 100}>
                                <EditorArea />
                              </Panel>
                              
                              {showMiniMap && (
                                <>
                                  <PanelResizeHandle className="w-1 bg-[#2d2d30] hover:bg-[#3e3e42] transition-colors" />
                                  <Panel defaultSize={15} minSize={10} maxSize={25}>
                                    <MiniMap />
                                  </Panel>
                                </>
                              )}
                            </PanelGroup>
                          </Panel>
                          
                          {showTerminal && (
                            <>
                              <PanelResizeHandle className="h-1 bg-[#2d2d30] hover:bg-[#3e3e42] transition-colors" />
                              <Panel defaultSize={30} minSize={20}>
                                <Terminal onClose={() => setShowTerminal(false)} />
                              </Panel>
                            </>
                          )}
                        </PanelGroup>
                      </Panel>
                      
                      {showAIAssistant && (
                        <>
                          <PanelResizeHandle className="w-1 bg-[#2d2d30] hover:bg-[#3e3e42] transition-colors" />
                          <Panel defaultSize={20} minSize={15} maxSize={35}>
                            <AIAssistant onClose={() => setShowAIAssistant(false)} />
                          </Panel>
                        </>
                      )}
                    </PanelGroup>
                  </div>
                  
                  <StatusBar />
                  
                  {showCommandPalette && (
                    <CommandPalette onClose={() => setShowCommandPalette(false)} />
                  )}
                  
                  <NotificationCenter 
                    notifications={notifications}
                    onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
                  />
                  
                  <LiveShare />
                </div>
              </EditorProvider>
            </FileTreeProvider>
          </DebugProvider>
        </GitProvider>
      </AIProvider>
    </CollaborationProvider>
  );
};

export default IDE;