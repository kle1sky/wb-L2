const cells = document.querySelectorAll('.cell');
const newGameBtn = document.querySelector('.new-game-btn');

let currentPlayer = 'X';
let gameEnded = false;

let localArray = localStorage.getItem('board') ? JSON.parse(localStorage.getItem('board')) : Array.from(cells);

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return Array.from(cells).every(cell => cell.textContent !== '');
};

const endGame = (message) => {
    gameEnded = true;
    alert(message);
};

const handleCellClick = (cell, i) => {
    if (gameEnded || cell.textContent !== '') {
        return;
    }

    cell.textContent = currentPlayer;

    localArray[i] = currentPlayer;

    saveToLocalStorage('board', localArray);

    if (checkWin()) {
        endGame(`Игрок ${currentPlayer} победил!`);
        return;
    }

    if (checkDraw()) {
        endGame('Ничья!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    saveToLocalStorage('player', currentPlayer);
};

cells.forEach((cell, i) => {
    cell.addEventListener('click', () => {
        handleCellClick(cell, i);
    });
});

newGameBtn.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameEnded = false;

    localArray = Array.from(cells);

    saveToLocalStorage('board', localArray);
    saveToLocalStorage('player', currentPlayer);
});

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const init = () => {
    const player = localStorage.getItem('player').slice(1, -1);
    const board = JSON.parse(localStorage.getItem('board'));

    currentPlayer = player;
    cells.forEach((cell, i) => {
        cell.textContent = board[i] === 'X' || board[i] === 'O' ? board[i] : '';
    })
}

init()