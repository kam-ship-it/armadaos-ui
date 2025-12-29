import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GodModeLayout } from './components/god-mode/GodModeLayout';
import { ArchitectureLens } from './components/god-mode/ArchitectureLens';
import { ConstitutionLens } from './components/god-mode/ConstitutionLens';
import { BattlefieldLens } from './components/god-mode/BattlefieldLens';

const queryClient = new QueryClient();

// Placeholder components for lenses (will be implemented in future batches)

// ConstitutionLens imported from component

// BattlefieldLens imported from component

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
