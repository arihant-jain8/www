function openPlayerConfig(event){ //event contains edit button
    editedPlayer = +event.target.dataset.playerid; //+ converts string to number
    configOverlayEle.style.display = 'block';
    backdropEle.style.display = 'block';
}

function closePlayerConfig(){
    configOverlayEle.style.display = 'none';
    backdropEle.style.display = 'none';
    formEle.firstElementChild.classList.remove('error'); // agar error class nhi hogi tab kuchh nhi hoga
    errorsEle.textContent = '';
    formEle.firstElementChild.lastElementChild.value = ''; // so that ek baar form submit krke ye value clear ho jaaye. doosri baar same value show na kre
}

function savePlayerConfig(event){
    //we can do console.log(event) to see all the props of event object
    event.preventDefault(); // this function prevents the form to submit and reload the page. helps us  handle the submission with js without relaoding the page.
    // event.target points at the html element that was responsible for the event
    const formData = new FormData(event.target); // form element in this case. about formdata in the end
    const enteredPlayerName = formData.get('playername').trim(); // '   Ishi cattoo  ' => 'Ishi catto'
    // console.log(enteredPlayerName);

    if(!enteredPlayerName){
        event.target.firstElementChild.classList.add('error');
        errorsEle.textContent = 'Please enter a valid name!';
        return;
    } 

    const updatedPlayerEle = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerEle.children[1].textContent = enteredPlayerName;

    players[editedPlayer - 1].name = enteredPlayerName;

    closePlayerConfig();
}


// FormData makes a data structure of the submitted form values and those values can be fetched using formdata obj.get or getall method using the name of the input