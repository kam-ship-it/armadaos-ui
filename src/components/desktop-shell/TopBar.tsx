// BATCH-100: TOP BAR
// 100% Gold Standard Implementation
// Specification: ArmadaOSDesktopShell_Ultra-LuxurySpecificationV2.md Section 3.4

import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import './TopBar.css';

interface TopBarProps {
  appName?: string;
  hasUnreadNotifications?: boolean;
  userAvatar?: string;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  appName = 'Dashboard',
  hasUnreadNotifications = false,
  userAvatar,
  onNotificationsClick,
  onProfileClick,
}) => {
  const [currentTime, setCurrentTime] = useState('');

  // Update time every 30 seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, '0');
      
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    // Update immediately
    updateTime();

    // Update every 30 seconds (EXACT as per spec)
    const interval = setInterval(updateTime, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="top-bar">
      <div className="top-bar-left">
        <span id="top-bar-app-name">{appName}</span>
      </div>
      
      <div className="top-bar-center">
        {/* Reserved for future menu bar */}
      </div>
      
      <div className="top-bar-right">
        <div id="top-bar-time">{currentTime}</div>
        
        <button
          id="top-bar-notifications"
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <Bell size={20} />
          <span
            className="notification-badge"
            data-visible={hasUnreadNotifications.toString()}
          />
        </button>
        
        <button
          id="top-bar-profile"
          aria-label="User Profile"
          onClick={onProfileClick}
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="User Avatar"
              width={28}
              height={28}
            />
          ) : (
            <div className="profile-placeholder" />
          )}
        </button>
      </div>
    </div>
  );
};
