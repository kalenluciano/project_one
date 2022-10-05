// Global variables

const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.querySelector('.score-points');
const gameOverDisplay = document.querySelector('.game-over');
const replayButton = document.querySelector('.play-again');
const numberOfSquares = 256;
const numberOfSquaresIndex = numberOfSquares - 1;
const rowLength = Math.sqrt(numberOfSquares);
const allSquares = [];
const emptySquares = [];
const snakeSquares = [];
const snakeSquareNumbers = [];
let gameOver = false;
let snakeHeadSquare;
let snakeHeadNumber;
let itemSquare;
let itemSquareNumber;
let intervalID;
let score = 0;

// Snake initialize functions

const setEvenOrOddAttributes = (i, square) => {
	if (
		(Math.floor(i / rowLength) % 2 === 0 && i % 2 === 0) ||
		(Math.floor(i / rowLength - 1) % 2 === 0 && i % 2 === 1)
	) {
		square.setAttribute('color', 'dark');
	} else {
		square.setAttribute('color', 'light');
	}
};

const createGameBoard = () => {
	for (let i = 0; i < numberOfSquares; i++) {
		let square = document.createElement('div');
		square.classList.add('square');
		setEvenOrOddAttributes(i, square);
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
		let squareID = square.id;
		convertSquareToSnake(square, squareID);
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
	let itemSquareID = itemSquare.id;
	convertSquareToItem(itemSquare, itemSquareID);
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
	let squareID = square.id;
	snakeSquares.unshift(square);
	convertSquareToSnake(square, squareID);
	emptySquares.splice(emptySquares.indexOf(square), 1);
	snakeHeadNumber = snakeSquareNumbers[0];
	snakeHeadSquare = document.getElementById(snakeHeadNumber);
};

const convertSquareToSnake = (square, squareID) => {
	const circle = document.createElement('div');
	circle.classList.add('snake');
	circle.setAttribute('id', `${squareID}`);
	// square.classList.remove('square');
	square.appendChild(circle);
};

const convertSnakeToSquare = (square) => {
	square.removeChild(square.firstChild);
	// square.classList.add('square');
	// square.classList.remove('snake');
};

// Snake movement functions

const moveSnake = (event) => {
	let eventKey = event.key;
	if (gameOver === true) {
		return;
	} else if (
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
	let squareNumber = snakeHeadNumber - 1;
	let itemCapture = checkItemCapture(squareNumber);
	if (itemCapture) {
		processItemCapture();
	}
	if (
		snakeHeadNumber % rowLength === 0 ||
		checkSnakeHitItself(squareNumber)
	) {
		clearInterval(intervalID);
		gameOver = true;
		return gameOverAlert();
	}
	if (!itemCapture) {
		popSnakeTail();
	}
	unshiftSnakeHead(squareNumber);
};

const moveRight = () => {
	let squareNumber = snakeHeadNumber + 1;
	let itemCapture = checkItemCapture(squareNumber);
	if (itemCapture) {
		processItemCapture();
	}
	if (squareNumber % rowLength === 0 || checkSnakeHitItself(squareNumber)) {
		clearInterval(intervalID);
		gameOver = true;
		return gameOverAlert();
	}
	if (!itemCapture) {
		popSnakeTail();
	}
	unshiftSnakeHead(squareNumber);
};

const moveUp = () => {
	let squareNumber = snakeHeadNumber - rowLength;
	let itemCapture = checkItemCapture(squareNumber);
	if (itemCapture) {
		processItemCapture();
	}
	if (squareNumber < 0 || checkSnakeHitItself(squareNumber)) {
		clearInterval(intervalID);
		gameOver = true;
		return gameOverAlert();
	}
	if (!itemCapture) {
		popSnakeTail();
	}
	unshiftSnakeHead(squareNumber);
};

const moveDown = () => {
	let squareNumber = snakeHeadNumber + rowLength;
	let itemCapture = checkItemCapture(squareNumber);
	if (itemCapture) {
		processItemCapture();
	}
	if (
		squareNumber > numberOfSquaresIndex ||
		checkSnakeHitItself(squareNumber)
	) {
		clearInterval(intervalID);
		gameOver = true;
		return gameOverAlert();
	}
	if (!itemCapture) {
		popSnakeTail();
	}
	unshiftSnakeHead(squareNumber);
};

// Item capture functions

const convertSquareToItem = (square, squareID) => {
	const circle = document.createElement('div');
	circle.classList.add('apple');
	circle.setAttribute('id', `${squareID}`);
	// square.classList.remove('square');
	square.appendChild(circle);
};

const removeItemFromSquare = (square) => {
	square.removeChild(square.firstChild);
	// square.classList.add('snake');
	// square.classList.remove('apple');
};

const randomNumberGenerator = () => {
	return Math.floor(Math.random() * emptySquares.length);
};

const checkItemCapture = (squareNumber) => {
	if (squareNumber === itemSquareNumber) {
		return true;
	}
};

const processItemCapture = () => {
	removeItemFromSquare(itemSquare);
	changeItemPosition();
	addAPointToScore();
};

const changeItemPosition = () => {
	itemSquare = emptySquares[randomNumberGenerator()];
	itemSquareNumber = parseInt(itemSquare.id, 10);
	convertSquareToItem(itemSquare);
	emptySquares.splice(emptySquares.indexOf(itemSquare), 1);
};

const addAPointToScore = () => {
	score += 1;
	scoreDisplay.innerText = score;
};

// End game functions

const checkSnakeHitItself = (nextSquare) => {
	for (let snakeSquareNumber of snakeSquareNumbers) {
		if (snakeSquareNumber === nextSquare) {
			return true;
		}
	}
	return false;
};

const gameOverAlert = () => {
	gameOverDisplay.style.display = 'block';
};

const removeGameOverAlert = () => {
	gameOverDisplay.style.display = 'none';
};

const makeAllSquaresEmpty = () => {
	for (let square of allSquares) {
		square.removeAttribute('class');
		square.setAttribute('class', 'square');
		if (square.hasChildNodes()) {
			square.removeChild(square.firstChild);
		}
	}
};

const resetEmptySquares = () => {
	emptySquares.splice(0, emptySquares.length);
	getAllEmptySquares();
};

const resetSnake = () => {
	snakeSquareNumbers.splice(0, snakeSquareNumbers.length);
	snakeSquares.splice(0, snakeSquares.length);
	createSnake();
};

const resetScore = () => {
	score = 0;
	scoreDisplay.innerText = score;
};

const replay = () => {
	makeAllSquaresEmpty();
	resetEmptySquares();
	resetSnake();
	createItem();
	resetScore();
	removeGameOverAlert();
	gameOver = false;
};

// Game actions

initializeGame();

// Event listeners

document.body.addEventListener('keydown', (event) => moveSnake(event));
replayButton.addEventListener('click', () => replay());
