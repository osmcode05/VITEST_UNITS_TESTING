
export function dealCards(cards, handSize, numberOfPlayers) {

    if (handSize * numberOfPlayers > cards.length)
        throw new Error("Cards Not enough");

    const hands = Array.from({ length: numberOfPlayers }, () => []);

    hands.forEach(hand => {
        for (let i = 1; i <= handSize; i++) {
            hand.push(cards.shift());
        }
    });

    return hands;
}

// This function should deal cards to players
// it receives three parameters :
// - cards : array of cards to deal from
// - handSize : number of cards per player
// - numberOfPlayers : number of players to deal cards to
// it should return an array of hands, each hand is an array of cards