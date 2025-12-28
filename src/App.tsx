import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GodModeLayout } from './components/god-mode/GodModeLayout';

const queryClient = new QueryClient();

// Placeholder components for lenses (will be implemented in future batches)
const ArchitectureLens = () => (
  <div className="p-8 border border-armada-border rounded-lg bg-armada-surface">
    <h1 className="text-2xl font-mono mb-4">Architecture Lens</h1>
    <p className="text-armada-text-muted">System topology visualization coming in BATCH-GM-02.</p>
  </div>
);

const ConstitutionLens = () => (
  <div className="p-8 border border-armada-border rounded-lg bg-armada-surface">
    <h1 className="text-2xl font-mono mb-4">Constitution Lens</h1>
    <p className="text-armada-text-muted">Governance protocols dashboard coming in BATCH-GM-03.</p>
  </div>
);

const BattlefieldLens = () => (
  <div className="p-8 border border-armada-border rounded-lg bg-armada-surface">
    <h1 className="text-2xl font-mono mb-4">Battlefield Lens</h1>
    <p className="text-armada-text-muted">Active operations tracker coming in BATCH-GM-04.</p>
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
        <Route path="*" element={<div className="h-screen w-screen flex items-center justify-center bg-armada-bg text-armada-red font-mono text-xl">404 - SECTOR NOT FOUND</div>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
