# BATCH-GM-06: TESTING

**Batch ID:** BATCH-GM-06
**Title:** God Mode Console Testing
**Assigned To:** Atlas 2 (UX/UI)
**Priority:** P1 - HIGH
**Status:** 🔵 PLANNED (Execute after GM-01 to GM-05)
**Created:** December 28, 2025
**Author:** COS v1.1 (per CPO directive)

---

## EXECUTIVE SUMMARY

This batch implements comprehensive testing for the God Mode Console after all UI components are shipped. Per CPO directive, testing is a separate batch to maintain velocity during UI development.

**Estimated Hours:** 16-24
**Dependencies:** BATCH-GM-01, GM-02, GM-03, GM-04, GM-05 (ALL COMPLETE)
**DoD Criteria:** Quality assurance for P13-001 to P13-016

---

## ACCEPTANCE CRITERIA

| ID | Criterion | Verification |
|:---|:----------|:-------------|
| AC-01 | Unit tests for all hooks (useNexus, useGodModeShortcuts, etc.) | Jest test pass |
| AC-02 | Unit tests for utility functions | Jest test pass |
| AC-03 | Integration tests for API calls | MSW mock tests pass |
| AC-04 | E2E tests for critical flows | Playwright tests pass |
| AC-05 | Test coverage > 70% for hooks and utilities | Coverage report |
| AC-06 | All tests pass in CI/CD | GitHub Actions green |

---

## DELIVERABLES

### 1. Unit Tests

| Test File | Tests | Purpose |
|:----------|:------|:--------|
| `useNexus.test.ts` | 8-10 | Test all Nexus hook functions |
| `useGodModeShortcuts.test.ts` | 6 | Test keyboard shortcut handlers |
| `useOnboarding.test.ts` | 4 | Test onboarding state management |
| `utils.test.ts` | 5-10 | Test utility functions |

### 2. Integration Tests

| Test File | Tests | Purpose |
|:----------|:------|:--------|
| `NexusChat.integration.test.tsx` | 5 | Test chat message flow |
| `Timeline.integration.test.tsx` | 4 | Test infinite scroll + filtering |
| `ComponentMap.integration.test.tsx` | 3 | Test tier drill-down |

### 3. E2E Tests (Playwright)

| Test File | Tests | Purpose |
|:----------|:------|:--------|
| `onboarding.e2e.ts` | 3 | Test full onboarding flow |
| `lens-switching.e2e.ts` | 3 | Test navigation between lenses |
| `nexus-chat.e2e.ts` | 3 | Test Nexus conversation |
| `keyboard-shortcuts.e2e.ts` | 4 | Test all keyboard shortcuts |

---

## TEST SPECIFICATIONS

### Unit Test: useNexus Hook

```typescript
// src/hooks/__tests__/useNexus.test.ts
import { renderHook, act } from '@testing-library/react';
import { useNexus } from '../useNexus';

describe('useNexus', () => {
  it('should initialize with empty messages', () => {
    const { result } = renderHook(() => useNexus());
    expect(result.current.messages).toEqual([]);
  });

  it('should add user message on sendMessage', async () => {
    const { result } = renderHook(() => useNexus());
    await act(async () => {
      await result.current.sendMessage('Hello Nexus');
    });
    expect(result.current.messages[0].role).toBe('user');
    expect(result.current.messages[0].content).toBe('Hello Nexus');
  });

  it('should set isLoading during API call', async () => {
    const { result } = renderHook(() => useNexus());
    act(() => {
      result.current.sendMessage('Test');
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('should trigger guide capability', async () => {
    const { result } = renderHook(() => useNexus());
    await act(async () => {
      await result.current.triggerGuide('the-one-gateway');
    });
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].capability).toBe('guide');
  });

  // Additional tests for triggerInterpret, triggerChallenge, triggerExplain
});
```

### Integration Test: Timeline

```typescript
// src/components/god-mode/constitution/__tests__/Timeline.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timeline } from '../Timeline';
import { server } from '../../../../mocks/server';
import { rest } from 'msw';

describe('Timeline Integration', () => {
  it('should load events on mount', async () => {
    render(<Timeline />);
    await waitFor(() => {
      expect(screen.getByText(/event-store/i)).toBeInTheDocument();
    });
  });

  it('should filter events by component', async () => {
    render(<Timeline />);
    const filterSelect = screen.getByLabelText('Component');
    await userEvent.selectOptions(filterSelect, 'the-one-gateway');
    await waitFor(() => {
      expect(screen.queryByText(/event-store/i)).not.toBeInTheDocument();
    });
  });

  it('should load more events on scroll', async () => {
    render(<Timeline />);
    // Scroll to bottom
    const timeline = screen.getByTestId('timeline');
    timeline.scrollTop = timeline.scrollHeight;
    await waitFor(() => {
      expect(screen.getAllByTestId('event-row').length).toBeGreaterThan(10);
    });
  });
});
```

### E2E Test: Onboarding Flow

