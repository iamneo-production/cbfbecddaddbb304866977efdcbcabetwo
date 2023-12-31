// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let isGameActive = true;

// Function to handle player moves
const ticTacToe = (element, index) => {
    if (!isGameActive || cells[index] !== '') return;

    element.textContent = currentPlayer;
    cells[index] = currentPlayer;
    element.disabled = true;

    // Check for a win
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            result.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            disableRemainingButtons();
            return;
        }
    }

    // Check for a draw
    if (cells.every(cell => cell !== '')) {
        result.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    result.textContent = `Player ${currentPlayer}'s Turn`;
};

// Function to disable remaining buttons
const disableRemainingButtons = () => {
    btns.forEach(btn => {
        if (!btn.disabled) {
            btn.disabled = true;
        }
    });
};

// Function to reset the game
const resetGame = () => {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = `Player ${currentPlayer}'s Turn`;
    btns.forEach(btn => {
        btn.textContent = '';
        btn.disabled = false;
    });
    isGameActive = true;
    result.textContent = ''; // Clear the result message
};

btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset-button').addEventListener('click', resetGame);
