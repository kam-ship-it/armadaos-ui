import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutGrid, ScrollText, Swords, Monitor } from 'lucide-react';

interface LeftNavProps {
  activeLens?: 'architecture' | 'constitution' | 'battlefield';
}

const navItems = [
  { 
    id: 'architecture', 
    label: 'Architecture', 
    icon: LayoutGrid, 
    path: '/god-mode/architecture' 
  },
  { 
    id: 'constitution', 
    label: 'Constitution', 
    icon: ScrollText, 
    path: '/god-mode/constitution' 
  },
  { 
    id: 'battlefield', 
    label: 'Battlefield', 
    icon: Swords, 
    path: '/god-mode/battlefield' 
  },
];

const externalLinks = [
  {
    id: 'desktop',
    label: 'Desktop Shell',
    icon: Monitor,
    path: '/desktop'
  },
];

export function LeftNav({ activeLens }: LeftNavProps) {
  return (
    <nav className="w-16 border-r border-[var(--gm-slate)] flex flex-col items-center py-6 bg-[var(--gm-surface)] z-20">
      <div className="mb-8">
        <div className="w-8 h-8 bg-[var(--gm-snow)] rounded-full flex items-center justify-center">
          <span className="text-[var(--gm-onyx)] font-bold text-xs">A</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200",
              isActive || activeLens === item.id
                ? "bg-[var(--gm-slate)] text-[var(--gm-snow)] shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                : "text-[var(--gm-silver)] hover:text-[var(--gm-snow)] hover:bg-[var(--gm-slate)]/50"
            )}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </NavLink>
        ))}
      </div>

      {/* External Links */}
      <div className="mt-auto flex flex-col gap-4 w-full px-2">
        <div className="w-full h-px bg-[var(--gm-slate)] my-2" />
        {externalLinks.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 text-[var(--gm-silver)] hover:text-[var(--gm-snow)] hover:bg-[var(--gm-slate)]/50"
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
