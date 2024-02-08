let paraEle = document.querySelector('p');

function changeParaText(){
    paraEle.textContent = 'Clicked!';
}

paraEle.addEventListener('click', changeParaText);

let inputEle = document.querySelector('input');

function printInput(event){
    // let enteredText = inputEle.value;
    let enteredText = event.target.value;
    // let enteredText = event.data; // => This is different
    console.log(enteredText);
    // console.log(event);
}

inputEle.addEventListener('input', printInput);