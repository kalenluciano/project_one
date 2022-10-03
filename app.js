const gameBoard = document.querySelector('.game-board');
const numberOfSquares = 256;
const numberOfSquaresIndex = numberOfSquares - 1;
const rowLength = Math.sqrt(numberOfSquares);
const allSquares = [];
const emptySquares = [];
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
	allSquares.push(...squares);
};

const getAllEmptySquares = () => {
	emptySquares.push(...allSquares);
};

const createSnake = () => {
	let snakeHead = Math.floor(numberOfSquares / 2) + rowLength / 4;
	for (let i = 0; i < 3; i++) {
		let squareNumber = snakeHead - i;
		snakeSquares.push(squareNumber);
		let square = allSquares[squareNumber];
		square.classList.add('snake');
		square.classList.remove('square');
		emptySquares.splice(emptySquares.indexOf(square), 1);
	}
};

const createItem = () => {
	itemSquareNumber =
		Math.floor(numberOfSquares / 2) + rowLength / 2 + rowLength / 4;
	itemSquare = allSquares[itemSquareNumber];
	itemSquare.classList.add('apple');
	itemSquare.classList.remove('square');
	emptySquares.splice(emptySquares.indexOf(itemSquare), 1);
};

const initializeGame = () => {
	createGameBoard();
	getAllEmptySquares();
	createSnake();
	createItem();
};

initializeGame();
