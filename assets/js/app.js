let deck       = [];
const types    = ['C', 'D', 'H', 'S',];
const specials = ['A', 'J', 'Q', 'K',];

const createDeck = () => {
    for ( let i = 2; i <= 10; i++ ) {
        for ( let ty of types ) {
            deck.push( `${i}${ty}` );
        }
    }

    for ( let ty of types ) {
        for ( let special of specials ) {
            deck.push( `${special}${ty}` );
        }
    }
    console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

createDeck();