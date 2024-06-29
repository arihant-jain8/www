// ASYNC FILE READING

// const fs = require('fs');
// function readFile(){
//     fs.readFile('data.txt', function(error, fileData){ // error: if no file or error, fileData: if successfully read
//         // this fn will execute once async parsing of file is done
//         console.log('Parsing finished.');
//         console.log(fileData.toString());
//     });
    
//     // console.log(fileData.toString());
//     console.log('YOYO~');
// }
// readFile();



// PROMISES - for nested async functions (to solve CALLBACK HELL on multiple nested async fns)

// const fs  = require('fs/promises');
// function readFile(){
//     // now fs.readFile returns a promise object -> has then method which takes a function
//     fs.readFile('data.txt')
//         .then(function(fileData){
//         console.log('File Parsed!');
//         console.log(fileData.toString());
//         // return anotherAsyncOperation;
//     });
//     // .then(function(result){
//     //     inside the anotherAsyncOperation
//     // })
//     // .then(.. and so on);

//     console.log('YOYO~');
// }
// readFile();



// ERROR HANDLING IN ASYNC

// try catch block doesnt work with async read blocks

// its possible with callbacks v
// fs.readFile('data.txt', function(error, fileData){
//     if(error){}
//     // else file parsed
// });

// different with promises
// fs.readFile('data.txt')
//     .then(function(fileData){
//         console.log(fileData.toString());
//     })
//     .catch(function(error){
//         console.log(error.message)
//     });

// promises give inbuilt catch property 
// in which we can pass function that takes error as parameter



// ASYNC AWAIT
// useful when multiple operations neednt be done simultaneously

const fs = require('fs/promises')

// we can use async keyword with a function
// it gives us another functionality in which
// the async readFile function returns the file and there is no need to apply then
async function readFile(){
    let fileData;

    // code execution will stop until this v line is done
    // looks like sync code but it is actually async (then method)
    // and now we can also use try catch blocks in async 
    try{
        fileData = await fs.readFile('data.txt');
    }
    catch(error){
        console.log(error);
    }

    fileData = await fs.readFile('data.txt');

    console.log('File Parsed!');
    console.log(fileData.toString());

    console.log('YOYO~');
}