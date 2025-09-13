import React, { useState } from 'react';
import { Play, Square, RotateCcw, StepBack as StepOver, StepBack as StepInto, StepBack as StepOut, Pause, Settings } from 'lucide-react';
import { useDebug } from '../contexts/DebugContext';

const DebugPanel: React.FC = () => {
  const {
    isDebugging,
    isPaused,
    breakpoints,
    variables,
    callStack,
    watchExpressions,
    startDebugging,
    stopDebugging,
    pauseDebugging,
    resumeDebugging,
    stepOver,
    stepInto,
    stepOut,
    addBreakpoint,
    removeBreakpoint,
    addWatchExpression
  } = useDebug();

  const [newWatchExpression, setNewWatchExpression] = useState('');

  const handleAddWatch = () => {
    if (newWatchExpression.trim()) {
      addWatchExpression(newWatchExpression);
      setNewWatchExpression('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider">Run and Debug</h3>
          <button className="p-1 hover:bg-[#2a2d2e] rounded transition-colors">
            <Settings size={14} className="text-[#cccccc]" />
          </button>
        </div>

        {/* Debug Controls */}
        <div className="flex items-center gap-2 mb-3">
          {!isDebugging ? (
            <button
              onClick={startDebugging}
              className="flex items-center gap-2 px-3 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#106ba3] transition-colors"
            >
              <Play size={14} />
              Start Debugging
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={resumeDebugging}
                  className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                  title="Continue"
                >
                  <Play size={14} className="text-[#73c991]" />
                </button>
              ) : (
                <button
                  onClick={pauseDebugging}
                  className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                  title="Pause"
                >
                  <Pause size={14} className="text-[#f9c23c]" />
                </button>
              )}
              
              <button
                onClick={stopDebugging}
                className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                title="Stop"
              >
                <Square size={14} className="text-[#f14c4c]" />
              </button>
              
              <button
                onClick={() => {
                  stopDebugging();
                  startDebugging();
                }}
                className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                title="Restart"
              >
                <RotateCcw size={14} className="text-[#cccccc]" />
              </button>
              
              <div className="w-px h-6 bg-[#3e3e42] mx-1" />
              
              <button
                onClick={stepOver}
                className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Over"
                disabled={!isPaused}
              >
                <StepOver size={14} className="text-[#cccccc]" />
              </button>
              
              <button
                onClick={stepInto}
                className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Into"
                disabled={!isPaused}
              >
                <StepInto size={14} className="text-[#cccccc]" />
              </button>
              
              <button
                onClick={stepOut}
                className="p-2 hover:bg-[#2a2d2e] rounded transition-colors"
                title="Step Out"
                disabled={!isPaused}
              >
                <StepOut size={14} className="text-[#cccccc]" />
              </button>
            </>
          )}
        </div>

        {/* Launch Configuration */}
        <select className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc]">
          <option>Launch Program</option>
          <option>Attach to Process</option>
          <option>Launch Chrome</option>
          <option>Node.js</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Variables */}
        <div className="p-3 border-b border-[#3e3e42]">
          <h4 className="text-sm font-medium text-[#cccccc] mb-2">Variables</h4>
          {variables.length === 0 ? (
            <div className="text-sm text-[#6a737d]">No variables available</div>
          ) : (
            <div className="space-y-1">
              {variables.map((variable, index) => (
                <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
                  <span className="text-sm text-[#cccccc]">{variable.name}</span>
                  <span className="text-sm text-[#6a737d]">{variable.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watch */}
        <div className="p-3 border-b border-[#3e3e42]">
          <h4 className="text-sm font-medium text-[#cccccc] mb-2">Watch</h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newWatchExpression}
              onChange={(e) => setNewWatchExpression(e.target.value)}
              placeholder="Add expression to watch"
              className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-2 py-1 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
              onKeyDown={(e) => e.key === 'Enter' && handleAddWatch()}
            />
          </div>
          {watchExpressions.map((expr, index) => (
            <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
              <span className="text-sm text-[#cccccc]">{expr.expression}</span>
              <span className="text-sm text-[#6a737d]">{expr.value}</span>
            </div>
          ))}
        </div>

        {/* Call Stack */}
        <div className="p-3 border-b border-[#3e3e42]">
          <h4 className="text-sm font-medium text-[#cccccc] mb-2">Call Stack</h4>
          {callStack.length === 0 ? (
            <div className="text-sm text-[#6a737d]">No call stack available</div>
          ) : (
            <div className="space-y-1">
              {callStack.map((frame, index) => (
                <div key={index} className="py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors cursor-pointer">
                  <div className="text-sm text-[#cccccc]">{frame.function}</div>
                  <div className="text-xs text-[#6a737d]">{frame.file}:{frame.line}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Breakpoints */}
        <div className="p-3">
          <h4 className="text-sm font-medium text-[#cccccc] mb-2">Breakpoints</h4>
          {breakpoints.length === 0 ? (
            <div className="text-sm text-[#6a737d]">No breakpoints set</div>
          ) : (
            <div className="space-y-1">
              {breakpoints.map((bp, index) => (
                <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
                  <div>
                    <div className="text-sm text-[#cccccc]">{bp.file}</div>
                    <div className="text-xs text-[#6a737d]">Line {bp.line}</div>
                  </div>
                  <button
                    onClick={() => removeBreakpoint(bp.file, bp.line)}
                    className="text-[#f14c4c] hover:bg-[#3e3e42] p-1 rounded transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;