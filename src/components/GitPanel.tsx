import React, { useState } from 'react';
import { GitBranch, GitCommit, GitMerge, Plus, Minus, RefreshCw, Upload, Download, GitPullRequest } from 'lucide-react';
import { useGit } from '../contexts/GitContext';

const GitPanel: React.FC = () => {
  const { 
    currentBranch, 
    branches, 
    changes, 
    commits, 
    isLoading,
    commitMessage,
    setCommitMessage,
    stageFile,
    unstageFile,
    commitChanges,
    createBranch,
    switchBranch,
    pullChanges,
    pushChanges
  } = useGit();
  
  const [showBranchInput, setShowBranchInput] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

  const handleCommit = () => {
    if (commitMessage.trim()) {
      commitChanges();
    }
  };

  const handleCreateBranch = () => {
    if (newBranchName.trim()) {
      createBranch(newBranchName);
      setNewBranchName('');
      setShowBranchInput(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider">Source Control</h3>
          <div className="flex gap-1">
            <button
              onClick={pullChanges}
              className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
              title="Pull"
              disabled={isLoading}
            >
              <Download size={14} className="text-[#cccccc]" />
            </button>
            <button
              onClick={pushChanges}
              className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
              title="Push"
              disabled={isLoading}
            >
              <Upload size={14} className="text-[#cccccc]" />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
              title="Refresh"
            >
              <RefreshCw size={14} className="text-[#cccccc]" />
            </button>
          </div>
        </div>

        {/* Branch Selector */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-[#cccccc]" />
              <select
                value={currentBranch}
                onChange={(e) => switchBranch(e.target.value)}
                className="bg-[#3c3c3c] border border-[#3e3e42] rounded px-2 py-1 text-sm text-[#cccccc] focus:outline-none focus:border-[#007acc]"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowBranchInput(true)}
              className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
              title="New Branch"
            >
              <Plus size={14} className="text-[#cccccc]" />
            </button>
          </div>

          {showBranchInput && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="Branch name"
                className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-2 py-1 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateBranch()}
              />
              <button
                onClick={handleCreateBranch}
                className="px-2 py-1 bg-[#007acc] text-white rounded text-sm hover:bg-[#106ba3] transition-colors"
              >
                Create
              </button>
            </div>
          )}
        </div>

        {/* Commit Message */}
        <div className="mb-3">
          <textarea
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Message (Ctrl+Enter to commit)"
            className="w-full bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc] resize-none"
            rows={3}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleCommit();
              }
            }}
          />
          <button
            onClick={handleCommit}
            disabled={!commitMessage.trim() || changes.staged.length === 0}
            className="w-full mt-2 px-3 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#106ba3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Commit ({changes.staged.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Staged Changes */}
        {changes.staged.length > 0 && (
          <div className="p-3 border-b border-[#3e3e42]">
            <h4 className="text-sm font-medium text-[#cccccc] mb-2 flex items-center gap-2">
              <GitCommit size={14} />
              Staged Changes ({changes.staged.length})
            </h4>
            {changes.staged.map((file, index) => (
              <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1 rounded ${
                    file.status === 'modified' ? 'bg-[#f9c23c] text-black' :
                    file.status === 'added' ? 'bg-[#73c991] text-black' :
                    'bg-[#f14c4c] text-white'
                  }`}>
                    {file.status === 'modified' ? 'M' : file.status === 'added' ? 'A' : 'D'}
                  </span>
                  <span className="text-sm text-[#cccccc] truncate">{file.path}</span>
                </div>
                <button
                  onClick={() => unstageFile(file.path)}
                  className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
                  title="Unstage"
                >
                  <Minus size={12} className="text-[#cccccc]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Unstaged Changes */}
        {changes.unstaged.length > 0 && (
          <div className="p-3 border-b border-[#3e3e42]">
            <h4 className="text-sm font-medium text-[#cccccc] mb-2">
              Changes ({changes.unstaged.length})
            </h4>
            {changes.unstaged.map((file, index) => (
              <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1 rounded ${
                    file.status === 'modified' ? 'bg-[#f9c23c] text-black' :
                    file.status === 'added' ? 'bg-[#73c991] text-black' :
                    'bg-[#f14c4c] text-white'
                  }`}>
                    {file.status === 'modified' ? 'M' : file.status === 'added' ? 'A' : 'D'}
                  </span>
                  <span className="text-sm text-[#cccccc] truncate">{file.path}</span>
                </div>
                <button
                  onClick={() => stageFile(file.path)}
                  className="p-1 hover:bg-[#3e3e42] rounded transition-colors"
                  title="Stage"
                >
                  <Plus size={12} className="text-[#cccccc]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recent Commits */}
        <div className="p-3">
          <h4 className="text-sm font-medium text-[#cccccc] mb-2 flex items-center gap-2">
            <GitMerge size={14} />
            Recent Commits
          </h4>
          {commits.map((commit, index) => (
            <div key={index} className="py-2 px-2 hover:bg-[#2a2d2e] rounded transition-colors">
              <div className="text-sm text-[#cccccc] mb-1">{commit.message}</div>
              <div className="text-xs text-[#6a737d] flex items-center gap-2">
                <span>{commit.author}</span>
                <span>•</span>
                <span>{commit.hash.substring(0, 7)}</span>
                <span>•</span>
                <span>{commit.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitPanel;