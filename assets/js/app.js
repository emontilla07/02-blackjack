const App = (() => {
    'use strict'

    let deck          = [],
        playersPoints = [];
    const types       = ['C', 'D', 'H', 'S',],
          specials    = ['A', 'J', 'Q', 'K',];

    // Referencias del HTML
    const btnTakeCart  = document.querySelector('#btn-take-cart'),
          btnStopGame  = document.querySelector('#btn-stop-game'),
          btnNewGame   = document.querySelector('#btn-new-game'),
          cartsPlayers = document.querySelectorAll('.carts-container'),
          points       = document.querySelectorAll('small');

    // Función que inicializa el juego
    const initGame = (numberOfPlayer = 2) => {
        deck = createDeck();
        playersPoints = [];
        for (let i = 0; i < numberOfPlayer; i++) {
            playersPoints.push(0);
        }
        points.forEach(element => element.innerText = 0);
        cartsPlayers.forEach(element => element.innerHTML = '');
        btnTakeCart.disabled = false;
        btnStopGame.disabled = false;
    }
    
    // Está función crea y revuelve las cartas
    const createDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    }
    
    // Está función permite a los jugadores tomar una carta
    const takeACart = () => {
        if (deck.length === 0) throw 'No hay cartas en el deck';
        return deck.pop();
    }
    
    // Función para obtener el valor de la carta
    const cartValue = (cart) => {
        const cartV = cart.substring(0, cart.length - 1);
        return (isNaN(cartV)) ? 
                (cartV === 'A') ? 11 : 10
                : parseInt(cartV);
    }

    // Turno: 0 = primer jugador y el útlimo será la computadora
    const accumalatePoints = (cart, turn) => {
        playersPoints[turn] += cartValue(cart);
        points[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    // Función para crear las cartas en el DOM
    const createCarts = (cart, turn) => {
        const cartImg = document.createElement('img');
        cartImg.src = `assets/cartas/${cart}.png`;
        cartImg.classList.add('cart');
        cartsPlayers[turn].append(cartImg);
    }

    // Función para validar el ganador
    const winner = () => {
        const [minimunPoints, pcPoints] = playersPoints;
        setTimeout(() => {
            if (pcPoints === minimunPoints) alert('Han empatado');
            else if (minimunPoints > 21) alert('La computadora gana');
            else if (pcPoints > 21) alert('El jugador gana');
            else alert('La computadora gana');
        }, 250);
    }
    
    // Turno computadora
    const pcTurn = (minimunPoints) => {
        let pcPoints = 0;
        do {
            const cart = takeACart();
            pcPoints = accumalatePoints(cart, playersPoints.length - 1);
            createCarts(cart, playersPoints.length - 1);
        } while ((pcPoints < minimunPoints) && (minimunPoints <= 21)); 
        winner();
    }
    
    // Eventos
    btnTakeCart.addEventListener('click', () => {
        const cart = takeACart();
        const playerGame = accumalatePoints(cart, 0);
        createCarts(cart, 0);
        if (playerGame > 21) {
            btnTakeCart.disabled = true;
            pcTurn(playerGame);
        } else if (playerGame === 21) {
            btnTakeCart.disabled = true;
            btnStopGame.disabled = true;
            pcTurn(playerGame);
        }
        return playerGame;
    });
    
    btnStopGame.addEventListener('click', () => {
        btnTakeCart.disabled = true;
        btnStopGame.disabled = true;
        pcTurn(playersPoints[0]);
    });
    
    // btnNewGame.addEventListener('click', () => {
    //     initGame();
    // });
    return {
        newGame: initGame
    };
})();