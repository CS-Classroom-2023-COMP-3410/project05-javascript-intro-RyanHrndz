/* JavaScript for Memory Matching Game */
const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-game');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;

const cardSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function startGame() {
    cards = [...cardSymbols, ...cardSymbols]; // Duplicate the symbols
    cards.sort(() => Math.random() - 0.5); // Shuffle the cards

    gameBoard.innerHTML = '';
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });

    moves = 0;
    matchedPairs = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);

    updateMoves();
}

function handleCardClick(e) {
    const clickedCard = e.target;

    if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.symbol;
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        moves++;
        updateMoves();
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cardSymbols.length) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`You won in ${moves} moves and ${timer} seconds!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function updateMoves() {
    movesElement.textContent = `Moves: ${moves}`;
}

restartButton.addEventListener('click', startGame);

startGame();
