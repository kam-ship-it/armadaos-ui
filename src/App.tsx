import { Routes, Route, Navigate } from 'react-router-dom';
import { GodModeLayout } from './components/layouts/GodModeLayout';

function App() {
  return (
    <Routes>
      {/* Redirect root to God Mode */}
      <Route path="/" element={<Navigate to="/god-mode" replace />} />
      
      {/* God Mode Routes */}
      <Route path="/god-mode" element={<GodModeLayout />}>
        <Route index element={<Navigate to="architecture" replace />} />
        <Route path="architecture" element={<div className="p-8 text-2xl font-mono">Lens 1: The Architecture (GM-02)</div>} />
        <Route path="constitution" element={<div className="p-8 text-2xl font-mono">Lens 2: The Constitution (GM-03)</div>} />
        <Route path="battlefield" element={<div className="p-8 text-2xl font-mono">Lens 3: The Battlefield (GM-04)</div>} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<div className="h-screen w-screen flex items-center justify-center bg-armada-bg text-armada-red font-mono text-xl">404 - SECTOR NOT FOUND</div>} />
    </Routes>
  );
}

export default App;
