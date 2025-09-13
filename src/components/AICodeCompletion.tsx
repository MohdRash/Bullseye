import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Brain, Code2, Lightbulb } from 'lucide-react';

interface Suggestion {
  id: string;
  text: string;
  confidence: number;
  type: 'completion' | 'refactor' | 'optimization' | 'fix';
  description: string;
}

interface AICodeCompletionProps {
  code: string;
  cursorPosition: number;
  language: string;
  onAcceptSuggestion: (suggestion: string) => void;
}

const AICodeCompletion: React.FC<AICodeCompletionProps> = ({
  code,
  cursorPosition,
  language,
  onAcceptSuggestion
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateSuggestions = async () => {
      if (!code || cursorPosition < 0) return;

      setIsLoading(true);
      
      // Simulate AI-powered suggestions
      setTimeout(() => {
        const mockSuggestions: Suggestion[] = [
          {
            id: '1',
            text: 'const handleSubmit = async (event: FormEvent) => {\n  event.preventDefault();\n  // Handle form submission\n};',
            confidence: 0.95,
            type: 'completion',
            description: 'Complete async form handler with TypeScript types'
          },
          {
            id: '2',
            text: 'useEffect(() => {\n  // Cleanup function\n  return () => {\n    // Cleanup code here\n  };\n}, []);',
            confidence: 0.88,
            type: 'completion',
            description: 'React useEffect hook with cleanup'
          },
          {
            id: '3',
            text: 'try {\n  // Your code here\n} catch (error) {\n  console.error("Error:", error);\n  // Handle error appropriately\n}',
            confidence: 0.82,
            type: 'optimization',
            description: 'Add error handling with try-catch block'
          }
        ];

        setSuggestions(mockSuggestions);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    };

    const debounceTimer = setTimeout(generateSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [code, cursorPosition, language]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'completion': return <Code2 size={14} className="text-[#007acc]" />;
      case 'refactor': return <Zap size={14} className="text-[#f9c23c]" />;
      case 'optimization': return <Brain size={14} className="text-[#73c991]" />;
      case 'fix': return <Lightbulb size={14} className="text-[#f14c4c]" />;
      default: return <Sparkles size={14} className="text-[#cccccc]" />;
    }
  };

  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    onAcceptSuggestion(suggestion.text);
    setShowSuggestions(false);
  };

  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div
      ref={suggestionRef}
      className="fixed bg-[#252526] border border-[#3e3e42] rounded-lg shadow-2xl z-50 max-w-md"
      style={{ top: '200px', left: '400px' }}
    >
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#007acc]" />
          <span className="text-sm font-medium text-[#cccccc]">AI Suggestions</span>
          {isLoading && (
            <div className="w-4 h-4 border-2 border-[#007acc] border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion.id}
            className={`p-3 cursor-pointer transition-colors border-b border-[#3e3e42] last:border-b-0 ${
              index === selectedIndex ? 'bg-[#2a2d2e]' : 'hover:bg-[#2a2d2e]'
            }`}
            onClick={() => handleAcceptSuggestion(suggestion)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getIcon(suggestion.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#cccccc]">
                    {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#73c991] rounded-full" />
                    <span className="text-xs text-[#6a737d]">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#6a737d] mb-2">{suggestion.description}</p>
                <pre className="text-xs bg-[#1e1e1e] p-2 rounded border border-[#3e3e42] overflow-x-auto">
                  <code className="text-[#cccccc]">{suggestion.text}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-[#3e3e42] text-xs text-[#6a737d]">
        Press Tab to accept • Esc to dismiss
      </div>
    </div>
  );
};

export default AICodeCompletion;