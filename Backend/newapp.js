const fs = require('fs'); // package for file system
const path = require('path'); // package to construct path

const express = require('express');
const e = require('express');

const app = express();

// to parse incoming request data
app.use(express.urlencoded({extended: false})); // middleware function to see if the req has any data and parse that


app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>Name: </label><input type="text" name="uname"><button>Confirm</button></form>')
});

// app.post('/store-user', function(req, res){
//     const uname = req.body.uname;
//     console.log(uname);
//     res.send(uname + ' uname stored successfully');
// });

// storing username in a text file in 'data' folder
app.post('/store-user', function(req, res){
    const uname = req.body.uname;

    const filePath = path.join(__dirname, 'data', 'users.json'); //__dirname -> global var that holds absolute path to the opened directory

    const fileData = fs.readFileSync(filePath); //this will be normal text not a JS obj or array
    const existingUsers = JSON.parse(fileData); // parsing the normal text to JS object

    existingUsers.push(uname); // to push into the array

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // cannot write existingUsers. Need to write normal text :: stringify

    res.send(uname + ' stored successfully')
});

// displaying stored unames
app.get('/unames', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');
    
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    // res.send(existingUsers);
    let reply = '<ul>';

    for(const user of existingUsers){
        reply += '<li>' + user + '</li>';
    }

    reply += '</ul>';

    res.send(reply);
});

app.listen(6969);