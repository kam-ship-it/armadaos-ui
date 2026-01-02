import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GodModeLayout } from '@/components/god-mode/GodModeLayout';
import { ArchitectureLens } from '@/components/god-mode/ArchitectureLens';
import { ConstitutionLens } from '@/components/god-mode/lenses/ConstitutionLens';
import { BattlefieldLens } from '@/components/god-mode/lenses/BattlefieldLens';
import { DesktopShell } from '@/components/desktop-shell/DesktopShell';
import { Shell } from '@/components/shell/Shell';
import { Window } from '@/components/shell/Window';

function App() {
  return (
    <BrowserRouter>
      <div className="dark">
        <Routes>
          <Route path="/" element={<Navigate to="/desktop" replace />} />
          
          {/* ✅ NEW: /desktop uses DesktopShell standalone (no old Shell wrapper) */}
          <Route path="/desktop" element={
            <DesktopShell mode="standalone" />
          } />
          
          {/* ✅ OLD: Other routes still use old Shell */}
          <Route path="/god-mode/*" element={
            <Shell>
              <Window app="god-mode" title="God Mode" defaultWidth={1400} defaultHeight={900}>
                <GodModeLayout>
                  <Routes>
                    <Route path="architecture" element={<ArchitectureLens />} />
                    <Route path="constitution" element={<ConstitutionLens />} />
                    <Route path="battlefield" element={<BattlefieldLens />} />
                  </Routes>
                </GodModeLayout>
              </Window>
            </Shell>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
