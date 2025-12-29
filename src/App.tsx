import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GodModeLayout } from '@/components/god-mode/GodModeLayout';
import { ArchitectureLens } from '@/components/god-mode/ArchitectureLens';

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
                <Route path="constitution" element={<div className="text-[var(--gm-snow)]">Constitution Lens - Coming Soon</div>} />
                <Route path="battlefield" element={<div className="text-[var(--gm-snow)]">Battlefield Lens - Coming Soon</div>} />
              </Routes>
            </GodModeLayout>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
