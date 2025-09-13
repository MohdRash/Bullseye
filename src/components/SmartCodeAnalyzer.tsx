import React, { useState, useEffect } from 'react';
import { Shield, Bug, Zap, Target, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface CodeIssue {
  id: string;
  type: 'security' | 'performance' | 'maintainability' | 'bug' | 'style';
  severity: 'low' | 'medium' | 'high' | 'critical';
  line: number;
  column: number;
  message: string;
  suggestion: string;
  autoFixable: boolean;
}

interface CodeMetrics {
  complexity: number;
  maintainability: number;
  testCoverage: number;
  duplicateLines: number;
  technicalDebt: string;
}

interface SmartCodeAnalyzerProps {
  code: string;
  language: string;
  filePath: string;
}

const SmartCodeAnalyzer: React.FC<SmartCodeAnalyzerProps> = ({ code, language, filePath }) => {
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [metrics, setMetrics] = useState<CodeMetrics>({
    complexity: 0,
    maintainability: 0,
    testCoverage: 0,
    duplicateLines: 0,
    technicalDebt: '0h'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<CodeIssue | null>(null);

  useEffect(() => {
    if (!code) return;

    setIsAnalyzing(true);
    
    // Simulate advanced code analysis
    setTimeout(() => {
      const mockIssues: CodeIssue[] = [
        {
          id: '1',
          type: 'security',
          severity: 'high',
          line: 15,
          column: 8,
          message: 'Potential XSS vulnerability detected',
          suggestion: 'Use proper input sanitization or a trusted library like DOMPurify',
          autoFixable: false
        },
        {
          id: '2',
          type: 'performance',
          severity: 'medium',
          line: 23,
          column: 12,
          message: 'Inefficient array operation in render method',
          suggestion: 'Consider memoizing this computation with useMemo',
          autoFixable: true
        },
        {
          id: '3',
          type: 'maintainability',
          severity: 'low',
          line: 45,
          column: 5,
          message: 'Function complexity is too high (12)',
          suggestion: 'Break this function into smaller, more focused functions',
          autoFixable: false
        },
        {
          id: '4',
          type: 'bug',
          severity: 'critical',
          line: 67,
          column: 20,
          message: 'Potential null pointer exception',
          suggestion: 'Add null check before accessing object properties',
          autoFixable: true
        }
      ];

      const mockMetrics: CodeMetrics = {
        complexity: 8.5,
        maintainability: 72,
        testCoverage: 85,
        duplicateLines: 12,
        technicalDebt: '2.5h'
      };

      setIssues(mockIssues);
      setMetrics(mockMetrics);
      setIsAnalyzing(false);
    }, 1500);
  }, [code, language]);

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield size={14} className="text-[#f14c4c]" />;
      case 'performance': return <Zap size={14} className="text-[#f9c23c]" />;
      case 'maintainability': return <Target size={14} className="text-[#007acc]" />;
      case 'bug': return <Bug size={14} className="text-[#f14c4c]" />;
      case 'style': return <CheckCircle size={14} className="text-[#73c991]" />;
      default: return <AlertCircle size={14} className="text-[#cccccc]" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-[#f14c4c] bg-[#5f1e1e]';
      case 'high': return 'text-[#f9c23c] bg-[#5f4e1e]';
      case 'medium': return 'text-[#007acc] bg-[#1e3a5f]';
      case 'low': return 'text-[#73c991] bg-[#1e5f3a]';
      default: return 'text-[#cccccc] bg-[#3e3e42]';
    }
  };

  const getMetricColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-[#73c991]';
    if (value >= thresholds.warning) return 'text-[#f9c23c]';
    return 'text-[#f14c4c]';
  };

  const criticalIssues = issues.filter(i => i.severity === 'critical').length;
  const highIssues = issues.filter(i => i.severity === 'high').length;
  const autoFixableCount = issues.filter(i => i.autoFixable).length;

  return (
    <div className="h-full bg-[#252526] border-l border-[#3e3e42] flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={14} />
            Code Analysis
          </h3>
          {isAnalyzing && (
            <div className="w-4 h-4 border-2 border-[#007acc] border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#3c3c3c] rounded p-2">
            <div className="text-xs text-[#6a737d]">Issues</div>
            <div className="text-lg font-bold text-[#cccccc]">{issues.length}</div>
            <div className="text-xs text-[#f14c4c]">{criticalIssues + highIssues} critical/high</div>
          </div>
          <div className="bg-[#3c3c3c] rounded p-2">
            <div className="text-xs text-[#6a737d]">Auto-fixable</div>
            <div className="text-lg font-bold text-[#73c991]">{autoFixableCount}</div>
            <div className="text-xs text-[#6a737d]">Quick fixes available</div>
          </div>
        </div>

        {/* Code Metrics */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#cccccc]">Maintainability</span>
            <span className={`text-xs font-mono ${getMetricColor(metrics.maintainability, { good: 80, warning: 60 })}`}>
              {metrics.maintainability}%
            </span>
          </div>
          <div className="w-full bg-[#3e3e42] rounded-full h-1">
            <div
              className={`h-1 rounded-full ${
                metrics.maintainability >= 80 ? 'bg-[#73c991]' :
                metrics.maintainability >= 60 ? 'bg-[#f9c23c]' : 'bg-[#f14c4c]'
              }`}
              style={{ width: `${metrics.maintainability}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#cccccc]">Test Coverage</span>
            <span className={`text-xs font-mono ${getMetricColor(metrics.testCoverage, { good: 80, warning: 60 })}`}>
              {metrics.testCoverage}%
            </span>
          </div>
          <div className="w-full bg-[#3e3e42] rounded-full h-1">
            <div
              className={`h-1 rounded-full ${
                metrics.testCoverage >= 80 ? 'bg-[#73c991]' :
                metrics.testCoverage >= 60 ? 'bg-[#f9c23c]' : 'bg-[#f14c4c]'
              }`}
              style={{ width: `${metrics.testCoverage}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-[#007acc] hover:bg-[#106ba3] text-white text-xs py-2 px-3 rounded transition-colors">
            Fix All ({autoFixableCount})
          </button>
          <button className="flex-1 bg-[#3e3e42] hover:bg-[#4a4a4a] text-[#cccccc] text-xs py-2 px-3 rounded transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-auto">
        {issues.length === 0 ? (
          <div className="p-4 text-center">
            <CheckCircle size={32} className="text-[#73c991] mx-auto mb-2" />
            <div className="text-sm text-[#cccccc] mb-1">No issues found!</div>
            <div className="text-xs text-[#6a737d]">Your code looks great.</div>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {issues.map(issue => (
              <div
                key={issue.id}
                className={`p-3 rounded border-l-2 cursor-pointer transition-colors ${
                  selectedIssue?.id === issue.id ? 'bg-[#2a2d2e]' : 'hover:bg-[#2a2d2e]'
                } ${getSeverityColor(issue.severity).split(' ')[1]} border-l-${getSeverityColor(issue.severity).split(' ')[0].replace('text-', '')}`}
                onClick={() => setSelectedIssue(issue)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIssueIcon(issue.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-[#6a737d]">
                        Line {issue.line}:{issue.column}
                      </span>
                      {issue.autoFixable && (
                        <span className="text-xs bg-[#73c991] text-black px-2 py-0.5 rounded">
                          Auto-fix
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-[#cccccc] mb-1">{issue.message}</div>
                    <div className="text-xs text-[#6a737d]">{issue.suggestion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Issue View */}
      {selectedIssue && (
        <div className="border-t border-[#3e3e42] p-3 bg-[#1e1e1e]">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-[#cccccc]">Issue Details</h4>
            <button
              onClick={() => setSelectedIssue(null)}
              className="text-[#6a737d] hover:text-[#cccccc] transition-colors"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-xs">
              <span className="text-[#6a737d]">Type: </span>
              <span className="text-[#cccccc]">{selectedIssue.type}</span>
            </div>
            <div className="text-xs">
              <span className="text-[#6a737d]">Location: </span>
              <span className="text-[#cccccc]">Line {selectedIssue.line}, Column {selectedIssue.column}</span>
            </div>
            <div className="text-xs">
              <span className="text-[#6a737d]">Suggestion: </span>
              <span className="text-[#cccccc]">{selectedIssue.suggestion}</span>
            </div>
            {selectedIssue.autoFixable && (
              <button className="w-full bg-[#73c991] hover:bg-[#5fa875] text-black text-xs py-2 px-3 rounded transition-colors">
                Apply Auto-fix
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCodeAnalyzer;