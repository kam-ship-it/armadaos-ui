// BATCH-105: Ultra-Contrast Toggle Tests - GOLD STANDARD

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UltraContrastToggle } from '../UltraContrastToggle';

describe('UltraContrastToggle - Gold Standard Tests', () => {
  beforeEach(() => {
    // Clear localStorage and body classes before each test
    localStorage.clear();
    document.body.classList.remove('ultra-contrast');
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('ultra-contrast');
  });

  // UC-01: Component Structure
  it('renders with correct DOM structure', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    expect(toggle).toBeInTheDocument();
    expect(toggle.tagName).toBe('BUTTON');
  });

  // UC-02: Initial State (Off)
  it('starts in normal mode (not ultra-contrast)', () => {
    render(<UltraContrastToggle />);
    
    const moonIcon = screen.getByTestId('ultra-contrast-icon-moon');
    expect(moonIcon).toBeInTheDocument();
    expect(document.body.classList.contains('ultra-contrast')).toBe(false);
  });

  // UC-03: Toggle On
  it('enables ultra-contrast mode when clicked', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    fireEvent.click(toggle);
    
    expect(document.body.classList.contains('ultra-contrast')).toBe(true);
    expect(screen.getByTestId('ultra-contrast-icon-sun')).toBeInTheDocument();
  });

  // UC-04: Toggle Off
  it('disables ultra-contrast mode when clicked again', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    
    // Enable
    fireEvent.click(toggle);
    expect(document.body.classList.contains('ultra-contrast')).toBe(true);
    
    // Disable
    fireEvent.click(toggle);
    expect(document.body.classList.contains('ultra-contrast')).toBe(false);
    expect(screen.getByTestId('ultra-contrast-icon-moon')).toBeInTheDocument();
  });

  // UC-05: LocalStorage Persistence (Save)
  it('saves preference to localStorage when enabled', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    fireEvent.click(toggle);
    
    expect(localStorage.getItem('ultra-contrast-mode')).toBe('true');
  });

  // UC-06: LocalStorage Persistence (Load)
  it('loads saved preference from localStorage on mount', () => {
    localStorage.setItem('ultra-contrast-mode', 'true');
    
    render(<UltraContrastToggle />);
    
    expect(document.body.classList.contains('ultra-contrast')).toBe(true);
    expect(screen.getByTestId('ultra-contrast-icon-sun')).toBeInTheDocument();
  });

  // UC-07: Aria Label (Off)
  it('has correct aria-label when off', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    expect(toggle).toHaveAttribute('aria-label', 'Enable Ultra-Contrast Mode');
  });

  // UC-08: Aria Label (On)
  it('has correct aria-label when on', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    fireEvent.click(toggle);
    
    expect(toggle).toHaveAttribute('aria-label', 'Disable Ultra-Contrast Mode');
  });

  // UC-09: Icon Changes
  it('changes icon from Moon to Sun when enabled', () => {
    render(<UltraContrastToggle />);
    
    expect(screen.getByTestId('ultra-contrast-icon-moon')).toBeInTheDocument();
    expect(screen.queryByTestId('ultra-contrast-icon-sun')).not.toBeInTheDocument();
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    fireEvent.click(toggle);
    
    expect(screen.queryByTestId('ultra-contrast-icon-moon')).not.toBeInTheDocument();
    expect(screen.getByTestId('ultra-contrast-icon-sun')).toBeInTheDocument();
  });

  // UC-10: CSS Class Applied
  it('has correct CSS class', () => {
    render(<UltraContrastToggle />);
    
    const toggle = screen.getByTestId('ultra-contrast-toggle');
    expect(toggle).toHaveClass('ultra-contrast-toggle');
  });
});
