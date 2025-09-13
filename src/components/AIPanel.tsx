import React, { useState } from 'react';
import { Bot, Send, Lightbulb, Code, RefreshCw, Zap, MessageSquare } from 'lucide-react';
import { useAI } from '../contexts/AIContext';

const AIPanel: React.FC = () => {
  const {
    conversations,
    currentConversation,
    isLoading,
    sendMessage,
    createNewConversation,
    generateCode,
    explainCode,
    optimizeCode,
    findBugs
  } = useAI();

  const [message, setMessage] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const quickActions = [
    { icon: Code, label: 'Generate Code', action: () => generateCode(message) },
    { icon: Lightbulb, label: 'Explain Code', action: () => explainCode(selectedCode) },
    { icon: Zap, label: 'Optimize Code', action: () => optimizeCode(selectedCode) },
    { icon: RefreshCw, label: 'Find Bugs', action: () => findBugs(selectedCode) }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider flex items-center gap-2">
            <Bot size={14} />
            AI Assistant
          </h3>
          <button
            onClick={createNewConversation}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
            title="New Conversation"
          >
            <MessageSquare size={14} className="text-[#cccccc]" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickActions.map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex items-center gap-2 p-2 bg-[#3c3c3c] hover:bg-[#4a4a4a] rounded transition-colors text-sm"
            >
              <Icon size={12} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-auto p-3">
        {currentConversation?.messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-[#007acc] text-white' 
                : 'bg-[#3c3c3c] text-[#cccccc]'
            }`}>
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
              {msg.code && (
                <div className="mt-2 p-2 bg-[#1e1e1e] rounded border border-[#3e3e42] font-mono text-xs">
                  <pre>{msg.code}</pre>
                </div>
              )}
            </div>
            <div className="text-xs text-[#6a737d] mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-[#6a737d] text-sm">
            <div className="animate-spin">
              <RefreshCw size={14} />
            </div>
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#3e3e42]">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask AI anything about your code..."
            className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="p-2 bg-[#007acc] text-white rounded hover:bg-[#106ba3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPanel;