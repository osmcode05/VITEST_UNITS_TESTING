// we will test setupGame function using spies 
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as shuffleModule from '../src/shuffleCards.js'
import * as dealModule from '../src/dealCards.js'
import { createCards } from '../src/createCards.js'
import { setupGame } from '../src/setupGame.js'


const suits = ['♠', '♥', '♦', '♣']
const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const cards = createCards({ suits, values })

let shuffleSpy
let dealSpy

describe('setupGame', () => {

  beforeEach(() => {
    shuffleSpy = vi.spyOn(shuffleModule, 'shuffleCards')
    dealSpy = vi.spyOn(dealModule, 'dealCards')
    shuffleSpy.mockClear() 
    dealSpy.mockClear() // Clear the call history of the spy before each test to protect against test interference. 
  })

  it('calls shuffle before dealing cards', () => {
    setupGame(cards, 5, 4)
    
    expect(shuffleSpy).toHaveBeenCalledTimes(1)
    expect(shuffleSpy.mock.invocationCallOrder[0])
      .toBeLessThan(dealSpy.mock.invocationCallOrder[0]) // shuffle should be called before deal
  })
    // .mock.invocationCallOrder[0] : gives the order in which the function was called for the first time [0].


  it('calls deal with correct arguments', () => {
    setupGame(cards, 5, 3)
    
    const shuffledCards = shuffleSpy.mock.results[0].value
    expect(dealSpy).toHaveBeenCalledWith(shuffledCards, 5, 3)
  })
})

// Difference between spy and mock: 
// Spy: wraps a real function, tracks calls but still executes the original function
// Mock: completely replaces a function with a fake implementation, doesn't call the original


// ** When to use which **:

// Is dependency external or has side effects we want to avoid?
//         ↓
//        YES → MOCK

// Is dependency internal but we want to track calls without changing behavior?
//         ↓
//        YES → SPY

// Only checking return value?
//         ↓
//        YES → NORMAL TEST
