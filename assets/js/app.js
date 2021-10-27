let deck         = [];
let playerPoints = 0,
    pcPoints     = 0;
const types      = ['C', 'D', 'H', 'S',];
const specials   = ['A', 'J', 'Q', 'K',];

// Referencias del HTML
const btnTakeCart = document.querySelector('#btn-take-cart');
const btnStopGame = document.querySelector('#btn-stop-game');
const btnNewGame  = document.querySelector('#btn-new-game');
const cartPlayer  = document.querySelector('#carts-player');
const cartPc      = document.querySelector('#carts-pc');
const points      = document.querySelectorAll('small');

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
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

// Está función permite a los jugadores tomar una carta
const takeACart = () => {
    if (deck.length === 0) throw 'No hay cartas en el deck';
    const cart = deck.pop();
    return cart;
}

const cartValue = (cart) => {
    const cartV = cart.substring(0, cart.length - 1);
    return (isNaN(cartV)) ? 
            (cartV === 'A') ? 11 : 10
            : parseInt(cartV);
}

// Turno computadora
const pcTurn = (minimunPoints) => {
    do {
        const cart = takeACart();
        pcPoints += cartValue(cart);
        points[1].innerText = pcPoints;
        const cartImg = document.createElement('img');
        cartImg.src = `assets/cartas/${cart}.png`;
        cartImg.classList.add('cart');
        cartPc.append(cartImg);
        if (minimunPoints > 21) break;
    } while ((pcPoints < minimunPoints) && (minimunPoints <= 21)); 
    setTimeout(() => {
        if (pcPoints === minimunPoints) alert('Han empatado');
        else if (minimunPoints > 21) alert('La computadora gana');
        else if (pcPoints > 21) alert('El jugador gana');
        else alert('La computadora gana');
    }, 250);
}

// Eventos
btnTakeCart.addEventListener('click', () => {
    const cart = takeACart();
    playerPoints += cartValue(cart);
    points[0].innerText = playerPoints;
    const cartImg = document.createElement('img');
    cartImg.src = `assets/cartas/${cart}.png`;
    cartImg.classList.add('cart');
    cartPlayer.append(cartImg);
    if (playerPoints > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnTakeCart.disabled = true;
        pcTurn(playerPoints);
    } else if (playerPoints === 21) {
        console.warn('¡21, genial!');
        btnTakeCart.disabled = true;
        btnStopGame.disabled = true;
        pcTurn(playerPoints);
    }
});

btnStopGame.addEventListener('click', () => {
    btnTakeCart.disabled = true;
    btnStopGame.disabled = true;
    pcTurn(playerPoints);
});

btnNewGame.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = createDeck();
    btnTakeCart.disabled = false;
    btnStopGame.disabled = false;
    cartPlayer.innerHTML = '';
    cartPc.innerHTML = '';
    points[0].innerText = 0;
    points[1].innerText = 0;
    playerPoints = 0;
    pcPoints = 0;
});