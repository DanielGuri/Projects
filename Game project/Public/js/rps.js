const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choise');
const resultDisplay = document.getElementById('result');
const possibleChoice = document.querySelectorAll('button');

let userChoice
let computerChoice
let result

possibleChoice.forEach(possibleChoice => possibleChoice.addEventListener('click', (event) => {
userChoice = event.target.id
userChoiceDisplay.innerHTML = userChoice
generateComputerChoice()
getResult()
}));

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoice.length) + 1

    if (randomNumber == 1) {
        computerChoice = 'rock'
    }
    if (randomNumber == 2) {
        computerChoice = 'paper'
    }
    if (randomNumber == 3) {
        computerChoice = 'scissors'
    }
    computerChoiceDisplay.innerHTML = computerChoice
};

function getResult() {
    if (computerChoice == userChoice){
        result = 'its a Draw!'
    }
    if (computerChoice == 'rock' && userChoice === "paper"){
        result = 'you Win!'
    }
    if (computerChoice == 'rock' && userChoice === "scissors"){
        result = 'you Lost!'
    }
    if (computerChoice == 'paper' && userChoice === "scissors"){
        result = 'you Win!'
    }
    if (computerChoice == 'paper' && userChoice === "rock"){
        result = 'you Lose!'
    }
    if (computerChoice == 'scissors' && userChoice === "rock"){
        result = 'you Win!'
    }
    if (computerChoice == 'scissors' && userChoice === "paper"){
        result = 'you Lose!'
    }
    resultDisplay.innerHTML = result
};