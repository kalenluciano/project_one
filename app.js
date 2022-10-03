const gameBoard = document.querySelector('.game-board');
const numberOfSquares = 256;
const snakeSquares = [];
let numberOfSnakeSquares = 3;
let itemSquare;
let itemSquareNumber;

const createGameBoard = () => {
	for (let i = 0; i < numberOfSquares; i++) {
		let square = document.createElement('div');
		square.classList.add('square');
		square.setAttribute('id', `${i}`);
		gameBoard.appendChild(square);
	}
	const squares = document.querySelectorAll('.square');
	const allSquares = [...squares];
	return allSquares;
};

const allSquares = createGameBoard();
const emptySquares = allSquares;

const createSnake = () => {
	let snakeHead = Math.floor(numberOfSquares / 2) + 4;
	for (let i = 0; i < 3; i++) {
		let squareNumber = snakeHead - i;
		snakeSquares.push(squareNumber);
		let square = allSquares[squareNumber - 1];
		square.classList.add('snake');
		emptySquares.splice(emptySquares.indexOf(square), 1);
	}
};

createSnake();
