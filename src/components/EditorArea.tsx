import React from 'react';
import Editor from '@monaco-editor/react';
import { X, MoreHorizontal, Circle } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import AICodeCompletion from './AICodeCompletion';

const EditorArea: React.FC = () => {
  const { openFiles, activeFile, closeFile, setActiveFile, updateFileContent } = useEditor();
  const [showAICompletion, setShowAICompletion] = React.useState(false);
  const [cursorPosition, setCursorPosition] = React.useState(0);

  const activeFileObj = openFiles.find(f => f.path === activeFile);
  
  const getLanguageFromPath = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
    const langMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      md: 'markdown',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      php: 'php',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
      sql: 'sql',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml'
    };
    return langMap[ext || ''] || 'plaintext';
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFileContent(activeFile, value);
    }
  };

  const handleEditorMount = (editor: any) => {
    // Add AI completion trigger
    editor.onDidChangeCursorPosition((e: any) => {
      setCursorPosition(e.position.lineNumber * 100 + e.position.column);
      
      // Trigger AI completion on certain conditions
      const model = editor.getModel();
      if (model) {
        const currentLine = model.getLineContent(e.position.lineNumber);
        if (currentLine.trim().length > 2) {
          setShowAICompletion(true);
        }
      }
    });

    // Add custom keybindings
    editor.addCommand(editor.KeyMod.CtrlCmd | editor.KeyCode.KeyS, () => {
      console.log('Save file');
    });
  };

  const handleAcceptSuggestion = (suggestion: string) => {
    if (activeFile) {
      const currentContent = activeFileObj?.content || '';
      updateFileContent(activeFile, currentContent + '\n' + suggestion);
    }
    setShowAICompletion(false);
  };

  if (openFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-[#6a737d]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-medium mb-2">Welcome to WebIDE</h2>
          <p className="text-sm">Open a file from the explorer to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Bar */}
      <div className="flex bg-[#2d2d30] border-b border-[#3e3e42] overflow-x-auto">
        {openFiles.map((file) => (
          <div
            key={file.path}
            className={`flex items-center gap-2 px-3 py-2 border-r border-[#3e3e42] cursor-pointer group min-w-0 ${
              activeFile === file.path
                ? 'bg-[#1e1e1e] text-[#ffffff]'
                : 'bg-[#2d2d30] text-[#cccccc] hover:bg-[#37373d]'
            }`}
            onClick={() => setActiveFile(file.path)}
          >
            <Circle
              size={8}
              className={`flex-shrink-0 ${
                file.isDirty ? 'fill-current text-[#f9c23c]' : 'text-transparent'
              }`}
            />
            <span className="text-sm truncate min-w-0">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.path);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-[#3e3e42] rounded p-0.5 transition-opacity flex-shrink-0"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        
        {/* Tab Actions */}
        <div className="flex items-center px-2">
          <button className="p-1 hover:bg-[#3e3e42] rounded transition-colors">
            <MoreHorizontal size={14} className="text-[#cccccc]" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        {activeFileObj && (
          <>
            <Editor
              height="100%"
              language={getLanguageFromPath(activeFileObj.path)}
              value={activeFileObj.content}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                lineNumbers: 'on',
                folding: true,
                bracketMatching: 'always',
                autoIndent: 'full',
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                tabCompletion: 'on',
                quickSuggestions: true,
                parameterHints: { enabled: true },
                hover: { enabled: true },
                contextmenu: true,
                mouseWheelZoom: true,
                multiCursorModifier: 'ctrlCmd',
                selectionHighlight: true,
                occurrencesHighlight: true,
                codeLens: true,
                colorDecorators: true,
                lightbulb: { enabled: true },
                find: {
                  seedSearchStringFromSelection: 'always',
                  autoFindInSelection: 'never'
                }
              }}
            />
            
            {/* AI Code Completion */}
            {showAICompletion && (
              <AICodeCompletion
                code={activeFileObj.content}
                cursorPosition={cursorPosition}
                language={getLanguageFromPath(activeFileObj.path)}
                onAcceptSuggestion={handleAcceptSuggestion}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditorArea;