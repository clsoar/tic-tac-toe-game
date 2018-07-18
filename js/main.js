"use strict";
//view
const modal = document.querySelector("#player-modal");
console.log(modal);
const cancelButton = document.querySelector("input[value='Cancel']");
console.log(cancelButton);
const submitButton = document. querySelector("input[value='Submit']");
console.log(submitButton);
const newGameButton = document.querySelector(".start-game");
console.log(newGameButton);
const hideStartButton = () => {
  newGameButton.classList.add("start-game", "hidden");
};
const hideModal = () => {modal.classList.add("hidden");};
const showModal = () => {modal.classList.remove("hidden");};

const renderX = (cell) => {
  const pieceX = document.createElement("img");
  pieceX.setAttribute("src", "img/x-mark-128.png");
  pieceX.setAttribute("alt", "X Mark");
  pieceX.classList.add("board-piece");
  cell.appendChild(pieceX);
}
const renderO = (cell) => {
  const pieceO = document.createElement("img");
  pieceX.setAttribute("src", "circle-outline-128.png");
  pieceX.setAttribute("alt", "O Mark");
  pieceX.classList.add("board-piece");
  cell.appendChild(pieceO);
}
//model



//octopus
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
  // TODO: add reset scores function
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
