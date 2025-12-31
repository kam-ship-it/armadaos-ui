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
        {/* Shell is now GLOBAL - visible on ALL routes */}
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/desktop" replace />} />
            <Route path="/desktop" element={
              <DesktopShell mode="standalone" />
            } />
          <Route path="/god-mode/*" element={
            <Window app="god-mode" title="God Mode" defaultWidth={1400} defaultHeight={900}>
              <GodModeLayout>
                <Routes>
                  <Route path="architecture" element={<ArchitectureLens />} />
                  <Route path="constitution" element={<ConstitutionLens />} />
                  <Route path="battlefield" element={<BattlefieldLens />} />
                </Routes>
              </GodModeLayout>
            </Window>
          } />
          </Routes>
        </Shell>
      </div>
    </BrowserRouter>
  );
}

export default App;
