const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: '',
    aiHand: '',
}

const hands = [...document.querySelectorAll('.select i')];

//First function
function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.color = '');
    this.style.color = '#00ccff';
}

function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === 'paper' & ai === 'rock') || (player === 'rock' && ai === 'scissors') || (player === 'scissors' && ai === 'paper')) {
        return 'win';
    } else {
        return 'loss';
    }
}


//Publishing results
function publishResult(player, ai, result) {
    document.querySelector('[data-summary=your-choice]').textContent = player;
    document.querySelector('[data-summary=ai-choice]').textContent = ai;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-wins"]').textContent = "you";
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-wins"]').textContent = "AI";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-wins"]').textContent = "draw"
    }
}

//Finishing function
function endGame() {
    document.querySelector(`[data-option='${game.playerHand}']`).style.color = '';
    game.playerHand = '';
    game.aiHand = '';
}
//Steering function
function startGame() {
    if (!game.playerHand) {
        return alert('choose a hand!');
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

hands.forEach(hand => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);