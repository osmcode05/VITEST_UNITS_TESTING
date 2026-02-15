// I write this code by TDD method, Test first then code (look at src/createCards.test.js to see tests)
export function createCards({ suits, values }) {

  if (!Array.isArray(suits) || !Array.isArray(values))
    throw new Error("suits and values must be arrays");

  if (suits.length !== 4 || values.length !== 13)
    throw new Error("inputs should be 4 suits and 13 values");
  
  const cards = [];
  suits.map((suit) => {
    values.map((value) => {
      cards.push(suit + value);
    });
  });

  return cards;
}
