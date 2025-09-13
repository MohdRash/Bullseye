import React from 'react';
import { X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  actions?: Array<{ label: string; action: () => void }>;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onDismiss }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info size={16} className="text-[#007acc]" />;
      case 'warning': return <AlertTriangle size={16} className="text-[#f9c23c]" />;
      case 'success': return <CheckCircle size={16} className="text-[#73c991]" />;
      case 'error': return <XCircle size={16} className="text-[#f14c4c]" />;
      default: return <Info size={16} className="text-[#007acc]" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-[#1e3a5f]';
      case 'warning': return 'bg-[#5f4e1e]';
      case 'success': return 'bg-[#1e5f3a]';
      case 'error': return 'bg-[#5f1e1e]';
      default: return 'bg-[#1e3a5f]';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} border border-[#3e3e42] rounded-lg p-4 shadow-lg animate-slide-in`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-[#cccccc] mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-[#6a737d] mb-2">
                {notification.message}
              </p>
              
              {notification.actions && (
                <div className="flex gap-2">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="text-xs px-2 py-1 bg-[#007acc] text-white rounded hover:bg-[#106ba3] transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => onDismiss(notification.id)}
              className="flex-shrink-0 p-1 hover:bg-[#3e3e42] rounded transition-colors"
            >
              <X size={14} className="text-[#cccccc]" />
            </button>
          </div>
          
          <div className="text-xs text-[#6a737d] mt-2">
            {notification.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;