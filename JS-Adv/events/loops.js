for(let i = 0; i < 10; i++){
    console.log(i);
}

const users = ['Ari', 'Ishi', 'Kat'];
for(const user of users){
    console.log(user);
}

const loggedInUser = {
    name: 'Ari',
    age: 22,
    isAdmin: true
};
for(const propertyName in loggedInUser){
    console.log(propertyName + ': ' + loggedInUser[propertyName]);
}

let isFinished = false;
while(!isFinished){
    isFinished = confirm('Do you want to continue?');
}
console.log('Done');