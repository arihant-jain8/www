const hobbies = ['sports', 'gaming']; // a pointer to the array is stored
const age = 23; // the value itself is stored

hobbies.push('music'); // address of the array doesnt change
// this works because we are not assigning a new value with '=' operator

console.log(hobbies);

// hobbies = ['cars', 'study']; // not allowed! new address is stored

console.dir(hobbies);

// Primitive values: numbers, strings, booleans, etc - undefined
// Reference values: Objects
// both are stored in different kind of computer memory



// objects are complex variables so in order to save memory
// address is sent as parameter instead of a copy of the object
// OBJECTS ARE REFERECE VALUE
const person = {age: 32};

function getAdultYears(p){
    p.age -= 18;
    return p.age;
    // return p.age - 18;
}

// console.log(getAdultYears(person));
// console.log(person);

// we can prevent our object from changing inside a function by passing a copy
// getAdultYears({age: person.age});

// it can be done efficiently with the help of SPREAD operator
console.log(getAdultYears({...person}));
console.log(person);