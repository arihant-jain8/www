const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let editedPlayer = 0;
let activePlayer = +false;
let turnCount = 1;
let isGameOver = false;

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

const configOverlayEle = document.getElementById("config-overlay");
const backdropEle = document.getElementById("backdrop");
const formEle = document.querySelector('form');
const errorsEle = document.getElementById('config-errors');
const gameAreaEle = document.getElementById('active-game');
// const gameFieldEles = document.querySelectorAll('#game-board li');
const gameBoardEle = document.getElementById('game-board');
const activePlayerNameEle = document.getElementById('active-player-name');
const gameOverEle = document.getElementById('game-over');

const editP1BtnEle = document.getElementById("edit-p1-btn");
const editP2BtnEle = document.getElementById("edit-p2-btn");
const cancelConfigBtnEle = document.getElementById('cancel-config-btn')
const startNewGameBtnEle = document.getElementById('start-game-btn');


// Function defined in config.js
// we are defining constant in this file and functions in config.js
// config.js can read these constants if the order of execution is correct
// first above lines will execute and then the below function will run hence there will be no problem
editP1BtnEle.addEventListener('click', openPlayerConfig);
editP2BtnEle.addEventListener('click', openPlayerConfig);

cancelConfigBtnEle.addEventListener('click', closePlayerConfig);
backdropEle.addEventListener('click', closePlayerConfig);

formEle.addEventListener('submit', savePlayerConfig);

startNewGameBtnEle.addEventListener('click', startNewGame);

// for(const gameFieldEle of gameFieldEles){
//     gameFieldEle.addEventListener('click', selectGameField);
// }

gameBoardEle.addEventListener('click', selectGameField);