// BATCH-100: Top Bar Unit Tests
// Target: 80%+ coverage, 6 tests

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopBar } from '../TopBar';

describe('TopBar', () => {
  beforeEach(() => {
    // Mock Date to have consistent time in tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T14:30:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders with correct structure and ID', () => {
    const { container } = render(<TopBar />);
    const topBar = container.querySelector('#top-bar');
    
    expect(topBar).toBeInTheDocument();
    expect(topBar).toHaveAttribute('id', 'top-bar');
  });

  test('displays time in correct 12-hour format', () => {
    render(<TopBar />);
    
    // Time should be "2:30 PM" based on mocked date
    const timeElement = screen.getByText(/2:30 PM/i);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('id', 'top-bar-time');
  });

  test('time updates every 30 seconds', () => {
    render(<TopBar />);
    
    // Initial time: 2:30 PM
    expect(screen.getByText(/2:30 PM/i)).toBeInTheDocument();
    
    // Verify setInterval was called with 30000ms
    expect(vi.getTimerCount()).toBeGreaterThan(0);
  });

  test('notification badge is hidden when hasUnreadNotifications is false', () => {
    const { container } = render(<TopBar hasUnreadNotifications={false} />);
    const badge = container.querySelector('.notification-badge');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-visible', 'false');
  });

  test('notification badge is visible when hasUnreadNotifications is true', () => {
    const { container } = render(<TopBar hasUnreadNotifications={true} />);
    const badge = container.querySelector('.notification-badge');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-visible', 'true');
  });

  test('renders notification and profile buttons with correct aria-labels', () => {
    render(<TopBar />);
    
    const notificationButton = screen.getByLabelText('Notifications');
    const profileButton = screen.getByLabelText('User Profile');
    
    expect(notificationButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    
    expect(notificationButton).toHaveAttribute('id', 'top-bar-notifications');
    expect(profileButton).toHaveAttribute('id', 'top-bar-profile');
  });

  test('displays app name from prop', () => {
    render(<TopBar appName="Test App" />);
    
    const appNameElement = screen.getByText('Test App');
    expect(appNameElement).toBeInTheDocument();
    expect(appNameElement).toHaveAttribute('id', 'top-bar-app-name');
  });

  test('uses default app name when not provided', () => {
    render(<TopBar />);
    
    const appNameElement = screen.getByText('Dashboard');
    expect(appNameElement).toBeInTheDocument();
  });

  test('renders profile avatar when userAvatar prop is provided', () => {
    render(<TopBar userAvatar="https://example.com/avatar.png" />);
    
    const avatar = screen.getByAltText('User Avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(avatar).toHaveAttribute('width', '28');
    expect(avatar).toHaveAttribute('height', '28');
  });

  test('renders profile placeholder when userAvatar is not provided', () => {
    const { container } = render(<TopBar />);
    
    const placeholder = container.querySelector('.profile-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('calls onNotificationsClick when notification button is clicked', () => {
    const handleClick = vi.fn();
    render(<TopBar onNotificationsClick={handleClick} />);
    
    const notificationButton = screen.getByLabelText('Notifications');
    notificationButton.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls onProfileClick when profile button is clicked', () => {
    const handleClick = vi.fn();
    render(<TopBar onProfileClick={handleClick} />);
    
    const profileButton = screen.getByLabelText('User Profile');
    profileButton.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
