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
var pieceO, pieceX;
//hide button functions
const hideStartButton = () => {
  newGameButton.classList.add("start-game", "hidden");
};
const hideModal = () => {modal.classList.add("hidden");};
const showModal = () => {modal.classList.remove("hidden");};

//render functions
const renderX = (cell) => {
  pieceX = document.createElement("img");
  pieceX.setAttribute("src", "img/x-mark-128.png");
  pieceX.setAttribute("alt", "X Mark");
  pieceX.classList.add("board-piece");
  cell.appendChild(pieceX);
};
const renderO = (cell) => {
  pieceO = document.createElement("img");
  pieceO.setAttribute("src", "img/circle-outline-128.png");
  pieceO.setAttribute("alt", "O Mark");
  pieceO.classList.add("board-piece");
  cell.appendChild(pieceO);
};
const renderScores = (player1Wins, player2Wins, draws) => {
  player1Draw.innerText = draws;
  player2Draw.innerText = draws;
  player1Score.innerText = player1Wins;
  player2Score.innerText = player2Wins;
};
//clear board
const clearBoard = () => {
  boardCells.forEach((cell) => {
    let piece = cell.firstChild;
    if (piece !== null) {
      piece.remove();
    }
  });
};

//model
let player1Wins = 3,
    player2Wins = 5,
    draws = 4,
    game = 1;

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
  resetScore();
  clearBoard();
  console.log("game reset now");
};
//check for win
const checkWin = () => {
  let cellArray = [];
  for (let cell of boardCells){
	   let piece = cell.firstChild;
    if (piece !== null) {
		    cellArray.push(piece.alt);
    }else {cellArray.push(piece);};
  };
  console.log(cellArray);
  //nested if statements that check for win condition
  let xPiece = "X Mark", oPiece = "O Mark", winner;
  for (let i=0;i<cellArray.length;i++){
    if (cellArray[i] !== null){
      //switchCheck(cellArray, winner);
      switch (true) {
        case (cellArray[0] == cellArray[3] && cellArray[0] == cellArray[6] && cellArray[0] != null):
          winner = cellArray[0];
          break;
        case (cellArray[1] == cellArray[4] && cellArray[1] == cellArray[7] && cellArray[1] != null):
          winner = cellArray[1];
          break;
        case (cellArray[2] == cellArray[5] && cellArray[2] == cellArray[8] && cellArray[2] != null):
          winner = cellArray[2];
          break;
        case (cellArray[0] == cellArray[1] && cellArray[0] == cellArray[2] && cellArray[0] != null):
          winner = cellArray[0];
          break;
        case (cellArray[3] == cellArray[4] && cellArray[3] == cellArray[5] && cellArray[3] != null):
          winner = cellArray[3];
          break;
        case (cellArray[6] == cellArray[7] && cellArray[6] == cellArray[8] && cellArray[6] != null):
          winner = cellArray[6];
          break;
        case (cellArray[2] == cellArray[4] && cellArray[2] == cellArray[6] && cellArray[2] != null):
          winner = cellArray[2];
          break;
        case (cellArray[0] == cellArray[4] && cellArray[0] == cellArray[8] && cellArray[0] != null):
          winner = cellArray[0];
          break;
        case (cellArray[0] != null && cellArray[1] != null && cellArray[2] != null &&
          cellArray[3] != null && cellArray[4] != null && cellArray[5] != null &&
           cellArray[6] != null && cellArray[7] != null && cellArray[8] != null):
          winner = "Draw";
          break;
        //default: winner = 0;
      }
      console.log(winner, "check");
    }
  }
};
/*  if (winner == xPiece) {
    console.log("player 1 wins");
  }else if(winner == oPiece) {
    console.log("player 2 wins");
  } else if(winner == "Draw") {
    console.log("It's a draw");
  }*/


const updateScore = (winner) => {
  //find out which player won
  let winningPlayer, xPiece = "X Mark", oPiece = "O Mark";
  if ((winner === xPiece && game%2 === 1) || (winner === oPiece && game%2 === 0)) {
    winningPlayer = 1;
  }else if ((winner === xPiece && game%2 === 0) || (winner === oPiece && game%2 === 1)) {
    winningPlayer = 2;
  }
  //update score of winning player
  if(winningPlayer ===1){
    player1Wins += 1;
  } else if(winningPlayer === 2){
    player2Wins += 1;
  }else {
    console.log("error in update score logic");
  }
};
const winEvent = (winner) => {
    //show winner Modal
    // TODO: make winner modal and function and replace alert
    // TODO: adjust scores
    updateScore();
  //  alert("You won");
  //  clearBoard();
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
  // Reset game and open start modal
  resetGame();
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
  //check which game number it is. Odd game, player 1 is X, even game player 2 is X
  let count;
  (game%2 === 1) ? count = 0 : count = 1;
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
        //check if cell is empty and then add alternating pieces
        //with each click
        let piece = cell.firstChild;
        if (piece === null) {
          count+=1;
          (count%2 !== 0) ? renderX(cell) : renderO(cell);
          console.log(count);
          checkWin();
        };

    //  }else if (true) {
      //  return game+=1;
    //};
    });
  });
};
boardClick();
