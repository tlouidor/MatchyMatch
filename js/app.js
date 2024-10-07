console.log('Matchy Match!')

/*-------------------------------- Constants --------------------------------*/

const possibleMatches = ['red-apple', 'red-apple', 'yellow-banana', 'yellow-banana', 'orange-orange', 'orange-orange'];
const totalPairs = possibleMatches.length /2

/*-------------------------------- Variables --------------------------------*/

let totalMatches = 3; // Total sets of cards
let flipCard = true;
let game = '' // deck at hand
let firstCard = ''
let secondCard = ''
let lockBoard = false;
let msg = ''
let timeLeft = 15;
let match = 0;
let timer;

/*------------------------ Cached Element References ------------------------*/

const cardContainer = document.querySelectorAll('cardContainer');
const resultDisplayEl = document.querySelector('#result-display');
const restartButton = document.getElementById('restartButton');

/*-------------------------------- Functions --------------------------------*/

function init() {
    matchedPairs = 0;
    timeLeft = 15;
    lockBoard = false;
    cardContainer.innerHTML = '';
    const game = shuffle(possibleMatches);
    createBoard(game);

    startTimer();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const cardContainer = document.getElementById('cardContainer');
    shuffle(possibleMatches);
    possibleMatches.forEach((match) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-card', match);
        card.innerHTML = `<img src="images/" alt="${match}" />`;
        card.addEventListener('click', flippedCard);
        // cardContainer.appendChild(card);
    });
}

function flippedCard(cards) {
    possibleMatches.forEach(flipCard);
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    const card = this.querySelector('card');
    img.src = "images"
    // card.src = `path/to/images/${this.getAttribute('data-card')}.png`;
    // card.textContent = this.getAttribute('data-card');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');

    if (isMatch) {
        matchedPairs++;
        resetCards();
        if (matchedPairs === totalPairs) {
            clearInterval(timer);
            alert('You found all pairs!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('countdown-timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Game over!');
            location.reload(); // Reload the page to reset the game
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});

/*----------------------------- Event Listeners -----------------------------*/

// document.querySelector('#restartButton').addEventListener('click', playAgain);
// 
// document.querySelectorAll('button').forEach(function (restartButton) {
    restartButton.addEventListener('click', init);
//   });
  