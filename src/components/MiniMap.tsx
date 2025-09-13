import React, { useRef, useEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';

const MiniMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeFile, openFiles } = useEditor();
  
  const activeFileObj = openFiles.find(f => f.path === activeFile);

  useEffect(() => {
    if (!canvasRef.current || !activeFileObj) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw code representation
    const lines = activeFileObj.content.split('\n');
    const lineHeight = 2;
    const maxWidth = canvas.offsetWidth - 10;

    lines.forEach((line, index) => {
      const y = index * lineHeight + 5;
      
      // Color based on content
      if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
        ctx.fillStyle = '#6a9955'; // Comments
      } else if (line.includes('function') || line.includes('const') || line.includes('let')) {
        ctx.fillStyle = '#569cd6'; // Keywords
      } else if (line.includes('{') || line.includes('}')) {
        ctx.fillStyle = '#d4d4d4'; // Brackets
      } else if (line.trim() === '') {
        return; // Skip empty lines
      } else {
        ctx.fillStyle = '#cccccc'; // Default text
      }

      // Draw line representation
      const width = Math.min(line.length * 0.8, maxWidth);
      ctx.fillRect(5, y, width, 1);
    });

    // Draw viewport indicator
    ctx.strokeStyle = '#007acc';
    ctx.lineWidth = 1;
    ctx.strokeRect(2, 50, canvas.offsetWidth - 4, 100);

  }, [activeFileObj]);

  if (!activeFileObj) {
    return (
      <div className="h-full bg-[#252526] border-l border-[#3e3e42] flex items-center justify-center">
        <div className="text-xs text-[#6a737d]">No file open</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#252526] border-l border-[#3e3e42] p-2">
      <div className="text-xs text-[#cccccc] mb-2 font-medium">Minimap</div>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default MiniMap;