"use strict";
//view
const modal = document.querySelector("#player-modal");
const cancelButton = document.querySelector("input[value='Cancel']");
const submitButton = document. querySelector("input[value='Submit']");
const newGameButton = document.querySelector(".start-game");
const player1Score = document.querySelector("#player1-row td:nth-of-type(2)");
const player2Score = document.querySelector("#player2-row td:nth-of-type(2)");
const player1Draw = document.querySelector("#player1-row td:nth-of-type(3)");
const player2Draw = document.querySelector("#player2-row td:nth-of-type(3)");

//hide button functions
const hideStartButton = () => {
  newGameButton.classList.add("start-game", "hidden");
};
const hideModal = () => {modal.classList.add("hidden");};
const showModal = () => {modal.classList.remove("hidden");};

//render functions
const renderX = (cell) => {
  const pieceX = document.createElement("img");
  pieceX.setAttribute("src", "img/x-mark-128.png");
  pieceX.setAttribute("alt", "X Mark");
  pieceX.classList.add("board-piece");
  cell.appendChild(pieceX);
};
const renderO = (cell) => {
  const pieceO = document.createElement("img");
  pieceX.setAttribute("src", "circle-outline-128.png");
  pieceX.setAttribute("alt", "O Mark");
  pieceX.classList.add("board-piece");
  cell.appendChild(pieceO);
};
const renderScores = (player1Wins, player2Wins, draws) => {
  player1Draw.innerText = draws;
  player2Draw.innerText = draws;
  player1Score.innerText = player1Wins;
  player2Score.innerText = player2Wins;

}

//model
let player1Wins = 3,
    player2Wins = 5,
    draws = 4;
//octopus
renderScores(player1Wins, player2Wins, draws);
//reset scores
const resetScore = () => {
  //set Wins to 0
  player1Wins = 0;
  player2Wins = 0;
  //set draws to 0
  draws = 0;
  renderScores(player1Wins, player2Wins, draws);
  console.log("scores are now reset");
};
//reset game
const resetGame = () => {
  //resetScore();
  //clear board
  console.log("game reset now");
};


//listen for Player Form Cancel and then hide modal
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  hideModal();
  console.log("Canceled");
});
//Listen for Player Form Submit
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
// TODO: add function to update player info
  //updatePlayerInfo();
  hideModal();
  hideStartButton();
  console.log("form submitted")
});

//Listen for Start Game button click
newGameButton.addEventListener("click", (event) => {
  hideStartButton();
  showModal();
});

//listen for change player button and open modal
document.querySelector("#change-player-info").addEventListener("click", (event) => {
  showModal();
  hideStartButton();
});

//listen for reset game button
document.querySelector("#reset-game").addEventListener("click", (event) => {
  // TODO: make reset function
  //resetGame();
  showModal();
  hideStartButton();
});

//listen for reset scores button
document.querySelector("#reset-scores").addEventListener("click", (event) => {
  resetScore();
  console.log("reset scores");
});

//listen for click on gameboard
const gameBoard = document.querySelector("#board");
const boardCells = gameBoard.querySelectorAll("td");
console.log(gameBoard, boardCells);
const boardClick = () => {
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      console.log(cell);
      renderX(cell);
    });
  });
};
boardClick();
