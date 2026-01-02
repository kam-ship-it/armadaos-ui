// BATCH-105: Ultra-Contrast Mode Toggle - GOLD STANDARD
// Implements Section 2.2.2 of Desktop Shell Specification V2

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './UltraContrastToggle.css';

export const UltraContrastToggle: React.FC = () => {
  const [isUltraContrast, setIsUltraContrast] = useState(false);

  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ultra-contrast-mode');
    if (saved === 'true') {
      setIsUltraContrast(true);
      document.body.classList.add('ultra-contrast');
    }
  }, []);

  const toggleUltraContrast = () => {
    const newValue = !isUltraContrast;
    setIsUltraContrast(newValue);
    
    if (newValue) {
      document.body.classList.add('ultra-contrast');
      localStorage.setItem('ultra-contrast-mode', 'true');
    } else {
      document.body.classList.remove('ultra-contrast');
      localStorage.setItem('ultra-contrast-mode', 'false');
    }
  };

  return (
    <button
      id="ultra-contrast-toggle"
      data-testid="ultra-contrast-toggle"
      className="ultra-contrast-toggle"
      onClick={toggleUltraContrast}
      aria-label={isUltraContrast ? 'Disable Ultra-Contrast Mode' : 'Enable Ultra-Contrast Mode'}
      title={isUltraContrast ? 'Disable Ultra-Contrast Mode' : 'Enable Ultra-Contrast Mode'}
    >
      {isUltraContrast ? (
        <Sun size={20} data-testid="ultra-contrast-icon-sun" />
      ) : (
        <Moon size={20} data-testid="ultra-contrast-icon-moon" />
      )}
    </button>
  );
};
