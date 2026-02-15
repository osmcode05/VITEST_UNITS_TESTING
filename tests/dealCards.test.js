import { describe, it, expect} from "vitest";
import { dealCards } from "../src/dealCards";
import { shuffleCards } from "../src/shuffleCards";
import { createCards } from "../src/createCards";

describe("dealCards function", () => {
  const suits = ['♠', '♥', '♦', '♣']
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

  const Cards_Shuffled = shuffleCards(createCards({ suits, values }))
  const result = dealCards(Cards_Shuffled, 4, 3) // 4 card to 3 player 

  it('deals the correct number of hands', () => {
      expect(result).toBeInstanceOf(Array)
      expect(result).toHaveLength(3)
  })

  it('deals each hand the correct number of cards', () => {
        result.forEach(hand => expect(hand).toHaveLength(4))
   })

     it('throw an error if Cards Not enough', () => {
        expect(() => dealCards(Cards_Shuffled, 10, 8)).toThrow()
   })
})