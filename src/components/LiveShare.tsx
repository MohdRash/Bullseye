import React, { useState } from 'react';
import { Users, Share, Copy, UserPlus, Crown, Eye } from 'lucide-react';
import { useCollaboration } from '../contexts/CollaborationContext';

const LiveShare: React.FC = () => {
  const {
    isSessionActive,
    sessionId,
    participants,
    startSession,
    endSession,
    inviteUser,
    shareLink
  } = useCollaboration();

  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    // Show notification
  };

  if (!isSessionActive) return null;

  return (
    <>
      {/* Live Share Status Bar */}
      <div className="fixed top-0 left-12 right-0 h-8 bg-[#007acc] flex items-center justify-between px-4 text-white text-sm z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users size={14} />
            <span>Live Share Session Active</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          
          <div className="flex items-center gap-1">
            {participants.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center gap-1 px-2 py-1 bg-white bg-opacity-20 rounded"
                title={participant.name}
              >
                {participant.isHost && <Crown size={12} />}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: participant.color }}
                />
                <span className="text-xs">{participant.name}</span>
                {participant.isViewing && <Eye size={12} />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShareDialog(true)}
            className="flex items-center gap-1 px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
          >
            <Share size={12} />
            <span>Share</span>
          </button>
          
          <button
            onClick={endSession}
            className="px-2 py-1 bg-red-500 bg-opacity-80 rounded hover:bg-opacity-100 transition-colors"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-[#cccccc] mb-4">Share Live Session</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#cccccc] mb-2">Session Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-[#007acc] text-white rounded hover:bg-[#106ba3] transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#cccccc] mb-2">Invite by Email</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="colleague@example.com"
                    className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
                  />
                  <button className="px-3 py-2 bg-[#007acc] text-white rounded hover:bg-[#106ba3] transition-colors">
                    <UserPlus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-sm text-[#6a737d]">
                <p>Session ID: <code className="bg-[#3c3c3c] px-1 rounded">{sessionId}</code></p>
                <p className="mt-1">Participants can join using this link or session ID.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowShareDialog(false)}
                className="px-4 py-2 text-[#cccccc] hover:bg-[#3e3e42] rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveShare;