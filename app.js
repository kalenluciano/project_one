// Global variables

const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.querySelector('.score-points');
const numberOfSquares = 256;
const numberOfSquaresIndex = numberOfSquares - 1;
const rowLength = Math.sqrt(numberOfSquares);
const allSquares = [];
const emptySquares = [];
const snakeSquares = [];
const snakeSquareNumbers = [];
let snakeHeadSquare;
let snakeHeadNumber;
let numberOfSnakeSquares = 3;
let itemSquare;
let itemSquareNumber;
let intervalID;
let score = 0;

// Snake initialize functions

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
	snakeHeadNumber = Math.floor(numberOfSquares / 2) + rowLength / 4;
	for (let i = 0; i < 3; i++) {
		let squareNumber = snakeHeadNumber - i;
		snakeSquareNumbers.push(squareNumber);
		let square = allSquares[squareNumber];
		convertSquareToSnake(square);
		snakeSquares.push(square);
		emptySquares.splice(emptySquares.indexOf(square), 1);
	}
	snakeHeadNumber = snakeSquareNumbers[0];
	snakeHeadSquare = snakeSquares[0];
};

const createItem = () => {
	itemSquareNumber =
		Math.floor(numberOfSquares / 2) + rowLength / 2 + rowLength / 4;
	itemSquare = allSquares[itemSquareNumber];
	convertSquareToItem(itemSquare);
	emptySquares.splice(emptySquares.indexOf(itemSquare), 1);
};

const initializeGame = () => {
	createGameBoard();
	getAllEmptySquares();
	createSnake();
	createItem();
};

// Common functions for snake

const popSnakeTail = () => {
	snakeSquareNumbers.pop();
	let poppedSnakeTailSquare = snakeSquares.pop();
	convertSnakeToSquare(poppedSnakeTailSquare);
	emptySquares.push(poppedSnakeTailSquare);
};

const unshiftSnakeHead = (squareNumber) => {
	snakeSquareNumbers.unshift(squareNumber);
	let square = document.getElementById(squareNumber);
	snakeSquares.unshift(square);
	convertSquareToSnake(square);
	emptySquares.splice(emptySquares.indexOf(square), 1);
	snakeHeadNumber = snakeSquareNumbers[0];
	snakeHeadSquare = document.getElementById(snakeHeadNumber);
};

const convertSquareToSnake = (square) => {
	square.classList.add('snake');
	square.classList.remove('square');
};

const convertSnakeToSquare = (square) => {
	square.classList.add('square');
	square.classList.remove('snake');
};

// Snake movement functions

const moveSnake = (event) => {
	let eventKey = event.key;
	if (
		eventKey === 'ArrowLeft' &&
		snakeSquareNumbers[1] !== snakeHeadNumber - 1
	) {
		clearInterval(intervalID);
		intervalID = setInterval(moveLeft, 100);
	} else if (
		eventKey === 'ArrowUp' &&
		snakeSquareNumbers[1] !== snakeHeadNumber - rowLength
	) {
		clearInterval(intervalID);
		intervalID = setInterval(moveUp, 100);
	} else if (
		eventKey === 'ArrowRight' &&
		snakeSquareNumbers[1] !== snakeHeadNumber + 1
	) {
		clearInterval(intervalID);
		intervalID = setInterval(moveRight, 100);
	} else if (
		eventKey === 'ArrowDown' &&
		snakeSquareNumbers[1] !== snakeHeadNumber + rowLength
	) {
		clearInterval(intervalID);
		intervalID = setInterval(moveDown, 100);
	} else {
		return;
	}
};

const moveLeft = () => {
	if (checkItemCapture()) {
		processItemCapture();
	} else {
		popSnakeTail();
	}
	let squareNumber = snakeHeadNumber - 1;
	unshiftSnakeHead(squareNumber);
};

const moveRight = () => {
	if (checkItemCapture()) {
		processItemCapture();
	} else {
		popSnakeTail();
	}
	let squareNumber = snakeHeadNumber + 1;
	unshiftSnakeHead(squareNumber);
};

const moveUp = () => {
	if (checkItemCapture()) {
		processItemCapture();
	} else {
		popSnakeTail();
	}
	let squareNumber = snakeHeadNumber - rowLength;
	unshiftSnakeHead(squareNumber);
};

const moveDown = () => {
	if (checkItemCapture()) {
		processItemCapture();
	} else {
		popSnakeTail();
	}
	let squareNumber = snakeHeadNumber + rowLength;
	unshiftSnakeHead(squareNumber);
};

// Item capture functions

const convertSquareToItem = (square) => {
	square.classList.add('apple');
	square.classList.remove('square');
};

const convertItemToSquare = (square) => {
	square.classList.add('square');
	square.classList.remove('apple');
};

const randomNumberGenerator = () => {
	return Math.floor(Math.random() * emptySquares.length);
};

const checkItemCapture = () => {
	if (snakeHeadNumber === itemSquareNumber) {
		return true;
	}
};

const processItemCapture = () => {
	convertItemToSquare(itemSquare);
	changeItemPosition();
	console.log(itemSquare);
	addAPointToScore();
};

const changeItemPosition = () => {
	itemSquare = emptySquares[randomNumberGenerator()];
	itemSquareNumber = itemSquare.id;
	convertSquareToItem(itemSquare);
	emptySquares.splice(emptySquares.indexOf(itemSquare), 1);
};

const addAPointToScore = () => {
	score += 1;
	scoreDisplay.innerText = score;
};

// Game actions

initializeGame();

// Event listeners

document.body.addEventListener('keydown', (event) => moveSnake(event));
