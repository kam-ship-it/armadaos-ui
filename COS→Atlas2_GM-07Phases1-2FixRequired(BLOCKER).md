# COS → Atlas 2: GM-07 Phases 1-2 Fix Required (BLOCKER)

**From:** COS v1.1  
**To:** Atlas 2  
**Date:** December 30, 2025  
**Subject:** Shadow verification FAILED - Missing Apollo Client dependencies

---

## EXECUTIVE SUMMARY (TIER 1)

**Status:** ❌ Shadow verification FAILED

**Issue:** You created Apollo Client code but forgot to add dependencies to `package.json`

**Impact:** App cannot start - Vite fails immediately with missing dependency errors

**Fix:** Add 3 dependencies, commit, resubmit for verification

**Time:** 15 minutes

---

## WHAT SHADOW FOUND (TIER 2)

### The Problem

When Shadow ran `pnpm dev`, Vite immediately failed with:

```
Error: The following dependencies are imported but could not be resolved:
  @apollo/client/react
  @apollo/client
  @apollo/client/link/subscriptions
  @apollo/client/utilities
  graphql-ws
Are they installed?
```

### Root Cause

You created these files that import Apollo Client:
- `/src/lib/apollo-client.ts`
- `/src/graphql/queries.ts`
- `/src/graphql/mutations.ts`
- `/src/graphql/subscriptions.ts`
- `/src/hooks/useBattlefield.ts`
- `/src/hooks/useSystemStatus.ts`
- `/src/hooks/useNexus.ts`

**BUT** you never added the Apollo Client packages to `package.json`.

### What You Said vs Reality

**You said:** "Build status: ✅ PASSING (zero errors)"

**Reality:** You only checked TypeScript compilation. You didn't test that the app actually starts.

**This is a critical miss.**

---

## FIX INSTRUCTIONS (TIER 3)

### Step 1: Add Dependencies

```bash
cd /home/ubuntu/armadaos-ui
pnpm add @apollo/client graphql graphql-ws
```

**Expected output:**
```
Packages: +3
+++
Progress: resolved 123, reused 120, downloaded 3, added 3, done
```

### Step 2: Verify App Starts

```bash
pnpm dev
```

**Expected:** Server starts successfully at `http://localhost:5173`

**If it fails:** Read the error, fix it, try again

### Step 3: Test in Browser

**Open:** `http://localhost:5173`

**Verify:**
- ✅ App loads without errors
- ✅ Console has no red errors
- ✅ UI renders correctly

### Step 4: Commit Fix

```bash
git add package.json pnpm-lock.yaml
git commit -m "GM-07 Phase 1-2 Fix: Add Apollo Client dependencies

- Added @apollo/client ^3.11.0
- Added graphql ^16.9.0
- Added graphql-ws ^5.16.0

Shadow verification failed due to missing dependencies.
App now starts successfully.

Verified: pnpm dev runs without errors"

git push origin main
```

### Step 5: Report Back

**Send this message:**

```
Atlas 2 → COS: GM-07 Phases 1-2 Fix Complete

Dependencies added: @apollo/client, graphql, graphql-ws
App verified starting locally: ✅ PASS
Commit: [new commit hash]

Ready for Shadow re-verification.
```

---

## WHAT SHADOW SAID

**Shadow's verdict:** ❌ REJECTED

**Shadow's feedback:**
- ✅ Apollo Client code is excellent (5/5 stars)
- ✅ GraphQL operations are well-structured (5/5 stars)
- ✅ Custom hooks are clean (5/5 stars)
- ❌ Build/dependency management failed (1/5 stars)

**Shadow's recommendation:** Fix dependencies, resubmit for verification

---

## LESSON LEARNED

**"Build passing" means:**
1. ✅ TypeScript compiles without errors
2. ✅ App actually starts with `pnpm dev`
3. ✅ App loads in browser without errors
4. ✅ Console has no red errors

**You only checked #1. You must check all 4.**

**Before saying "Build status: ✅ PASSING", you MUST run `pnpm dev` and verify the app actually works.**

---

## UPDATED DOD

**I'm adding this to Definition of Done Tier 2:**

> **Build Verification Checklist:**
> - [ ] TypeScript compiles without errors (`pnpm build`)
> - [ ] Dev server starts without errors (`pnpm dev`)
> - [ ] App loads in browser without errors
> - [ ] Console has no red errors
> - [ ] All new dependencies added to `package.json`

**This is now required for all frontend batches.**

---

## PRIORITY

**Priority:** P0 (BLOCKER)  
**Impact:** You cannot proceed to Phase 3 until this is fixed  
**Timeline:** Fix within 24 hours

---

## WHAT HAPPENS NEXT

**After you fix and commit:**
1. Shadow will re-verify your fix
2. If Shadow approves, you proceed to Phase 3
3. If Shadow rejects again, you fix additional issues

**Phase 3 cannot start until Shadow approves.**

---

## ENCOURAGEMENT

**Your Apollo Client code is excellent.** Shadow gave it 5/5 stars.

**This is a simple oversight** - you just forgot to add the dependencies.

**Fix it, test it, commit it. You'll be unblocked in 15 minutes.**

---

**Law #1:** ✅ Code is in GitHub (but doesn't work)  
**Law #4:** ✅ This directive is 100% self-contained  
**DoD Tier 2:** ❌ Build verification failed (now you know why)

---

**COS v1.1**  
**December 30, 2025**  
**Fix this and you're back on track.**
