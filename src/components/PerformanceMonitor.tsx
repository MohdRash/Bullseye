import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  network: number;
  bundleSize: number;
  loadTime: number;
  fps: number;
}

interface PerformanceAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  suggestion: string;
  timestamp: Date;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    bundleSize: 0,
    loadTime: 0,
    fps: 60
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);

  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: PerformanceMetrics = {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        network: Math.random() * 10,
        bundleSize: 2.4 + Math.random() * 0.5,
        loadTime: 150 + Math.random() * 100,
        fps: 58 + Math.random() * 4
      };

      setMetrics(newMetrics);
      setHistory(prev => [...prev.slice(-29), newMetrics]);

      // Generate alerts based on metrics
      if (newMetrics.cpu > 80) {
        const alert: PerformanceAlert = {
          id: Date.now().toString(),
          type: 'warning',
          message: 'High CPU usage detected',
          suggestion: 'Consider optimizing heavy computations or using Web Workers',
          timestamp: new Date()
        };
        setAlerts(prev => [alert, ...prev.slice(0, 4)]);
      }

      if (newMetrics.memory > 85) {
        const alert: PerformanceAlert = {
          id: Date.now().toString(),
          type: 'error',
          message: 'Memory usage is critically high',
          suggestion: 'Check for memory leaks and optimize data structures',
          timestamp: new Date()
        };
        setAlerts(prev => [alert, ...prev.slice(0, 4)]);
      }
    };

    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { warning: number; error: number }) => {
    if (value > thresholds.error) return 'text-[#f14c4c]';
    if (value > thresholds.warning) return 'text-[#f9c23c]';
    return 'text-[#73c991]';
  };

  const MetricCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    status: string;
    trend?: 'up' | 'down' | 'stable';
  }> = ({ icon, label, value, status, trend }) => (
    <div className="bg-[#2d2d30] rounded-lg p-3 border border-[#3e3e42]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs text-[#cccccc]">{label}</span>
        </div>
        {trend && (
          <TrendingUp 
            size={12} 
            className={`${
              trend === 'up' ? 'text-[#f14c4c] rotate-0' :
              trend === 'down' ? 'text-[#73c991] rotate-180' :
              'text-[#6a737d]'
            }`} 
          />
        )}
      </div>
      <div className="text-lg font-mono font-bold text-[#cccccc]">{value}</div>
      <div className={`text-xs ${status}`}>
        {status.includes('f14c4c') ? 'Critical' :
         status.includes('f9c23c') ? 'Warning' : 'Good'}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-[#007acc] hover:bg-[#106ba3] text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <Activity size={20} />
        </button>
      ) : (
        <div className="bg-[#252526] border border-[#3e3e42] rounded-lg shadow-2xl w-96 max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-[#007acc]" />
              <h3 className="text-sm font-medium text-[#cccccc]">Performance Monitor</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#cccccc] hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
            {/* Real-time Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <MetricCard
                icon={<Cpu size={14} className="text-[#007acc]" />}
                label="CPU"
                value={`${metrics.cpu.toFixed(1)}%`}
                status={getStatusColor(metrics.cpu, { warning: 70, error: 85 })}
                trend={metrics.cpu > 70 ? 'up' : 'stable'}
              />
              <MetricCard
                icon={<HardDrive size={14} className="text-[#73c991]" />}
                label="Memory"
                value={`${metrics.memory.toFixed(1)}%`}
                status={getStatusColor(metrics.memory, { warning: 75, error: 90 })}
                trend={metrics.memory > 75 ? 'up' : 'stable'}
              />
              <MetricCard
                icon={<Wifi size={14} className="text-[#f9c23c]" />}
                label="Network"
                value={`${metrics.network.toFixed(1)} MB/s`}
                status="text-[#73c991]"
                trend="stable"
              />
              <MetricCard
                icon={<Zap size={14} className="text-[#c586c0]" />}
                label="Bundle"
                value={`${metrics.bundleSize.toFixed(1)} MB`}
                status={getStatusColor(metrics.bundleSize, { warning: 3, error: 5 })}
                trend="stable"
              />
            </div>

            {/* Performance Chart */}
            <div className="bg-[#1e1e1e] rounded p-3">
              <h4 className="text-xs font-medium text-[#cccccc] mb-2">CPU Usage History</h4>
              <div className="flex items-end gap-1 h-16">
                {history.slice(-20).map((metric, index) => (
                  <div
                    key={index}
                    className="bg-[#007acc] rounded-t flex-1 min-w-0 transition-all duration-300"
                    style={{ height: `${(metric.cpu / 100) * 100}%` }}
                    title={`${metric.cpu.toFixed(1)}%`}
                  />
                ))}
              </div>
            </div>

            {/* Performance Alerts */}
            {alerts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-[#cccccc] flex items-center gap-2">
                  <AlertTriangle size={12} />
                  Performance Alerts
                </h4>
                {alerts.slice(0, 3).map(alert => (
                  <div
                    key={alert.id}
                    className={`p-2 rounded border-l-2 ${
                      alert.type === 'error' ? 'bg-[#5f1e1e] border-[#f14c4c]' :
                      alert.type === 'warning' ? 'bg-[#5f4e1e] border-[#f9c23c]' :
                      'bg-[#1e3a5f] border-[#007acc]'
                    }`}
                  >
                    <div className="text-xs font-medium text-[#cccccc] mb-1">
                      {alert.message}
                    </div>
                    <div className="text-xs text-[#6a737d]">
                      {alert.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-[#007acc] hover:bg-[#106ba3] text-white text-xs py-2 px-3 rounded transition-colors">
                Optimize Bundle
              </button>
              <button className="flex-1 bg-[#3e3e42] hover:bg-[#4a4a4a] text-[#cccccc] text-xs py-2 px-3 rounded transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;