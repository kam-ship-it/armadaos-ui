// BATCH-101: Dock Component - 100% Gold Standard Implementation
// Specification: ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md Section 3.5

import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShoppingCart, Users, Settings, Globe } from 'lucide-react';
import './Dock.css';

interface DockApp {
  id: string;
  label: string;
  icon: React.ReactNode;
  isRunning: boolean;
  onClick: () => void;
}

interface DockProps {
  apps?: DockApp[];
  onAppLaunch?: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ 
  apps: customApps,
  onAppLaunch 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [tooltipDelay, setTooltipDelay] = useState<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // Default apps (God Mode, The Store, Boardroom, Settings, Browser)
  const defaultApps: DockApp[] = [
    {
      id: 'god-mode',
      label: 'God Mode',
      icon: <Shield size={32} />,
      isRunning: false,
      onClick: () => handleAppClick('god-mode')
    },
    {
      id: 'the-store',
      label: 'The Store',
      icon: <ShoppingCart size={32} />,
      isRunning: false,
      onClick: () => handleAppClick('the-store')
    },
    {
      id: 'boardroom',
      label: 'Boardroom',
      icon: <Users size={32} />,
      isRunning: false,
      onClick: () => handleAppClick('boardroom')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={32} />,
      isRunning: false,
      onClick: () => handleAppClick('settings')
    },
    {
      id: 'browser',
      label: 'Browser',
      icon: <Globe size={32} />,
      isRunning: true, // Browser is running by default
      onClick: () => handleAppClick('browser')
    }
  ];

  const apps = customApps || defaultApps;

  // Auto-hide constants
  const HIDE_DELAY = 3000; // ms
  const TRIGGER_ZONE_HEIGHT = 5; // pixels from bottom

  // Handle mouse move to detect proximity to bottom edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distanceFromBottom = window.innerHeight - e.clientY;
      
      if (distanceFromBottom <= TRIGGER_ZONE_HEIGHT) {
        showDock();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle keyboard shortcut (⌘D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault();
        toggleDock();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const showDock = () => {
    setIsVisible(true);
    scheduleHide();
  };

  const hideDock = () => {
    setIsVisible(false);
  };

  const toggleDock = () => {
    if (isVisible) {
      hideDock();
    } else {
      showDock();
    }
  };

  const scheduleHide = () => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      hideDock();
    }, HIDE_DELAY);
  };

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleDockEnter = () => {
    clearHideTimeout();
  };

  const handleDockLeave = () => {
    scheduleHide();
  };

  const handleAppClick = (appId: string) => {
    if (onAppLaunch) {
      onAppLaunch(appId);
    }
  };

  const handleIconHover = (appId: string) => {
    // Clear any existing tooltip delay
    if (tooltipDelay) {
      clearTimeout(tooltipDelay);
    }

    // Show tooltip after 500ms
    const timeout = setTimeout(() => {
      setHoveredApp(appId);
    }, 500);

    setTooltipDelay(timeout);
  };

  const handleIconUnhover = () => {
    // Clear tooltip delay
    if (tooltipDelay) {
      clearTimeout(tooltipDelay);
      setTooltipDelay(null);
    }

    // Hide tooltip immediately
    setHoveredApp(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearHideTimeout();
      if (tooltipDelay) {
        clearTimeout(tooltipDelay);
      }
    };
  }, []);

  return (
    <>
      <div
        id="dock"
        ref={dockRef}
        data-visible={isVisible}
        onMouseEnter={handleDockEnter}
        onMouseLeave={handleDockLeave}
        role="navigation"
        aria-label="Application Dock"
      >
        {apps.map((app) => (
          <div
            key={app.id}
            className="dock-icon"
            data-app-id={app.id}
            data-running={app.isRunning}
            onClick={app.onClick}
            onMouseEnter={() => handleIconHover(app.id)}
            onMouseLeave={handleIconUnhover}
            role="button"
            tabIndex={0}
            aria-label={app.label}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                app.onClick();
              }
            }}
          >
            <div className="dock-icon-content">
              {app.icon}
            </div>
            <div className="dock-running-indicator"></div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredApp && (
        <div
          className="dock-tooltip"
          data-visible={hoveredApp !== null}
        >
          {apps.find(app => app.id === hoveredApp)?.label}
        </div>
      )}
    </>
  );
};
// Force deployment
