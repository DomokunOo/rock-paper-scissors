/* 
Underline when hover over play-game button
*/
const playGameBtn = document.querySelector('#play-game');
const h1 = document.querySelector('h1');

playGameBtn.addEventListener('mouseenter', () => {
    underline('h1');
});

function underline(h1) {
    document.querySelector('h1').style.textDecoration = 'underline';
    document.querySelector('h1').style.textDecorationColor = 'white';
    return false;
};

playGameBtn.addEventListener('mouseleave', () => {
    document.querySelector('h1').style.textDecorationColor = '';
    document.querySelector('h1').style.textDecoration = 'none';
    document.querySelector('h1').style.transitionDuration = '0.3s';
    document.querySelector('h1').style.transform = 'perspective(1px) translateZ(0)';
    return false;
});

// showPage('game-page', 'front-page'); //DEBUGGGGGGG

/*
Event listen play-game button click and hide front-page and show game-page
*/
playGameBtn.addEventListener('click', () => {
    showPage('game-page', 'front-page');
    removeBtnEvent();
    gameReset();
    startGame();
});

/* 
Event listen to back-btn and go back to front-page
*/
const backBtn = document.querySelector('#back-btn')

backBtn.addEventListener('click', () => {
    showPage('front-page', 'game-page');
});

/*
function that hides front-page and shows game-page
*/
function showPage(show, hide) {
    document.getElementById(show).style.display = 'flex';
    document.getElementById(hide).style.display = 'none';
    return false;
}

/*
Your game is going to play against the computer,
so begin with a function called computerPlay
that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’.
We’ll use this function in the game to make the computer’s play.
*/
function computerPlay() {
    // Create an array with items ‘Rock’, ‘Paper’, ‘Scissors’
    let array = ['rock', 'paper', 'scissors'];

    // outputs random array item [random number from array.length (0-2)]
    let randArrayItems = array[Math.floor(Math.random() * array.length)];
    return randArrayItems;
}

/*
Write a function that plays a single round of Rock Paper Scissors.
The function should take two parameters - the playerSelection and computerSelection - 
and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"
Make your function case insensitive (so users can input rock, ROCK, RocK or any other variation)
*/
function playRound(playerSelection, computerSelection) {

    displayComputerSelection(computerSelection);

    //compare PlayerSelection and conputerSelection
    //if playerSelection (Rock) and ComputerSelection (Paper)
    if (playerSelection === 'rock' && computerSelection === 'paper') {
        loss += 1;
        const rockPaperLoss = document.querySelector('#round-result');
        rockPaperLoss.textContent = "You Lose! Paper beats Rock";
        return;
    }

    //If playerSelection (Paper) and ComputerSelection (Rock)
    else if (playerSelection === 'paper' && computerSelection === 'rock') {
        win += 1;
        const paperRockWin = document.querySelector('#round-result');
        paperRockWin.textContent = "You Win! Paper beats Rock";
        return;
    }

    //if playerSelection (Paper) and ComputerSelection (Scissors)
    else if (playerSelection === 'paper' && computerSelection === 'scissors') {
        loss += 1;
        const paperScissorsLoss = document.querySelector('#round-result');
        paperScissorsLoss.textContent = "You Lose! Scissors beats Paper";
        return;
    }

    //If playerSelection (Scissors) and ComputerSelection (Paper)
    else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        win += 1;
        const ScissorsPaperWin = document.querySelector('#round-result');
        ScissorsPaperWin.textContent = "You Win! Scissors beats Paper";
        return;
    }

    //if playerSelection (Scissors) and ComputerSelection (Rock)
    else if (playerSelection === 'scissors' && computerSelection === 'rock') {
        loss += 1;
        const scissorsRockLoss = document.querySelector('#round-result');
        scissorsRockLoss.textContent = "You Lose! Paper beats Rock";
        return;
    }

    //If playerSelection (Rock) and ComputerSelection (Scissors)
    else if (playerSelection === 'rock' && computerSelection === 'scissors') {
        win += 1;
        const rockScissorsWin = document.querySelector('#round-result');
        rockScissorsWin.textContent = "You Lose! Paper beats Rock";
        return;
    }

    //if playerSelection == computerSelection then "It's a tie!"
    else {
        tie += 1;
        const roundTie = document.querySelector('#round-result');
        roundTie.textContent = "You Lose! Paper beats Rock";
        return;
    }
}

