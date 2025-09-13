import React, { useState } from 'react';
import { X, Bot, Sparkles, Code2, FileText, Zap } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');

  const tabs = [
    { id: 'chat', label: 'Chat', icon: Bot },
    { id: 'code', label: 'Code Gen', icon: Code2 },
    { id: 'docs', label: 'Docs', icon: FileText },
    { id: 'optimize', label: 'Optimize', icon: Zap }
  ];

  return (
    <div className="h-full bg-[#252526] border-l border-[#3e3e42] flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#007acc]" />
          <h3 className="text-sm font-medium text-[#cccccc]">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
        >
          <X size={14} className="text-[#cccccc]" />
        </button>
      </div>

      <div className="flex border-b border-[#3e3e42]">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
              activeTab === id
                ? 'bg-[#1e1e1e] text-[#ffffff] border-b-2 border-[#007acc]'
                : 'text-[#cccccc] hover:text-[#ffffff] hover:bg-[#2a2d2e]'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-3">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="bg-[#3c3c3c] p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={16} className="text-[#007acc]" />
                <span className="text-sm font-medium">AI Assistant</span>
              </div>
              <p className="text-sm text-[#cccccc]">
                Hello! I'm your AI coding assistant. I can help you with:
              </p>
              <ul className="text-sm text-[#6a737d] mt-2 space-y-1">
                <li>• Writing and debugging code</li>
                <li>• Explaining complex concepts</li>
                <li>• Code optimization suggestions</li>
                <li>• Documentation generation</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="text-sm text-[#cccccc]">
              <h4 className="font-medium mb-2">Code Generation</h4>
              <p className="text-[#6a737d] mb-3">
                Describe what you want to build and I'll generate the code for you.
              </p>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">React Component</div>
                  <div className="text-xs text-[#6a737d]">Generate a React functional component</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">API Endpoint</div>
                  <div className="text-xs text-[#6a737d]">Create REST API endpoints</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">Database Schema</div>
                  <div className="text-xs text-[#6a737d]">Design database tables and relations</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-4">
            <div className="text-sm text-[#cccccc]">
              <h4 className="font-medium mb-2">Documentation</h4>
              <p className="text-[#6a737d] mb-3">
                Generate documentation for your code automatically.
              </p>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">Function Documentation</div>
                  <div className="text-xs text-[#6a737d]">Generate JSDoc comments</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">README Generator</div>
                  <div className="text-xs text-[#6a737d]">Create comprehensive README files</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">API Documentation</div>
                  <div className="text-xs text-[#6a737d]">Document API endpoints and schemas</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimize' && (
          <div className="space-y-4">
            <div className="text-sm text-[#cccccc]">
              <h4 className="font-medium mb-2">Code Optimization</h4>
              <p className="text-[#6a737d] mb-3">
                Analyze and optimize your code for better performance.
              </p>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">Performance Analysis</div>
                  <div className="text-xs text-[#6a737d]">Find performance bottlenecks</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">Code Refactoring</div>
                  <div className="text-xs text-[#6a737d]">Suggest code improvements</div>
                </button>
                <button className="w-full text-left p-3 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors">
                  <div className="font-medium">Bundle Optimization</div>
                  <div className="text-xs text-[#6a737d]">Optimize build size and loading</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#3e3e42]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
          />
          <button className="px-3 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#106ba3] transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;