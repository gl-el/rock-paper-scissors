let roundsToPlay = 7;
let roundsPlayed = 0;
let slider = document.getElementById("rounds");
let sliderOutput = document.getElementById("rounds-value");
sliderOutput.innerHTML = slider.value;
slider.oninput = function () {
  sliderOutput.innerHTML = this.value;
  roundsToPlay = this.value;
};

const variants = ["rock", "paper", "scissors"]; //массив возможных значений
//getComputerChoice возвращает одно из трех возможных значений массива variants;
function getComputerChoice() {
  //случайное значение из переданного массива
  return variants[Math.floor(Math.random() * variants.length)];
}
let playerSelection = "";
let computerSelection = "";
const btnsPlayer = document.querySelectorAll("div.variants button");
btnsPlayer.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.classList.add('display-choice');
    playerSelection = e.target.value;
  });
});

let playResult = "";
const btnPlay = document.querySelector(".button-play");
btnPlay.addEventListener("click", (e) => {
  const allComputerChoices = document.querySelectorAll(".computer-variant");
  allComputerChoices.forEach((div) => {
    div.classList.remove("display-choice");
  });
  computerSelection = getComputerChoice();
  const displayComputerChoice = document.querySelector(
    `div.computer-variant#${computerSelection}`
  );
  displayComputerChoice.classList.add("display-choice");
  playResult = playRound(computerSelection, playerSelection);
  displayWinCombo(playResult);
  game();
  console.log(roundsPlayed);
  if (roundsPlayed == roundsToPlay) {
    btnPlay.disabled = true;
  }
});

//playRound() сранивает значения ComputerSelection c PlayerSelection и возвращает победителя:
let playerScore = 0;
let computerScore = 0;
function playRound(computerSelection, playerSelection) {
  roundsPlayed++;
  if (computerSelection === playerSelection) {
    return "tie"; // проверка на ничью
  } else {
    switch (computerSelection) {
      case "rock":
        if (playerSelection === "paper") {
          playerScore++;
          return "player";
        } else {
          computerScore++;
          return "computer";
        }
      case "scissors":
        if (playerSelection === "rock") {
          playerScore++;
          return "player";
        } else {
          computerScore++;
          return "computer";
        }
      case "paper":
        if (playerSelection === "scissors") {
          playerScore++;
          return "player";
        } else {
          computerScore++;
          return "computer";
        }
    }
  }
}

let choice = document.querySelector(".round");
function displayWinCombo(playResult) {
  switch (playResult) {
    case "player":
      choice.textContent = `${playerSelection} beats ${computerSelection}`;
      break;
    case "computer":
      choice.textContent = `${computerSelection} beats ${playerSelection}`;
      break;
    case "tie":
      choice.textContent = "It's a tie!";
      break;
  }
}

let playerScored = document.getElementById("player-score");
let computerScored = document.getElementById("computer-score");
let finalScore = document.querySelector(".final");
function game() {
  if (roundsPlayed <= roundsToPlay) {
    playerScored.textContent = `${playerScore}`;
    console.log(playerScore);
    computerScored.textContent = `${computerScore}`;
    console.log(computerScore);
  }
  if (roundsPlayed == roundsToPlay) {
    if (playerScore > computerScore) {
      finalScore.textContent = "Player wins!";
    } else if (playerScore < computerScore) {
      finalScore.textContent = "Computer wins!";
    } else {
      finalScore = "It's a tie play!";
    }
  }
}
