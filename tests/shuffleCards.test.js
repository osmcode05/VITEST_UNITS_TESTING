import {describe, it, expect} from 'vitest'
import { shuffleCards } from '../src/shuffleCards'
import { createCards } from '../src/createCards'



describe('shuffleCards function', () => {
    
    const suits = ['♠', '♥', '♦', '♣']
    const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    
    const result = shuffleCards(createCards({suits, values}))

    it('randomizes the order of an array of cards', () => {

        expect(result).toBeInstanceOf(Array)
        expect(result).toHaveLength(52)
        expect(result).toEqual(expect.arrayContaining(['♠A']))
    })
})