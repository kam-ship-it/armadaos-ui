import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, ShoppingCart, Users, Settings, Globe } from 'lucide-react';
import appRegistry from '@/core/app-registry.json';
import { useDesktopStore } from '@/stores/desktopStore';

/**
 * Dock - Application launcher at bottom-center of screen
 * 
 * Features:
 * - Pill-shaped floating bar
 * - Frosted glass effect (backdrop-blur)
 * - Dynamic app icons from registry
 * - Running indicators (violet dot)
 * - Hover animation (1.2x scale, spring)
 */

const iconMap: Record<string, React.ComponentType<any>> = {
  'shield': Shield,
  'shopping-cart': ShoppingCart,
  'users': Users,
  'settings': Settings,
  'globe': Globe,
};

export const Dock: React.FC = () => {
  const navigate = useNavigate();
  const { windows } = useDesktopStore();
  
  // Check if app is running (has open window)
  const isAppRunning = (appId: string) => {
    return windows.some(window => window.appId === appId);
  };
  
  const handleAppClick = (route: string) => {
    navigate(route);
  };
  
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
      <div className="flex items-center gap-3 px-5 py-3 backdrop-blur-xl rounded-3xl" style={{ background: 'rgba(28, 28, 31, 0.8)', border: 'none', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
        {appRegistry.apps.map((app) => {
          const Icon = iconMap[app.icon] || Shield;
          const isRunning = isAppRunning(app.id);
          
          return (
            <motion.div
              key={app.id}
              className="flex flex-col items-center gap-1 cursor-pointer relative"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => handleAppClick(app.route)}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl transition-colors hover:bg-white/10">
                <Icon style={{ color: '#F5F5F7' }} size={28} />
              </div>
              <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: '#F5F5F7' }}>
                {app.name}
              </span>
              {isRunning && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#8B5CF6] rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
