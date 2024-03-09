function resetGameStatus(){
    isGameOver = false;
    activePlayer = +false;
    turnCount = 1;
    gameOverEle.firstElementChild.innerHTML =
        'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverEle.style.display = 'none';

    let gameBoardIndex = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            gameBoardEle.children[gameBoardIndex].textContent = '';
            gameBoardEle.children[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerNameEle.textContent = players[activePlayer].name;
    gameAreaEle.style.display = 'block';
}

function selectGameField(event) {
    const selectedField = event.target;
    // console.log(event.target.tagName);
    // return when click is made on the gap between the list items(LI)
    // or when a cell is already selected
    // if(selectedField.tagName !== 'LI' || selectedField.classList.contains('disabled')) return;
    // implemented below differently
    if (selectedField.tagName !== 'LI' || isGameOver) return;
    
    // marking the selected cell in the gameData matrix
    const fieldid = +selectedField.dataset.fieldid;
    const row = (fieldid / 3) | 0; // num | 0 => converts a double/float to integer.
    const col = (fieldid % 3) | 0;
    if (gameData[row][col] > 0) {
        alert('Please select an empty field!');
        return;
    }
    gameData[row][col] = +activePlayer + 1;
    
    selectedField.textContent = players[activePlayer].symbol;
    
    selectedField.classList.add('disabled'); // making the selected cell unclickable
    
    const winnderId = checkForGameOver();
    if(winnderId !== 0) endGame(winnderId);
    
    turnCount++;
    // switching the active player and displaying the respective name
    activePlayer = +!activePlayer;
    activePlayerNameEle.textContent = players[activePlayer].name;
}

function checkForGameOver() {
    // if all the cells have been selected => draw
    if(turnCount === 9) return -1;

    // checking rows
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][0] === gameData[i][2])
            return gameData[i][0];
    }

    // checking columns
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i])
            return gameData[0][i];
    }

    // checking top left to bottom right diagonal
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[0][0] === gameData[2][2]) return gameData[0][0];

    // checking top right to bottom left diagonal
    if (gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[0][2] === gameData[2][0]) return gameData[2][0];

    // if nothing
    return 0;
}

function endGame(winnerId){
    isGameOver = true;
    gameOverEle.style.display = 'block';

    if(winnerId > 0){
        gameOverEle.firstElementChild.firstElementChild.textContent = players[winnerId-1].name;
    }
    else{
        gameOverEle.firstElementChild.textContent = 'It\'s a DRAW!';
    }
}