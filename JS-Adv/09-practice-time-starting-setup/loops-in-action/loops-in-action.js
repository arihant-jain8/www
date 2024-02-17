// 1. Sum Numbers
const calculateSumBttnEle = document.querySelector('#calculator button');

function calculateSum(){
    const userNumberInputEle = document.getElementById('user-number');
    const enteredNum = userNumberInputEle.value;
    
    let sum = 0;
    
    for(let i = 0; i <= enteredNum; i++){
        sum += i;
    }
    
    const outputResultEle = document.getElementById('calculated-sum');
    outputResultEle.textContent = sum;
    outputResultEle.style.display = 'block';
}

calculateSumBttnEle.addEventListener('click', calculateSum);

// 2. Highlight Links
const highlightLinksBUtton = document.querySelector('#highlight-links button')

function hightlightLinks(){
    const anchorElements = document.querySelectorAll('#highlight-links a')
    for(const a of anchorElements){
        a.classList.add('highlight');
    }
}

highlightLinksBUtton.addEventListener('click', hightlightLinks);

// 3. Display User Data
const dummyData = {
    name: 'Ishi',
    species: 'Squirrel Catto',
    work: 'zZz'
};
const displayDataBtnEle = document.querySelector('#user-data button');

function displayUserData(){
    const outputEle = document.getElementById('output-user-data');

    for(const key in dummyData){
        // outputEle.textContent += key + ': ' + dummyData[key] + ' ';

        //ghatiyaaaaaaa
        const newUserDataListEle = document.createElement('li');
        const outputText = key + ': ' + dummyData[key];
        newUserDataListEle.textContent = outputText;
        outputEle.append(newUserDataListEle);
    }
}

displayDataBtnEle.addEventListener('click', displayUserData)

// Statits
const rollDiceBtnEle = document.querySelector('#statistics button');

function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

function deriveNumOfRolls(){
    const targetNumInput = document.getElementById('user-target-number');
    const diceRollsListElement = document.getElementById('dice-rolls');

    const enteredNum = targetNumInput.value;
    diceRollsListElement.innerHTML = '';

    let hasRolledTargetNum = false;
    let numRolls = 0;
    while(!hasRolledTargetNum){
        const rolledNumer = rollDice();
        // if(rolledNumer == enteredNum) hasRolledTargetNum = true;
        numRolls++;
        const newRollListElement = document.createElement('li');
        const outputText = 'Roll ' + numRolls + ': ' + rolledNumer;
        newRollListElement.textContent = outputText;
        diceRollsListElement.append(newRollListElement);
        hasRolledTargetNum = rolledNumer == enteredNum;
    }

    const outputTotalRollsEle = document.getElementById('output-total-rolls');
    const outputTargetNumberEle = document.getElementById('output-target-number');

    outputTargetNumberEle.textContent = enteredNum;
    outputTotalRollsEle.textContent = numRolls;
}

rollDiceBtnEle.addEventListener('click', deriveNumOfRolls);