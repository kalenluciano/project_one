const gameBoard = document.querySelector('.game-board');

const createGameBoard = () => {
	for (let i = 0; i < 16; i++) {
		str = 'abcdefghijklmnop';
		letter = str[i].toUpperCase();
		for (let j = 0; j < 16; j++) {
			square = document.createElement('div');
			square.classList.add('square');
			square.setAttribute('id', `${letter}${j}`);
			gameBoard.appendChild(square);
		}
	}
};

createGameBoard();
