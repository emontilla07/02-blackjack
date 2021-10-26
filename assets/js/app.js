let deck       = [];
const types    = ['C', 'D', 'H', 'S',];
const specials = ['A', 'J', 'Q', 'K',];

// Está función crea y revuelve las cartas
const createDeck = () => {
    for ( let i = 2; i <= 10; i++ ) {
        for ( let ty of types ) {
            deck.push(`${i}${ty}`);
        }
    }

    for (let ty of types) {
        for (let special of specials) {
            deck.push(`${special}${ty}`);
        }
    }
    // console.log( deck );
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

// Está función permite a los jugadores tomar una carta
const takeACart = () => {
    if (deck.length === 0) throw 'No hay cartas en el deck';
    const cart = deck.pop();
    console.log(deck);
    console.log(cart);
    return cart;
}

takeACart();