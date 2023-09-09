const cells = document.querySelectorAll('[data-cell]');
const result = document.querySelector('.result');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Event listeners for each cell
cells.forEach((cell) => {
  cell.addEventListener('click', cellClickHandler);
});

// Reset button click event
resetButton.addEventListener('click', resetGame);

function cellClickHandler(e) {
  const cell = e.target;
  const cellIndex = [...cells].indexOf(cell);

  // Check if the cell is already marked or if the game is over
  if (!isGameActive || cell.classList.contains('X') || cell.classList.contains('O')) {
    return;
  }

  // Mark the cell with the current player's symbol
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  // Check for a win
  if (checkWin()) {
    result.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (isBoardFull()) {
    result.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winCombos.some((combo) => {
    return combo.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

function isBoardFull() {
  return [...cells].every((cell) => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  result.textContent = '';
  currentPlayer = 'X';
  isGameActive = true;
}

