'use strict';
const WALL = '#';
const FOOD = '.';
const SUPERFOOD = '$';
const EMPTY = ' ';
const CHERRY = '&#127826';

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
var gIntervalCherry;

function init() {

  gBoard = buildBoard();
  gGame.score = 0;
  createPacman(gBoard);
  createGhosts(gBoard);
  
  printMat(gBoard, '.board-container');
 
  gIntervalCherry = setInterval(function() {
    createCherry(gBoard)
}, 15000);
  //createCherry(gBoard);
  gGame.isOn = true;
  document.querySelector('.modal').style.display = 'none';
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i === 1 && j === 8 ||
        i === 8 && j === 1 || i === 8 && j === 8) {
        board[i][j] = SUPERFOOD;
      }
    }
  }
  return board;
}

function updateScore(value) {

  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
  checkWin()
}

function checkWin() {
  if (gGame.score >= 60) {
    finishGame('You Won!');
  }
}

function finishGame(msg) {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  document.querySelector('.modal h3').innerText = msg;
  document.querySelector('.modal').style.display = 'block';
}

function createCherry(board) {
  var cherryLocation = {
    i: getRandomIntInclusive(1, board.length - 2),
    j: getRandomIntInclusive(1, board[0].length - 2)
  };
  if (board[cherryLocation.i][cherryLocation.j] === FOOD ||
    board[cherryLocation.i][cherryLocation.j] === EMPTY) {
    board[cherryLocation.i][cherryLocation.j] = CHERRY
    renderCell(cherryLocation, CHERRY)
  } else {
    createCherry(board)
  }
}




