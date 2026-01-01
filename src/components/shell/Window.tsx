// Minimal Window Component for BATCH-DESKTOP-01
// Full window management will be in BATCH-DESKTOP-02

import React from 'react';
import { Rnd } from 'react-rnd';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WindowProps {
  app: string;
  title?: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
}

export const Window: React.FC<WindowProps> = ({
  app: _app,
  title = 'Window',
  children,
  defaultWidth = 1400,
  defaultHeight = 900,
  defaultX = 50,
  defaultY = 50,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate back to desktop when closing God Mode window
    navigate('/desktop');
  };

  return (
    <Rnd
      default={{
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight,
      }}
      minWidth={800}
      minHeight={600}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{
        zIndex: 100,
        border: 'none',
        outline: 'none',
      }}
      className="window-no-border"
    >
      <div 
        className="w-full h-full flex flex-col rounded-lg overflow-hidden window-no-border" 
        style={{
          background: 'rgba(28, 28, 31, 0.7)',
          backdropFilter: 'blur(12px)',
          border: 'none',
          outline: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Title Bar */}
        <div className="window-drag-handle flex items-center justify-between h-10 px-4 cursor-move" style={{
          background: 'rgba(18, 18, 20, 0.5)',
          borderBottom: 'none'
        }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            <span className="text-sm font-medium" style={{ color: '#F5F5F7' }}>{title}</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[#3A3A3D] rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" style={{ color: '#F5F5F7' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  );
};
