import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PulseBar } from './PulseBar';
import { LeftNav } from './LeftNav';
import { NexusPanel } from './NexusPanel';
import { BootSequence } from './BootSequence';

export function GodModeLayout() {
  const [isNexusOpen, setIsNexusOpen] = useState(true);
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <>
      {isBooting && <BootSequence onComplete={handleBootComplete} />}
      
      <div className="h-screen w-screen bg-gm-bg text-gm-text flex flex-col overflow-hidden font-sans">
        {/* Top: Pulse Bar */}
        <PulseBar />

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Navigation */}
          <LeftNav />

          {/* Center: Content */}
          <main className="flex-1 overflow-y-auto p-6 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
                 style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>

          {/* Right: Nexus Panel */}
          <NexusPanel 
            isOpen={isNexusOpen} 
            onToggle={() => setIsNexusOpen(!isNexusOpen)} 
          />
        </div>
      </div>
    </>
  );
}
