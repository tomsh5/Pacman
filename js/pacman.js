const PACMAN = '&#9786;';

var gPacman;
var gIsSuperFood = false;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;

  var nextLocation = getNextLocation(eventKeyboard);
 
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;
  if (nextCell === SUPERFOOD && gIsSuperFood) return

  if (nextCell === FOOD) updateScore(1);
  if (nextCell === CHERRY) updateScore(10);
  if (nextCell === GHOST && !gIsSuperFood) {
    finishGame('Game Over!');
    renderCell(gPacman.location, EMPTY);
    return
  }
  else if (nextCell === GHOST && gIsSuperFood) {
    for (var i = 0; i < gGhosts.length; i++) {
      if (gGhosts[i].location.i === nextLocation.i &&
        gGhosts[i].location.j === nextLocation.j) {
        gGhosts.splice(i, 1);
        console.log(gGhosts);
      }
    }
  }
  if (nextCell === SUPERFOOD && !gIsSuperFood) {
    superPowerOn();
    setTimeout(superPowerOff, 5000);
  }
  
// Update the MODEL
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL 
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function superPowerOn() {
  gIsSuperFood = true;
  updateScore(10);
  console.log('Super Food!');
}

function superPowerOff() {
  gIsSuperFood = false;
  console.log('Super Food ended');
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}