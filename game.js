const cards = document.querySelectorAll(`.card`);
let hasFlippedCard = false;
let lockBoard = false; //Zablokowanie trzeciego klikniecia
let firstCard, secondCard;
const startTime = new Date().getTime();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; //Zablokowanie dwukrotnego kliknięcia w tą samą karte
    this.classList.add('flip');
    if (!hasFlippedCard) {
        // Pierwsze kliknięcie
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // Drugie kliknięcie
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1300);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstcard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard))