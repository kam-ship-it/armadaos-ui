import { ReactNode, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LeftNav } from './LeftNav';
import { PulseBar } from './PulseBar';
import { NexusChat } from './nexus/NexusChat';
import { Onboarding } from './onboarding/Onboarding';

interface GodModeLayoutProps {
  children?: ReactNode;
}

export function GodModeLayout({ children }: GodModeLayoutProps) {
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const activeLens = location.pathname.includes('constitution') ? 'constitution' : 
                     location.pathname.includes('battlefield') ? 'battlefield' : 'architecture';

  // Check local storage for onboarding status
  useEffect(() => {
    const hasOnboarded = localStorage.getItem('gm_onboarding_complete');
    if (hasOnboarded) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('gm_onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="flex h-screen w-full bg-[var(--gm-onyx)] text-[var(--gm-snow)] overflow-hidden font-sans">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* LEFT NAVIGATION */}
      <LeftNav activeLens={activeLens} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <PulseBar />

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* RIGHT PANEL (NEXUS) */}
      <div className="w-80 shrink-0 border-l border-[var(--gm-graphite)] bg-[var(--gm-onyx)]">
        <NexusChat />
      </div>
    </div>
  );
}
