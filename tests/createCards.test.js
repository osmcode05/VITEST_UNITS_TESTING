// In this function I write test first then the code (TDD Method)
import { describe, expect, it } from 'vitest'
import { createCards } from '../src/createCards' 

describe('it createCards function', () => {
    const suits = ['♠', '♥', '♦', '♣']
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    
    it('should return an array', () => {
        expect(Array.isArray(createCards({suits, values}))).toBeTruthy()
    })

    it.each([
    [{suits :'not an array', values : ''}, 'suits and values must be arrays'],
    [{suits, values : 2026}, 'suits and values must be arrays'],
    [{suits: true, values : undefined}, 'suits and values must be arrays'],
    ])('should throws an error if suits or values are not arrays', ({suits, values}, expected) => {
        expect(() => createCards({suits, values})).toThrow(expected)
    })

    it.each([
    [{suits :['♠', '♥', '♦', '♣'], values : ['A','2','3','4','5','6']}, 'inputs should be 4 suits and 13 values'],
    [{suits :['♠', '♥'], values : ['A','2','3','4','5','6','7','8','9','10','J','Q','K']}, 'inputs should be 4 suits and 13 values'],
    [{suits :['♠', '♥'], values : ['A','2','3','4','5','6']}, 'inputs should be 4 suits and 13 values'],
    [{suits :[], values : []}, 'inputs should be 4 suits and 13 values'],
    ])('should throw error if inputs are invalid', ({suits, values}, expected) => {
        expect(() => createCards({suits, values})).toThrow(expected)
    })

    it('creates a deck of 52 cards', () => {
        expect(createCards({suits, values})).toHaveLength(52) 
   })

})

// This fiunction should return an array whit 52 card (Named "RAMI" Cards in morocco) Like :
// ['♠A', '♠2', '♠3', '♠4', '♠5', '♠6', '♠7', '♠8', '♠9', '♠10', '♠J', '♠Q', '♠K', '♥A', '♥2', '♥3', '♥4', '♥5', '♥6', '♥7', '♥8', '♥9', '♥10', '♥J', '♥Q', '♥K', '♦A', '♦2', '♦3', '♦4', '♦5', '♦6', '♦7', '♦8', '♦9', '♦10', '♦J', '♦Q', '♦K', '♣A', '♣2', '♣3', '♣4', '♣5', '♣6', '♣7', '♣8', '♣9', '♣10', '♣J', '♣Q', '♣K']
