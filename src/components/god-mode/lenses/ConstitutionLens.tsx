import { Timeline } from '../constitution/Timeline';
import { ConstitutionViewer } from '../constitution/ConstitutionViewer';

export function ConstitutionLens() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Left Panel: Timeline (5 cols) */}
      <div className="lg:col-span-5 h-[calc(100vh-12rem)]">
        <Timeline />
      </div>

      {/* Right Panel: Constitution Text (7 cols) */}
      <div className="lg:col-span-7 h-[calc(100vh-12rem)]">
        <ConstitutionViewer />
      </div>
    </div>
  );
}
