import React from 'react';

/**
 * Wallpaper - Geometric circuit board pattern overlay
 * 
 * Features:
 * - Subtle abstract geometric pattern
 * - Diagonal lines forming tech-inspired design
 * - Low opacity (~5-10%)
 * - SVG-based for crisp rendering
 */
export const Wallpaper: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
      {/* SVG pattern will be implemented in Phase 3 */}
      <svg
        className="block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Placeholder - will add circuit pattern in Phase 3 */}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" opacity="0.08" />
      </svg>
    </div>
  );
};
