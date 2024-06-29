// {= 'value'} to set a default value
function greetUser(greetings = 'Hi', uname = 'user'){
    // console.log('Hi ' + uname + '!');
    console.log(`${greetings} ${uname}!`);
}
greetUser('Namaste', 'Kaku');
greetUser();

// if we do not send any parameter it will set the variable to 'undefined'

// function sumUp(a = 0, b = 0, c = 0){
//     return a + b + c;
// }
// console.log('Sum: ' + sumUp());

// function sumUp(nums){
//     let res = 0;
//     for(const n of nums){
//         res += n;
//     }
//     console.log('Sum: ' + res);
// }
// sumUp([1, 2, 3]);

// ^ above array can also be implemented by a js feature - ...
// ... -> there can be any number of args and its gonna be converted to an array automatically
// it can take a dynamic amount of values
// REST PARAMETERS - merge individual params in an array
function sumUp(...nums){
    let res = 0;
    for(n of nums){res += n;}
    console.log('Sum: ' + res);
}
sumUp(11, 2, 3);

const inputNums = [22, 3, 4];
sumUp(inputNums);
// this will give output: 022,3,4

// to send an array to rest parameter in a correct way
// we can just put ... while function calling with the arguement
// SPREAD OPERATOR - spread an array to multiple indivvidual value
sumUp(...inputNums);