```typescript
// e2e/onboarding.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to trigger onboarding
    await page.goto('/god-mode');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should show onboarding on first visit', async ({ page }) => {
    await expect(page.getByText('WELCOME TO GOD MODE')).toBeVisible();
  });

  test('should progress through 5 screens', async ({ page }) => {
    // Screen 1
    await expect(page.getByText('WELCOME TO GOD MODE')).toBeVisible();
    await page.click('text=Let\'s Begin');
    
    // Screen 2
    await expect(page.getByText('THE PULSE')).toBeVisible();
    await page.click('text=Next');
    
    // Screen 3
    await expect(page.getByText('THE 3 LENSES')).toBeVisible();
    await page.click('text=Next');
    
    // Screen 4
    await expect(page.getByText('NEXUS')).toBeVisible();
    await page.click('text=Next');
    
    // Screen 5
    await expect(page.getByText('YOUR FIRST MISSION')).toBeVisible();
    await page.click('text=Enter God Mode');
    
    // Should be in God Mode now
    await expect(page.getByTestId('god-mode-layout')).toBeVisible();
  });

  test('should not show onboarding after completion', async ({ page }) => {
    // Complete onboarding
    await page.click('text=Let\'s Begin');
    await page.click('text=Next');
    await page.click('text=Next');
    await page.click('text=Next');
    await page.click('text=Enter God Mode');
    
    // Reload
    await page.reload();
    
    // Should go directly to God Mode
    await expect(page.getByText('WELCOME TO GOD MODE')).not.toBeVisible();
    await expect(page.getByTestId('god-mode-layout')).toBeVisible();
  });
});
```

### E2E Test: Keyboard Shortcuts

```typescript
// e2e/keyboard-shortcuts.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('Keyboard Shortcuts', () => {
  test.beforeEach(async ({ page }) => {
    // Skip onboarding
    await page.goto('/god-mode');
    await page.evaluate(() => {
      localStorage.setItem('armadaos_onboarding_complete', 'true');
    });
    await page.reload();
  });

  test('should switch to Architecture lens with 1', async ({ page }) => {
    await page.keyboard.press('1');
    await expect(page).toHaveURL(/\/god-mode\/architecture/);
  });

  test('should switch to Constitution lens with 2', async ({ page }) => {
    await page.keyboard.press('2');
    await expect(page).toHaveURL(/\/god-mode\/constitution/);
  });

  test('should switch to Battlefield lens with 3', async ({ page }) => {
    await page.keyboard.press('3');
    await expect(page).toHaveURL(/\/god-mode\/battlefield/);
  });

  test('should focus Nexus input with N', async ({ page }) => {
    await page.keyboard.press('n');
    await expect(page.locator('#nexus-input')).toBeFocused();
  });
});
```

---

## MOCK SERVER SETUP

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // Nexus endpoints
  rest.post('/v1/nexus/query', (req, res, ctx) => {
    return res(
      ctx.json({
        response: 'This is a mock Nexus response.',
      })
    );
  }),

  rest.get('/v1/nexus/guide', (req, res, ctx) => {
    return res(
      ctx.json({
        title: 'The One Gateway',
        description: 'The single entry point for all requests...',
        key_facts: ['Handles ~1,234 requests/second'],
      })
    );
  }),

  // Events endpoint
  rest.get('/v1/events', (req, res, ctx) => {
    return res(
      ctx.json({
        events: [
          { id: '1', type: 'success', component: 'event-store', description: 'Test event' },
          { id: '2', type: 'warning', component: 'validator', description: 'Test warning' },
        ],
        cursor: 'next-page',
        hasMore: true,
      })
    );
  }),

  // Components endpoint
  rest.get('/v1/god/components', (req, res, ctx) => {
    return res(
      ctx.json({
        components: [
          { id: 'the-one-gateway', name: 'The One Gateway', status: 'healthy', tier: 'core_substrate' },
          { id: 'event-store', name: 'Event Store', status: 'healthy', tier: 'core_substrate' },
        ],
      })
    );
  }),
];
```

---

## CI/CD INTEGRATION

```yaml
# .github/workflows/test-god-mode.yml
name: God Mode Tests

on:
  push:
    paths:
      - 'src/components/god-mode/**'
      - 'src/hooks/**'
  pull_request:
    paths:
      - 'src/components/god-mode/**'
      - 'src/hooks/**'

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## VERIFICATION CHECKLIST

Before marking complete:

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Coverage > 70% for hooks and utilities
- [ ] CI/CD workflow configured and passing
- [ ] No flaky tests (run 3x to confirm)
- [ ] Mock server covers all API endpoints

---

## SHADOW L3 GATE

This batch completes the God Mode Console quality assurance.

**Verification criteria:**
- All tests pass
- Coverage meets threshold
- CI/CD integration complete
- No regressions in existing functionality

---

*BATCH-GM-06 - Testing*
*Atlas 2 - Execute after UI batches complete*
