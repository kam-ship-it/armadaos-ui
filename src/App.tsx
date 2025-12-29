import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GodModeLayout } from '@/components/god-mode/GodModeLayout';
import { ArchitectureLens } from '@/components/god-mode/ArchitectureLens';
import { ConstitutionLens } from '@/components/god-mode/lenses/ConstitutionLens';
import { BattlefieldLens } from '@/components/god-mode/lenses/BattlefieldLens';

function App() {
  return (
    <BrowserRouter>
      <div className="dark">
        <Routes>
          <Route path="/" element={<Navigate to="/god-mode/architecture" replace />} />
          <Route path="/god-mode/*" element={
            <GodModeLayout>
              <Routes>
                <Route path="architecture" element={<ArchitectureLens />} />
                <Route path="constitution" element={<ConstitutionLens />} />
                <Route path="battlefield" element={<BattlefieldLens />} />
              </Routes>
            </GodModeLayout>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
