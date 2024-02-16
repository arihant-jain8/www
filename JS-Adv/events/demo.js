// let charCountEle = document.getElementById('charCount');
// let inputEle = document.querySelector('input');
// function displayRemainingLength(){
//     let charcount = 60 - inputEle.value.length;
//     charCountEle.textContent = charcount + '/60';
// }

// inputEle.addEventListener('input', displayRemainingLength);

const productNameEle = document.getElementById('product-name');
const remainingCharsElement = document.getElementById('remaining-chars');

const maxAllowedChars = productNameEle.maxLength;

function updateRemainingChar(event){
    const enteredText = event.target.value;
    const enteredTextLength = enteredText.length;

    const remainingChars = maxAllowedChars - enteredTextLength;

    remainingCharsElement.textContent = remainingChars;

    // does not removes it when more than 10 chars
    if(remainingChars <= 10){
        remainingCharsElement.classList.add('warning');
        productNameEle.classList.add('warning');
    }
    
    else{
        
    }
}

productNameEle.addEventListener('input', updateRemainingChar);