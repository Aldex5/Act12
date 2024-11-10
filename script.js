const squares = document.querySelectorAll('[data-square]');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

squares.forEach((square, index) => {
  square.addEventListener('click', () => handleSquareClick(square, index));
});

resetButton.addEventListener('click', resetGame);

function handleSquareClick(square, index) {
  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  square.textContent = currentPlayer;

  if (checkWin()) {
    resultElement.textContent = `¡${currentPlayer} ha ganado!`;
    gameActive = false;
  } else if (checkDraw()) {
    resultElement.textContent = '¡Empate!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  squares.forEach(square => (square.textContent = ''));
  resultElement.textContent = '';
}