/*
Displays icon of computer selection
*/
function displayComputerSelection(computerSelection) {
    const computerPlay = document.querySelector('.computerPlay');

    if (computerSelection === 'rock') {
        showIcon('compRock')
    } else if (computerSelection === 'paper') {
        showIcon('compPaper')
    } else if (computerSelection === 'scissors') {
        showIcon('compScissors')
    }
}

//hide all i elements in #computerPlay and show element of specified id
function showIcon(show) {
    const computerPlay = document.querySelector("#computerPlay");
    const i = computerPlay.querySelectorAll('i');

    i.forEach((i) => {
        i.style.display = "none"
    });

    document.getElementById(show).style.display = "inline-block";
}

//set gloal veriables for counter() and playround()
let win = 0;
let loss = 0;
let tie = 0;
let round = 0;

// Check if rock/paper/scissors icon is clicked
function gameBtn() {
    const btns = document.querySelectorAll('.btn');

    btns.forEach((btn) => {
        btn.addEventListener('click', listener);
    });
}

//gets value of btn element id ('rock', 'paper', 'scissors')
function listener() {
    let playerSelection = document.getElementsByClassName("btn")[0].id 
    game(playerSelection);
}

//passes playerSelection value from play() function
function game(playerSelection) {

    let computerSelection = computerPlay();

    //plays a round of the game!
    playRound(playerSelection, computerSelection);

    round += 1;
    counter(round, win, loss, tie)
}

//global counter
function counter(round, win, loss, tie) {

    const roundCounter = document.querySelector('#start-round');
    roundCounter.textContent = `Round ${round}`;

    const winCounter = document.querySelector('#win');
    winCounter.textContent = `Win: ${win}`

    const lossCounter = document.querySelector('#loss');
    lossCounter.textContent = `Loss: ${loss}`

    const tieCounter = document.querySelector('#tie');
    tieCounter.textContent = `Tie: ${tie}`

    if (win == 5 || loss == 5) {
        gameOver();
    }
}

//removes gameBtn event listener
function removeBtnEvent() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
        btn.removeEventListener('click', listener);
    });
}

//Show final results and reset game
//Game ends when first to 5 points
function gameOver() {
    //Final Results
    if (win > loss) {
        const youLose = document.querySelector('#start-round');
        youLose.textContent = "Game Over! You Win!";
    } else if (win < loss) {
        const youWin = document.querySelector('#start-round');
        youWin.textContent = "Game Over! You Lose!";
    }

    //reset counters to 0
    round = 0;
    win = 0;
    loss = 0;
    tie = 0;

    //remove Event listener to btns
    removeBtnEvent();

    //allow playagainbtn to work
    playAgainBtn()
}

//Start button to begin game
function startGame() {
    const start = document.querySelector('#start')

    start.addEventListener('click', function listener() {
        gameBtn();
        gameReset();
        restartBtn();
        start.removeEventListener('click', listener)
    })
}

function restartBtn() {
    //restart button event listener
    const restart = document.querySelector('#restart')

    restart.addEventListener('click', function listener() {
        gameBtn();
        gameReset();
    })
}

function playAgainBtn() {
    //play again button event listener
    const playAgain = document.querySelector('#play-again')

    playAgain.addEventListener('click', function listener() {
        gameBtn();
        gameReset();
        playAgain.removeEventListener('click', listener)
    })
}

function gameReset() {
    round = 0;
    win = 0;
    loss = 0;
    tie = 0;

    const winCount = document.querySelector('#win').textContent = "Win: 0";
    const lossCount = document.querySelector('#loss').textContent = "Loss: 0";
    const tieCount = document.querySelector('#tie').textContent = "Tie = 0";

    const roundCounter = document.querySelector('#start-round');
    roundCounter.textContent = "Round Start!";
    const vs = document.querySelector('#round-result');
    vs.textContent = "VS";

    showIcon('compQuestion')
}