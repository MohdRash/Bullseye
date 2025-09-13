import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, VideoOff, Share2, MessageSquare, Hand, Crown, Eye } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isHost: boolean;
  isOnline: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  cursor?: { x: number; y: number; file: string };
  selection?: { start: number; end: number; file: string };
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'code' | 'system';
}

const AdvancedCollaboration: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'You',
      avatar: '👨‍💻',
      color: '#007acc',
      isHost: true,
      isOnline: true,
      isVideoOn: true,
      isAudioOn: true
    },
    {
      id: '2',
      name: 'Alice Chen',
      avatar: '👩‍💻',
      color: '#73c991',
      isHost: false,
      isOnline: true,
      isVideoOn: false,
      isAudioOn: true,
      cursor: { x: 450, y: 200, file: 'src/App.tsx' }
    },
    {
      id: '3',
      name: 'Bob Wilson',
      avatar: '👨‍🎨',
      color: '#f9c23c',
      isHost: false,
      isOnline: true,
      isVideoOn: true,
      isAudioOn: false,
      selection: { start: 100, end: 150, file: 'src/components/IDE.tsx' }
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Alice Chen',
      message: 'Hey everyone! Ready to work on the new feature?',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Bob Wilson',
      message: 'Yes! I\'ve been looking at the design mockups.',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      userId: 'system',
      userName: 'System',
      message: 'Alice Chen shared a code snippet',
      timestamp: new Date(Date.now() - 180000),
      type: 'system'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: '1',
      userName: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const toggleVideo = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isVideoOn: !p.isVideoOn } : p
    ));
  };

  const toggleAudio = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isAudioOn: !p.isAudioOn } : p
    ));
  };

  return (
    <>
      {/* Floating Collaboration Panel */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {/* Participants Bar */}
        <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#007acc]" />
            <div className="flex items-center gap-1">
              {participants.map(participant => (
                <div
                  key={participant.id}
                  className="relative group"
                  title={participant.name}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                      participant.isOnline ? 'border-[#73c991]' : 'border-[#6a737d]'
                    }`}
                    style={{ backgroundColor: participant.color + '20' }}
                  >
                    {participant.avatar}
                  </div>
                  {participant.isHost && (
                    <Crown size={10} className="absolute -top-1 -right-1 text-[#f9c23c]" />
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-[#252526] ${
                    participant.isOnline ? 'bg-[#73c991]' : 'bg-[#6a737d]'
                  }`} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#1e1e1e] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {participant.name}
                    {participant.isHost && ' (Host)'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`p-1 rounded transition-colors ${
                  showVideo ? 'bg-[#007acc] text-white' : 'hover:bg-[#3e3e42] text-[#cccccc]'
                }`}
                title="Toggle Video Call"
              >
                <Video size={14} />
              </button>
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-1 rounded transition-colors ${
                  showChat ? 'bg-[#007acc] text-white' : 'hover:bg-[#3e3e42] text-[#cccccc]'
                }`}
                title="Toggle Chat"
              >
                <MessageSquare size={14} />
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-1 rounded transition-colors ${
                  isScreenSharing ? 'bg-[#73c991] text-white' : 'hover:bg-[#3e3e42] text-[#cccccc]'
                }`}
                title="Share Screen"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Call Panel */}
        {showVideo && (
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-3 shadow-lg w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#cccccc]">Video Call</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-[#6a737d] hover:text-[#cccccc] transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              {participants.filter(p => p.isVideoOn).map(participant => (
                <div key={participant.id} className="relative bg-[#1e1e1e] rounded aspect-video flex items-center justify-center">
                  <div className="text-2xl">{participant.avatar}</div>
                  <div className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-50 px-1 rounded">
                    {participant.name}
                  </div>
                  {!participant.isAudioOn && (
                    <MicOff size={12} className="absolute top-1 right-1 text-[#f14c4c]" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-2">
              <button
                onClick={() => toggleAudio('1')}
                className={`p-2 rounded-full transition-colors ${
                  participants[0].isAudioOn ? 'bg-[#3e3e42] text-[#cccccc]' : 'bg-[#f14c4c] text-white'
                }`}
              >
                {participants[0].isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button
                onClick={() => toggleVideo('1')}
                className={`p-2 rounded-full transition-colors ${
                  participants[0].isVideoOn ? 'bg-[#3e3e42] text-[#cccccc]' : 'bg-[#f14c4c] text-white'
                }`}
              >
                {participants[0].isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* Chat Panel */}
        {showChat && (
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg shadow-lg w-80 h-96 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
              <h3 className="text-sm font-medium text-[#cccccc]">Team Chat</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-[#6a737d] hover:text-[#cccccc] transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map(message => (
                <div key={message.id} className={`${
                  message.type === 'system' ? 'text-center' : ''
                }`}>
                  {message.type === 'system' ? (
                    <div className="text-xs text-[#6a737d] italic">
                      {message.message}
                    </div>
                  ) : (
                    <div className={`${
                      message.userId === '1' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block max-w-[80%] p-2 rounded-lg ${
                        message.userId === '1' 
                          ? 'bg-[#007acc] text-white' 
                          : 'bg-[#3c3c3c] text-[#cccccc]'
                      }`}>
                        <div className="text-sm">{message.message}</div>
                      </div>
                      <div className="text-xs text-[#6a737d] mt-1">
                        {message.userName} • {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-[#3e3e42]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#3c3c3c] border border-[#3e3e42] rounded px-3 py-2 text-sm text-[#cccccc] placeholder-[#6a737d] focus:outline-none focus:border-[#007acc]"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-3 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#106ba3] transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collaborative Cursors */}
      {participants.filter(p => p.cursor && p.id !== '1').map(participant => (
        <div
          key={participant.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: participant.cursor!.x,
            top: participant.cursor!.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: participant.color }}
          />
          <div
            className="absolute top-4 left-0 text-xs px-2 py-1 rounded text-white whitespace-nowrap"
            style={{ backgroundColor: participant.color }}
          >
            {participant.name}
          </div>
        </div>
      ))}

      {/* Screen Sharing Indicator */}
      {isScreenSharing && (
        <div className="fixed top-0 left-0 right-0 bg-[#73c991] text-black text-center py-2 z-50">
          <div className="flex items-center justify-center gap-2">
            <Share2 size={16} />
            <span className="text-sm font-medium">You are sharing your screen</span>
            <button
              onClick={() => setIsScreenSharing(false)}
              className="ml-4 bg-black bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-sm transition-colors"
            >
              Stop Sharing
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedCollaboration;