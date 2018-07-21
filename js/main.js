"use strict";
//view
const modal = document.querySelector("#player-modal");
const winModal = document.querySelector(".winner-modal");
const cancelButton = document.querySelector("input[value='Cancel']");
const submitButton = document. querySelector("input[value='Submit']");
const newGameButton = document.querySelector(".start-game");
const player1Score = document.querySelector("#player1-row td:nth-of-type(2)");
const player2Score = document.querySelector("#player2-row td:nth-of-type(2)");
const player1Draw = document.querySelector("#player1-row td:nth-of-type(3)");
const player2Draw = document.querySelector("#player2-row td:nth-of-type(3)");
const winAnnouncement = document.querySelector("span.winner-inner");
const player1NameValue = document.querySelector("#player1-name");
const player2NameValue = document.querySelector("#player2-name");
const player1Name = document.querySelector("#first-player");
const player2Name = document.querySelector("#second-player");
const player1Scoreboard = document.querySelector("#player1-score-name");
const player2Scoreboard = document.querySelector("#player2-score-name");
const whoseTurn = document.querySelector("#players-turn");


var pieceO, pieceX;
let player1Wins = 0,
    player2Wins = 0,
    draws = 0,
    game = 1;
//hide button functions
const hideStartButton = () => {
  newGameButton.classList.add("start-game", "hidden");
};
const hideModal = () => {modal.classList.add("hidden");};
const showModal = () => {modal.classList.remove("hidden");};
const hideWinModal = () => {winModal.classList.add("hidden");};
const showWinModal = () => {winModal.classList.remove("hidden");};
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
renderScores(player1Wins, player2Wins, draws);
const renderWinner = (winScript) => {
  winAnnouncement.innerText = winScript;
};
const renderNames = () => {
  player1Name.innerText= player1NameValue.value;
  player2Name.innerText= player2NameValue.value;
  player1Scoreboard.innerText = player1NameValue.value;
  player2Scoreboard.innerText = player2NameValue.value;
};
const renderPlayer1Turn = () => {whoseTurn.innerText = player1NameValue.value + "'s Turn";};
const renderPlayer2Turn = () => {whoseTurn.innerText = player2NameValue.value + "'s Turn";};

//clear board
const clearBoard = () => {
  boardCells.forEach((cell) => {
    let piece = cell.firstChild;
    if (piece !== null) {
      piece.remove();
    }
  });
};

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
//update score function
const updateScore = (winner) => {
  //find out which player won or if game was a draw
  let winningPlayer, xPiece = "X Mark", oPiece = "O Mark", winScript;
  if ((winner === xPiece && game%2 === 1) || (winner === oPiece && game%2 === 0)) {
    winningPlayer = 1;
  }else if ((winner === xPiece && game%2 === 0) || (winner === oPiece && game%2 === 1)) {
    winningPlayer = 2;
  }else if (winner === "Draw") {
    winningPlayer = 3;
  }
  //update score of winning player
  if(winningPlayer ===1){
    player1Wins += 1;
    winScript = player1NameValue.value + " Wins!";
  }else if(winningPlayer === 2){
    player2Wins += 1;
    winScript = player2NameValue.value + " Wins!";
  }else if(winningPlayer === 3){
    draws += 1;
    winScript = "It's a draw.";
  }else{
    console.log("error in update score logic");
  }
  renderScores(player1Wins, player2Wins, draws);
  renderWinner(winScript);
};
const winEvent = (winner) => {
  setTimeout(function() {
    // Adjust scores
    updateScore(winner);
    //show winner Modal & clear board on close
    showWinModal();
  }, 50);
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
      switch (true) {
        case (cellArray[0] == cellArray[3] && cellArray[0] == cellArray[6] && cellArray[0] != null):
          winner = cellArray[0];
          winEvent(winner);
          break;
        case (cellArray[1] == cellArray[4] && cellArray[1] == cellArray[7] && cellArray[1] != null):
          winner = cellArray[1];
          winEvent(winner);
          break;
        case (cellArray[2] == cellArray[5] && cellArray[2] == cellArray[8] && cellArray[2] != null):
          winner = cellArray[2];
          winEvent(winner);
          break;
        case (cellArray[0] == cellArray[1] && cellArray[0] == cellArray[2] && cellArray[0] != null):
          winner = cellArray[0];
          winEvent(winner);
          break;
        case (cellArray[3] == cellArray[4] && cellArray[3] == cellArray[5] && cellArray[3] != null):
          winner = cellArray[3];
          winEvent(winner);
          break;
        case (cellArray[6] == cellArray[7] && cellArray[6] == cellArray[8] && cellArray[6] != null):
          winner = cellArray[6];
          winEvent(winner);
          break;
        case (cellArray[2] == cellArray[4] && cellArray[2] == cellArray[6] && cellArray[2] != null):
          winner = cellArray[2];
          winEvent(winner);
          break;
        case (cellArray[0] == cellArray[4] && cellArray[0] == cellArray[8] && cellArray[0] != null):
          winner = cellArray[0];
          winEvent(winner);
          break;
        case (cellArray[0] != null && cellArray[1] != null && cellArray[2] != null &&
          cellArray[3] != null && cellArray[4] != null && cellArray[5] != null &&
           cellArray[6] != null && cellArray[7] != null && cellArray[8] != null):
          winner = "Draw";
          winEvent(winner);
          break;
      }
      console.log(winner, "check");
};

//listen for Player Form Cancel and then hide modal
cancelButton.addEventListener("click", function(event) {
  event.preventDefault();
  hideModal();
  console.log("Canceled");
});
//Listen for Player Form Submit
submitButton.addEventListener("click", function(event) {
  event.preventDefault();
// TODO: add function to update player info
  //updatePlayerInfo();
  renderNames();
  hideModal();
  hideStartButton();
  console.log("form submitted")
});

//Listen for Start Game button click
newGameButton.addEventListener("click", function(event) {
  hideStartButton();
  showModal();
});
//listen for ok button on win-Mmdal
document.querySelector("#ok-win").addEventListener("click", function(event) {
  hideWinModal();
  clearBoard();
});

//listen for change player button and open modal
document.querySelector("#change-player-info").addEventListener("click", function(event) {
  showModal();
  hideStartButton();
});

//listen for reset game button
document.querySelector("#reset-game").addEventListener("click", function(event) {
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
    cell.addEventListener("click", function(event) {
        //check if cell is empty and then add alternating pieces
        //with each click
        let piece = cell.firstChild;
        if (piece === null) {
          count+=1;
          if(count%2 !== 0) {
            renderX(cell);
            renderPlayer2Turn();
          } else {
            renderO(cell);
            renderPlayer1Turn();
          }
          console.log(count);
          checkWin();
        };
    });
  });
};
boardClick();
