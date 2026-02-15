import { shuffleCards } from "./shuffleCards.js"
import { dealCards } from "./dealCards.js"

export function setupGame(cards, handSize, numberOfPlayers) {
  const shuffledCards = shuffleCards(cards)
  const hands = dealCards(shuffledCards, handSize, numberOfPlayers)
  
  const players = hands.map((hand, index) => ({
    id: index + 1,
    hand: hand,
    currentTurn: index === 0 // true for first player, false for others. so the first player starts the game
  }))
  
  return players
}

// This function should set up the game by shuffling the cards and dealing them to players