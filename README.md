# 🎯 Vitest Unit Testing - Complete Reference Guide

> **Quick Resume**: This project demonstrates comprehensive unit testing using Vitest. It includes a card game simulator (RAMI) and utility functions, tested with various techniques: basic matchers, async testing, mocking, spies, TDD, and parameterized tests.

---

## 📋 Table of Contents
1. [App Overview](#app-overview)
2. [Test Structure Basics](#test-structure-basics)
3. [Matchers & Assertions](#matchers--assertions)
4. [Async Testing](#async-testing)
5. [Mocking](#mocking)
6. [Spies](#spies)
7. [Parameterized Tests](#parameterized-tests)
8. [TDD Approach](#tdd-approach)
9. [Quick Commands](#quick-commands)

---

## 📱 App Overview

### What This App Does

```
┌─────────────────────────────────────────────────────────┐
│                    APP COMPONENTS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🎴 CARD GAME (RAMI)                                   │
│     ├── createCards()    → Create 52-card deck        │
│     ├── shuffleCards()   → Randomize deck             │
│     ├── dealCards()      → Distribute cards           │
│     └── setupGame()      → Initialize game            │
│                                                         │
│  🔧 UTILITY FUNCTIONS                                  │
│     ├── GetLongString()  → Compare string lengths     │
│     ├── isPrime()        → Check prime numbers        │
│     └── Factorial()      → Calculate factorial        │
│                                                         │
│  🌐 ASYNC OPERATIONS                                   │
│     ├── loadPrayerTimes() → Fetch prayer API         │
│     ├── getUser()         → Fetch user via axios     │
│     └── fetchPost()       → Fetch post via fetch     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
src/
├── createCards.js         → Card deck creation
├── shuffleCards.js        → Card randomization
├── dealCards.js           → Card distribution
├── setupGame.js           → Game initialization
├── example.js             → Utility functions
├── loadPrayerTimes.js     → Async API call
└── mocking.js             → Functions to mock

tests/
├── createCards.test.js    → TDD approach
├── shuffleCards.test.js   → Array manipulation tests
├── dealCards.test.js      → Distribution logic tests
├── setupGame.test.js      → Spy usage
├── example.test.js        → All matchers showcase
├── loadPrayerTimes.test.js→ Async + mocking
└── mock.test.js           → Mock techniques
```

---

## 🧱 Test Structure Basics

### The 3 Building Blocks

```javascript
import { describe, it, expect } from 'vitest'

describe('Feature Name', () => {          // ← Group related tests
  it('should do something', () => {       // ← Single test
    expect(actual).toBe(expected)         // ← Make assertion
  })
})
```

| Function | Purpose | When to Use |
|----------|---------|-------------|
| `describe()` | Group related tests | Organize tests by feature/component |
| `it()` | Define a single test case | Each specific behavior to test |
| `test()` | Alias for `it()` | Same as `it()`, use interchangeably |
| `expect()` | Create assertion | Verify expected outcome |

### Test Lifecycle Hooks

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `beforeEach()` | Before each test | Reset spies, set up test data |
| `afterEach()` | After each test | Clean up resources |
| `beforeAll()` | Once before all tests | Expensive setup |
| `afterAll()` | Once after all tests | Final cleanup |

---

## ✅ Matchers & Assertions

### 1. Basic Value Matchers

| Matcher | What It Checks | Example | Use When |
|---------|----------------|---------|----------|
| `.toBe()` | Exact equality (===) | `expect(5).toBe(5)` | Primitives (numbers, strings, booleans) |
| `.toEqual()` | Deep equality | `expect({a:1}).toEqual({a:1})` | Objects & arrays |
| `.toBeTruthy()` | Any truthy value | `expect(true).toBeTruthy()` | Boolean-like checks |
| `.toBeFalsy()` | Any falsy value | `expect(false).toBeFalsy()` | Checking for falsy values |
| `.toBeUndefined()` | Is undefined | `expect().toBeUndefined()` | Undefined checks |
| `.toBeDefined()` | Is not undefined | `expect(42).toBeDefined()` | Existence checks |
| `.toBeNull()` | Is null | `expect(null).toBeNull()` | Null checks |

**⚠️ Common Mistake**: Using `toBe()` with objects/arrays → Use `toEqual()` instead!

```javascript
// ❌ WRONG
expect([1,2,3]).toBe([1,2,3])        // Fails! Different references

// ✅ CORRECT
expect([1,2,3]).toEqual([1,2,3])     // Passes! Same values
  Fajr: expect.any(String),           // ← Any string value
  count: expect.any(Number),          // ← Any number value
})

// Object contains specific properties
expect(result).toEqual(expect.objectContaining({
  id: 1,
  username: 'Bret'
}))

// Array contains specific elements
expect(arr).toEqual(expect.arrayContaining(['♠A']))
```

---

## 🔄 Parametrized Testing (it.each)

**Problem**: Same test logic, multiple data sets

**Solution**: Use `it.each()` to avoid repetition

```javascript
it.each([
  [{suits: 'not array', values: ''}, 'suits and values must be arrays'],
  [{suits: true, values: undefined}, 'suits and values must be arrays'],
  [{suits: [], values: []}, 'inputs should be 4 suits and 13 values'],
])('should throw error for invalid inputs %s and %s', ({suits, values}, expected) => {
  expect(() => createCards({suits, values})).toThrow(expected)
})
```

**What happens**:
- Test runs 3 times with different inputs
- Each iteration tests a different scenario
- Reduces code duplication

**Benefits**:
- ✅ Write once, test many scenarios
- ✅ Cleaner, more readable
- ✅ Easy to add new test cases

---

## 🔴 TDD - Test Driven Development

**Philosophy**: Write tests BEFORE code

### The Red-Green-Blue Cycle

```
1. RED 🔴  → Write test (fails, no code yet)
2. GREEN 🟢 → Write minimum code (test passes)
3. BLUE 🔵 → Refactor (improve quality, keep passing)
4. REPEAT  → Next feature
```

### Example with Comments

```javascript
// Test FIRST (RED - doesn't pass)
describe('createCards', () => {
  it('should return an array', () => {
    expect(Array.isArray(createCards({suits, values}))).toBeTruthy()
  })
})

// Write MINIMUM code (GREEN - test passes)
export function createCards({suits, values}) {
  return []  // ← Minimum code to pass
}

// Refactor (BLUE - still passes, better code)
export function createCards({suits, values}) {
  validate(suits, values)
  return combine(suits, values)
}
```

---

## ⏳ Async Testing

### Method 1: async / await (RECOMMENDED ✅)

```javascript
it('should return prayer times', async () => {
  const result = await loadPrayerTimes('Morocco', 'Agadir')
  
  expect(result).toBeTypeOf('object')
  expect(result).toEqual(expect.objectContaining({
    Fajr: expect.any(String),
    Dhuhr: expect.any(String)
  }))
})
```

### Method 2: Promise Matchers

```javascript
// Test resolved promise
it('resolves to user', () => {
  return expect(getUser(1))
    .resolves.toEqual({id: 1, username: 'Bret'})
})

// Test rejected promise
it('rejects with error', () => {
  return expect(loadPrayerTimes('Invalid', 'City'))
    .rejects.toThrow('Network error')
})
```

### Why async/await is better

```javascript
// ❌ Error handling is unclear
return expect(promise).rejects.toThrow()

// ✅ Clear what's happening
it('handles errors', async () => {
  await expect(loadPrayerTimes('Invalid', 'City')).rejects.toThrow()
})
```

---

## 🎭 Mocking - Replace Real Functions

**What**: Fake external dependencies for tests

**When**: APIs, databases, file systems, third-party libraries

### Mocking Pattern (3 Steps)

```javascript
import { vi } from 'vitest'
import axios from 'axios'

// 1️⃣ Mock the module
vi.mock('axios')

// 2️⃣ Setup what it returns
axios.get.mockResolvedValue({
  data: { id: 1, username: 'Test' }
})

// 3️⃣ Test your code
const user = await getUser(1)
expect(user.username).toBe('Test')
```

### Mock Return Methods

| Method | Returns | Example |
|--------|---------|---------|
| `.mockResolvedValue()` | Resolved promise | `mock.mockResolvedValue({data: 'ok'})` |
| `.mockRejectedValue()` | Rejected promise | `mock.mockRejectedValue(new Error('failed'))` |
| `.mockReturnValue()` | Direct value | `mock.mockReturnValue(42)` |
| `.mockImplementation()` | Custom function | `mock.mockImplementation((x) => x * 2)` |

### Mocking Global APIs

```javascript
// Mock fetch (global)
global.fetch = vi.fn().mockResolvedValue({
  status: 200,
  json: () => Promise.resolve({id: 1, title: 'Post'})
})

const post = await fetchPost(1)
expect(post.title).toBe('Post')
```

### Asserting Mock Calls

```javascript
// Was it called?
expect(axios.get).toHaveBeenCalled()

// Called exactly once?
expect(axios.get).toHaveBeenCalledTimes(1)

// Called with specific arguments?
expect(axios.get).toHaveBeenCalledWith('https://api.com/users/1')
```

---

## 🔍 Spies - Track Real Functions

**What**: Wrap real functions to track calls WITHOUT replacing logic

**Key Difference**: Spies call the original function, mocks don't

### Spy vs Mock - Quick Comparison

| Aspect | SPY | MOCK |
|--------|-----|------|
| Calls original? | ✅ YES | ❌ NO |
| Tracks calls? | ✅ YES | ✅ YES |
| Use case | Internal functions | External APIs |
| Import needed? | Real module | Doesn't matter |

### Using Spies

```javascript
import { vi } from 'vitest'
import * as shuffleModule from '../src/shuffleCards.js'

describe('setupGame', () => {
  let shuffleSpy
  
  beforeEach(() => {
    // Wrap real function with spy
    shuffleSpy = vi.spyOn(shuffleModule, 'shuffleCards')
  })
  
  it('calls shuffle before dealing', () => {
    setupGame(cards, 5, 4)
    
    // Check it was called
    expect(shuffleSpy).toHaveBeenCalledTimes(1)
    
    // Get the cards it returned
    const shuffledCards = shuffleSpy.mock.results[0].value
    
    // Keep using them
    expect(dealCards).toHaveBeenCalledWith(shuffledCards, 5, 4)
  })
  
  beforeEach(() => {
    // Clear after each test (don't pollute next test)
    shuffleSpy.mockClear()
  })
})
```

### Spy Mock Properties

```javascript
// Get return value from first call
spy.mock.results[0].value

// Get call order (for sequencing tests)
spy.mock.invocationCallOrder[0]  // First call order index

// Check it was called
spy.mock.calls.length > 0
```

---

## 🎯 Decision Tree

**Should I use Mock, Spy, or Normal Test?**

```
┌─ Does function depend on external resource?
│  (API, database, file system, 3rd party)
│
├─ YES → Can we avoid the real implementation?
│  └─ YES → Use MOCK (vi.mock())
│  └─ NO  → Use SPY (vi.spyOn())
│
└─ NO → Just checking return values?
   └─ YES → Use NORMAL TEST (just expect())
```

---

## 🛠️ Setup & Cleanup Hooks

```javascript
import { beforeEach, afterEach } from 'vitest'

describe('My tests', () => {
  
  beforeEach(() => {
    // Runs BEFORE each test
    spy = vi.spyOn(module, 'func')
    mockData = setupTestData()
  })
  
  afterEach(() => {
    // Runs AFTER each test
    spy.mockClear()           // Clear spy calls
    vi.clearAllMocks()        // Clear all mocks
    cleanupData()
  })
  
  it('test 1', () => { /* uses beforeEach setup */ })
  it('test 2', () => { /* uses beforeEach setup */ })
})
```

**Why cleanup?** Prevents test interference - each test starts fresh

---

## 📝 Test File Template

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { functionToTest } from '../src/module.js'

describe('Module Name', () => {
  
  beforeEach(() => {
    // Setup data & mocks
  })

  describe('Happy path', () => {
    it('should do X when given Y', () => {
      // Arrange - setup
      const input = { value: 42 }
      
      // Act - do something
      const result = functionToTest(input)
      
      // Assert - verify
      expect(result).toBe(expectedValue)
    })
  })

  describe('Error cases', () => {
    it('should throw error on invalid input', () => {
      expect(() => functionToTest(null)).toThrow('Invalid input')
    })

    it.each([...])('should handle %s', (invalid) => {
      expect(() => functionToTest(invalid)).toThrow()
    })
  })
})
```

---

## ✅ Testing Best Practices

### DO ✅

- Write **descriptive test names**: `should return 52 cards when given 4 suits and 13 values`
- Test **behavior, not implementation**
- Keep **one focus per test** (or closely related assertions)
- Test **edge cases** & **error scenarios**
- Use `it.each()` for **multiple scenarios**
- **Isolate tests** - no dependencies between tests
- **Mock external** resources
- **Cleanup** after each test

### DON'T ❌

- Test private implementation details
- Create test interdependencies
- Make real API/database calls (always mock!)
- Test third-party library logic
- Ignore error cases
- Make tests so complex they're hard to understand
- Leave mocks/spies uncleaned

---

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run specific file
npm test -- shuffleCards.test.js

# Watch mode (reruns on file change)
npm test -- --watch

# Coverage report
npm test -- --coverage
```

---

## 📚 Cheat Sheet - Copy & Paste

```javascript
// IMPORTS
import { describe, it, expect, test, vi, beforeEach, afterEach } from 'vitest'

// STRUCTURE
describe('name', () => { it('test', () => { expect() }) })

// BASIC MATCHERS
.toBe(value)                    .toEqual(value)
.toThrow('msg')                 .toBeTruthy()
.toBeFalsy()                    .toHaveLength(n)

// TYPE MATCHERS
.toBeInstanceOf(Class)          .toBeTypeOf('string')

// SMART MATCHERS
expect.any(String)              expect.objectContaining({})
expect.arrayContaining([])

// PROMISE MATCHERS
.resolves.toBe()                .rejects.toThrow()

// PARAMETRIZED
it.each([...])('desc', ({x}, expected) => {})

// ASYNC
async () => { await expect(promise).resolves.toBe() }

// MOCKING
vi.mock('module')
fn.mockResolvedValue()          fn.mockRejectedValue()
fn.mockReturnValue()            fn.mockClear()
vi.clearAllMocks()

// SPIES
vi.spyOn(module, 'func')
spy.mock.results[0].value       spy.mock.invocationCallOrder

// HOOKS
beforeEach(() => {})            afterEach(() => {})
```

---

## 📚 Real Examples from This Project

### 1. TDD Example (createCards.test.js)
```javascript
// Test FIRST, code after
it('should return an array', () => {
  expect(Array.isArray(createCards({suits, values}))).toBeTruthy()
})
```

### 2. Parametrized Testing (createCards.test.js)
```javascript
it.each([
  [{suits :'not an array', values : ''}, 'must be arrays'],
  [{suits, values : 2026}, 'must be arrays'],
])('should throw error if not arrays', ({suits, values}, msg) => {
  expect(() => createCards({suits, values})).toThrow(msg)
})
```

### 3. Spies (setupGame.test.js)
```javascript
beforeEach(() => {
  shuffleSpy = vi.spyOn(shuffleModule, 'shuffleCards')
  shuffleSpy.mockClear()
})

it('calls shuffle before dealing', () => {
  setupGame(cards, 5, 4)
  
  expect(shuffleSpy).toHaveBeenCalledTimes(1)
  expect(shuffleSpy.mock.invocationCallOrder[0])
    .toBeLessThan(dealSpy.mock.invocationCallOrder[0])
})
```

### 4. Mocking APIs (mock.test.js)
```javascript
vi.mock('axios')

axios.get.mockResolvedValue({
  data: { id: 1, username: 'Bret' }
})

const user = await getUser(1)
expect(axios.get).toHaveBeenCalledWith('https://api.com/users/1')
```

### 5. Async Testing (loadPrayerTimes.test.js)
```javascript
it('returns prayer times', async () => {
  const result = await loadPrayerTimes('Morocco', 'Agadir')
  
  expect(result).toEqual(expect.objectContaining({
    Fajr: expect.any(String),
    Dhuhr: expect.stringContaining(':')
  }))
})

it('rejects on error', async () => {
  await expect(loadPrayerTimes('Invalid', 'City')).rejects.toThrow()
})
```

---

## 🔗 Files Reference

| Test File | Key Concepts |
|-----------|--------------|
| `createCards.test.js` | TDD, describe, it, expect, it.each, toThrow, toHaveLength |
| `dealCards.test.js` | toBeInstanceOf, toHaveLength, forEach, toThrow |
| `shuffleCards.test.js` | arrayContaining, expect.any |
| `example.test.js` | Matchers variety, toBeTruthy, toBeFalsy, objectContaining |
| `setupGame.test.js` | Spies (vi.spyOn), mock.results, mock.invocationCallOrder |
| `loadPrayerTimes.test.js` | Async, await, .resolves, .rejects, mocking fetch |
| `mock.test.js` | Mocking axios, mockResolvedValue, mockRejectedValue |

---

## 💡 Pro Tips for Quick Recall

| Tip | Remember |
|-----|----------|
| **Spy vs Mock** | Spy = track + run original. Mock = fake only |
| **it.each** | For multiple inputs, don't copy-paste tests |
| **Mocking APIs** | Always mock external! Never real API calls in tests |
| **async/await** | Cleaner than .resolves/.rejects |
| **Cleanup** | `.mockClear()` after each test to avoid pollution |
| **Descriptive names** | Test name = what should happen + conditions |
| **One focus** | Each test checks one thing (or related assertions) |

---

## 🎯 Quick Refresh Checklist

When returning after vacation, quickly check:

- [ ] Did I use `it.each()` for multiple scenarios?
- [ ] Are external APIs **mocked**?
- [ ] Do I **cleanup** after each test?
- [ ] Are test names **descriptive**?
- [ ] Did I test **error cases**?
- [ ] Is it **async**? Using `async/await`?
- [ ] Using **spy** to track internal functions?
- [ ] Tests are **isolated** (no dependencies)?

---

**Last Updated**: February 2026  
**Status**: Complete & Ready to Use ✅  
**Average Refresh Time**: 5-10 minutes  
**Good luck! 🍀**
  count: expect.any(Number),          // ← Any number value
})

// Object contains specific properties
expect(result).toEqual(expect.objectContaining({
  id: 1,
  username: 'Bret'
}))

// Array contains specific elements
expect(arr).toEqual(expect.arrayContaining(['♠A']))
```

---

## 🔄 Parametrized Testing (it.each)

**Problem**: Same test logic, multiple data sets

**Solution**: Use `it.each()` to avoid repetition

```javascript
it.each([
  [{suits: 'not array', values: ''}, 'suits and values must be arrays'],
  [{suits: true, values: undefined}, 'suits and values must be arrays'],
  [{suits: [], values: []}, 'inputs should be 4 suits and 13 values'],
])('should throw error for invalid inputs %s and %s', ({suits, values}, expected) => {
  expect(() => createCards({suits, values})).toThrow(expected)
})
```

**What happens**:
- Test runs 3 times with different inputs
- Each iteration tests a different scenario
- Reduces code duplication

**Benefits**:
- ✅ Write once, test many scenarios
- ✅ Cleaner, more readable
- ✅ Easy to add new test cases

---

## 🔴 TDD - Test Driven Development

**Philosophy**: Write tests BEFORE code

### The Red-Green-Blue Cycle

```
1. RED 🔴  → Write test (fails, no code yet)
2. GREEN 🟢 → Write minimum code (test passes)
3. BLUE 🔵 → Refactor (improve quality, keep passing)
4. REPEAT  → Next feature
```

### Example with Comments

```javascript
// Test FIRST (RED - doesn't pass)
describe('createCards', () => {
  it('should return an array', () => {
    expect(Array.isArray(createCards({suits, values}))).toBeTruthy()
  })
})

// Write MINIMUM code (GREEN - test passes)
export function createCards({suits, values}) {
  return []  // ← Minimum code to pass
}

// Refactor (BLUE - still passes, better code)
export function createCards({suits, values}) {
  validate(suits, values)
  return combine(suits, values)
}
```

---

## ⏳ Async Testing

### Method 1: async / await (RECOMMENDED ✅)

```javascript
it('should return prayer times', async () => {
  const result = await loadPrayerTimes('Morocco', 'Agadir')
  
  expect(result).toBeTypeOf('object')
  expect(result).toEqual(expect.objectContaining({
    Fajr: expect.any(String),
    Dhuhr: expect.any(String)
  }))
})
```

### Method 2: Promise Matchers

```javascript
// Test resolved promise
it('resolves to user', () => {
  return expect(getUser(1))
    .resolves.toEqual({id: 1, username: 'Bret'})
})

// Test rejected promise
it('rejects with error', () => {
  return expect(loadPrayerTimes('Invalid', 'City'))
    .rejects.toThrow('Network error')
})
```

### Why async/await is better

```javascript
// ❌ Error handling is unclear
return expect(promise).rejects.toThrow()

// ✅ Clear what's happening
it('handles errors', async () => {
  await expect(loadPrayerTimes('Invalid', 'City')).rejects.toThrow()
})
```

---

## 🎭 Mocking - Replace Real Functions

**What**: Fake external dependencies for tests

**When**: APIs, databases, file systems, third-party libraries

### Mocking Pattern (3 Steps)

```javascript
import { vi } from 'vitest'
import axios from 'axios'

// 1️⃣ Mock the module
vi.mock('axios')

// 2️⃣ Setup what it returns
axios.get.mockResolvedValue({
  data: { id: 1, username: 'Test' }
})

// 3️⃣ Test your code
const user = await getUser(1)
expect(user.username).toBe('Test')
```

### Mock Return Methods

| Method | Returns | Example |
|--------|---------|---------|
| `.mockResolvedValue()` | Resolved promise | `mock.mockResolvedValue({data: 'ok'})` |
| `.mockRejectedValue()` | Rejected promise | `mock.mockRejectedValue(new Error('failed'))` |
| `.mockReturnValue()` | Direct value | `mock.mockReturnValue(42)` |
| `.mockImplementation()` | Custom function | `mock.mockImplementation((x) => x * 2)` |

### Mocking Global APIs

```javascript
// Mock fetch (global)
global.fetch = vi.fn().mockResolvedValue({
  status: 200,
  json: () => Promise.resolve({id: 1, title: 'Post'})
})

const post = await fetchPost(1)
expect(post.title).toBe('Post')
```

### Asserting Mock Calls

```javascript
// Was it called?
expect(axios.get).toHaveBeenCalled()

// Called exactly once?
expect(axios.get).toHaveBeenCalledTimes(1)

// Called with specific arguments?
expect(axios.get).toHaveBeenCalledWith('https://api.com/users/1')
```

---

## 🔍 Spies - Track Real Functions

**What**: Wrap real functions to track calls WITHOUT replacing logic

**Key Difference**: Spies call the original function, mocks don't

### Spy vs Mock - Quick Comparison

| Aspect | SPY | MOCK |
|--------|-----|------|
| Calls original? | ✅ YES | ❌ NO |
| Tracks calls? | ✅ YES | ✅ YES |
| Use case | Internal functions | External APIs |
| Import needed? | Real module | Doesn't matter |

### Using Spies

```javascript
import { vi } from 'vitest'
import * as shuffleModule from '../src/shuffleCards.js'

describe('setupGame', () => {
  let shuffleSpy
  
  beforeEach(() => {
    // Wrap real function with spy
    shuffleSpy = vi.spyOn(shuffleModule, 'shuffleCards')
  })
  
  it('calls shuffle before dealing', () => {
    setupGame(cards, 5, 4)
    
    // Check it was called
    expect(shuffleSpy).toHaveBeenCalledTimes(1)
    
    // Get the cards it returned
    const shuffledCards = shuffleSpy.mock.results[0].value
    
    // Keep using them
    expect(dealCards).toHaveBeenCalledWith(shuffledCards, 5, 4)
  })
  
  beforeEach(() => {
    // Clear after each test (don't pollute next test)
    shuffleSpy.mockClear()
  })
})
```

### Spy Mock Properties

```javascript
// Get return value from first call
spy.mock.results[0].value

// Get call order (for sequencing tests)
spy.mock.invocationCallOrder[0]  // First call order index

// Check it was called
spy.mock.calls.length > 0
```

---

## 🎯 Decision Tree

**Should I use Mock, Spy, or Normal Test?**

```
┌─ Does function depend on external resource?
│  (API, database, file system, 3rd party)
│
├─ YES → Can we avoid the real implementation?
│  └─ YES → Use MOCK (vi.mock())
│  └─ NO  → Use SPY (vi.spyOn())
│
└─ NO → Just checking return values?
   └─ YES → Use NORMAL TEST (just expect())
```

---

## 🛠️ Setup & Cleanup Hooks

```javascript
import { beforeEach, afterEach } from 'vitest'

describe('My tests', () => {
  
  beforeEach(() => {
    // Runs BEFORE each test
    spy = vi.spyOn(module, 'func')
    mockData = setupTestData()
  })
  
  afterEach(() => {
    // Runs AFTER each test
    spy.mockClear()           // Clear spy calls
    vi.clearAllMocks()        // Clear all mocks
    cleanupData()
  })
  
  it('test 1', () => { /* uses beforeEach setup */ })
  it('test 2', () => { /* uses beforeEach setup */ })
})
```

**Why cleanup?** Prevents test interference - each test starts fresh

---

## 📝 Test File Template

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { functionToTest } from '../src/module.js'

describe('Module Name', () => {
  
  beforeEach(() => {
    // Setup data & mocks
  })

  describe('Happy path', () => {
    it('should do X when given Y', () => {
      // Arrange - setup
      const input = { value: 42 }
      
      // Act - do something
      const result = functionToTest(input)
      
      // Assert - verify
      expect(result).toBe(expectedValue)
    })
  })

  describe('Error cases', () => {
    it('should throw error on invalid input', () => {
      expect(() => functionToTest(null)).toThrow('Invalid input')
    })

    it.each([...])('should handle %s', (invalid) => {
      expect(() => functionToTest(invalid)).toThrow()
    })
  })
})
```

---

## ✅ Testing Best Practices

### DO ✅

- Write **descriptive test names**: `should return 52 cards when given 4 suits and 13 values`
- Test **behavior, not implementation**
- Keep **one focus per test** (or closely related assertions)
- Test **edge cases** & **error scenarios**
- Use `it.each()` for **multiple scenarios**
- **Isolate tests** - no dependencies between tests
- **Mock external** resources
- **Cleanup** after each test

### DON'T ❌

- Test private implementation details
- Create test interdependencies
- Make real API/database calls (always mock!)
- Test third-party library logic
- Ignore error cases
- Make tests so complex they're hard to understand
- Leave mocks/spies uncleaned

---

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run specific file
npm test -- shuffleCards.test.js

# Watch mode (reruns on file change)
npm test -- --watch

# Coverage report
npm test -- --coverage
```

---

## 📚 Cheat Sheet - Copy & Paste

```javascript
// IMPORTS
import { describe, it, expect, test, vi, beforeEach, afterEach } from 'vitest'

// STRUCTURE
describe('name', () => { it('test', () => { expect() }) })

// BASIC MATCHERS
.toBe(value)                    .toEqual(value)
.toThrow('msg')                 .toBeTruthy()
.toBeFalsy()                    .toHaveLength(n)

// TYPE MATCHERS
.toBeInstanceOf(Class)          .toBeTypeOf('string')

// SMART MATCHERS
expect.any(String)              expect.objectContaining({})
expect.arrayContaining([])

// PROMISE MATCHERS
.resolves.toBe()                .rejects.toThrow()

// PARAMETRIZED
it.each([...])('desc', ({x}, expected) => {})

// ASYNC
async () => { await expect(promise).resolves.toBe() }

// MOCKING
vi.mock('module')
fn.mockResolvedValue()          fn.mockRejectedValue()
fn.mockReturnValue()            fn.mockClear()
vi.clearAllMocks()

// SPIES
vi.spyOn(module, 'func')
spy.mock.results[0].value       spy.mock.invocationCallOrder

// HOOKS
beforeEach(() => {})            afterEach(() => {})
```

---

## 📚 Real Examples from This Project

### 1. TDD Example (createCards.test.js)
```javascript
// Test FIRST, code after
it('should return an array', () => {
  expect(Array.isArray(createCards({suits, values}))).toBeTruthy()
})
```

### 2. Parametrized Testing (createCards.test.js)
```javascript
it.each([
  [{suits :'not an array', values : ''}, 'must be arrays'],
  [{suits, values : 2026}, 'must be arrays'],
])('should throw error if not arrays', ({suits, values}, msg) => {
  expect(() => createCards({suits, values})).toThrow(msg)
})
```

### 3. Spies (setupGame.test.js)
```javascript
beforeEach(() => {
  shuffleSpy = vi.spyOn(shuffleModule, 'shuffleCards')
  shuffleSpy.mockClear()
})

it('calls shuffle before dealing', () => {
  setupGame(cards, 5, 4)
  
  expect(shuffleSpy).toHaveBeenCalledTimes(1)
  expect(shuffleSpy.mock.invocationCallOrder[0])
    .toBeLessThan(dealSpy.mock.invocationCallOrder[0])
})
```

### 4. Mocking APIs (mock.test.js)
```javascript
vi.mock('axios')

axios.get.mockResolvedValue({
  data: { id: 1, username: 'Bret' }
})

const user = await getUser(1)
expect(axios.get).toHaveBeenCalledWith('https://api.com/users/1')
```

### 5. Async Testing (loadPrayerTimes.test.js)
```javascript
it('returns prayer times', async () => {
  const result = await loadPrayerTimes('Morocco', 'Agadir')
  
  expect(result).toEqual(expect.objectContaining({
    Fajr: expect.any(String),
    Dhuhr: expect.stringContaining(':')
  }))
})

it('rejects on error', async () => {
  await expect(loadPrayerTimes('Invalid', 'City')).rejects.toThrow()
})
```

---

## 🔗 Files Reference

| Test File | Key Concepts |
|-----------|--------------|
| `createCards.test.js` | TDD, describe, it, expect, it.each, toThrow, toHaveLength |
| `dealCards.test.js` | toBeInstanceOf, toHaveLength, forEach, toThrow |
| `shuffleCards.test.js` | arrayContaining, expect.any |
| `example.test.js` | Matchers variety, toBeTruthy, toBeFalsy, objectContaining |
| `setupGame.test.js` | Spies (vi.spyOn), mock.results, mock.invocationCallOrder |
| `loadPrayerTimes.test.js` | Async, await, .resolves, .rejects, mocking fetch |
| `mock.test.js` | Mocking axios, mockResolvedValue, mockRejectedValue |

---

## 💡 Pro Tips for Quick Recall

| Tip | Remember |
|-----|----------|
| **Spy vs Mock** | Spy = track + run original. Mock = fake only |
| **it.each** | For multiple inputs, don't copy-paste tests |
| **Mocking APIs** | Always mock external! Never real API calls in tests |
| **async/await** | Cleaner than .resolves/.rejects |
| **Cleanup** | `.mockClear()` after each test to avoid pollution |
| **Descriptive names** | Test name = what should happen + conditions |
| **One focus** | Each test checks one thing (or related assertions) |

---

## 🎯 Quick Refresh Checklist

When returning after vacation, quickly check:

- [ ] Did I use `it.each()` for multiple scenarios?
- [ ] Are external APIs **mocked**?
- [ ] Do I **cleanup** after each test?
- [ ] Are test names **descriptive**?
- [ ] Did I test **error cases**?
- [ ] Is it **async**? Using `async/await`?
- [ ] Using **spy** to track internal functions?
- [ ] Tests are **isolated** (no dependencies)?

---

**Last Updated**: February 2026  
**Status**: Complete & Ready to Use ✅  
**Average Refresh Time**: 5-10 minutes  
**Good luck! 🍀**
