import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GodModeLayout } from './components/god-mode/GodModeLayout';
import { ArchitectureLens } from './components/god-mode/ArchitectureLens';

const queryClient = new QueryClient();

// Placeholder components for lenses (will be implemented in future batches)

const ConstitutionLens = () => (
  <div className="p-8 border border-gm-border rounded-lg bg-gm-surface">
    <h1 className="text-2xl font-mono mb-4 text-gm-text">Constitution Lens</h1>
    <p className="text-gm-secondary">Governance protocols dashboard coming in BATCH-GM-03.</p>
  </div>
);

const BattlefieldLens = () => (
  <div className="p-8 border border-gm-border rounded-lg bg-gm-surface">
    <h1 className="text-2xl font-mono mb-4 text-gm-text">Battlefield Lens</h1>
    <p className="text-gm-secondary">Active operations tracker coming in BATCH-GM-04.</p>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/god-mode/architecture" replace />} />
        
        <Route path="/god-mode" element={<GodModeLayout />}>
          <Route index element={<Navigate to="architecture" replace />} />
          <Route path="architecture" element={<ArchitectureLens />} />
          <Route path="constitution" element={<ConstitutionLens />} />
          <Route path="battlefield" element={<BattlefieldLens />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<div className="h-screen w-screen flex items-center justify-center bg-gm-bg text-gm-red font-mono text-xl">404 - SECTOR NOT FOUND</div>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
