export function shuffleCards(cards) {
    const shuffled = [...cards]
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    return shuffled
}
// in This function I use ** the Fisher-Yates shuffle algorithm ** 
// to randomize the order of an array of cards.


