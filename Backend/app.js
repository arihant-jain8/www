// express
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
// incoming request data parser
// parses the incoming data and convert into js object

app.get('/', function(req, res){
    // res.send('<h1>BILLIIII</h1>')
    res.send('<form action = "/store-user" method = "POST"><label>Your Name: </label><input type="text" name="uname"><button>Submit</button></form>')
});

app.get('/currenttime', function(req, res){
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:6969/currenttime

app.post('/store-user', function(req, res){
    const uname = req.body.uname;

    const filePath = path.join(__dirname, 'data', 'users.json');
    // console.log(filePath);

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData); // converts text from json format to js obj or array 
    // console.log(existingUsers);

    existingUsers.push(uname);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // stringify is reverse of parse (js obj or array -> json)

    res.send(uname + ' uname stored successfully');
});

app.get('/users', function(req, res){
    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath);
    const usersArray = JSON.parse(fileData);

    let responseData = '<ul>';

    for(let user of usersArray){
        responseData += '<li>' + user + '</li>';
    }

    responseData += '</ul';
    
    res.send(responseData);
});

app.listen(6969);


// only node

// with http
// const http = require('http');

// function handleReq(req, resp){
//     // status codes
//     // 200 - req parsed successfully, a resp can be generated and sent 
//     // 404 - client side error. requested resource/link was not found.
//     // 401 - client side error. client(user) is not authorized to access the requested resource/link
//     // 500 - server-side error. req was valid.

//     if(req.url === '/currenttime'){
//         resp.statusCode = 200;
//         resp.end('<h1>' + new Date().toISOString() + '</h1>');
//     }
//     else if(req.url === '/'){
//         resp.statusCode = 200;
//         resp.end('<h1>BILLLIIIII 🐈‍⬛</h1>');
//     }
// }

// const server = http.createServer(handleReq);

// server.listen(3000);

// amazon.com => send a req to amazon.com
// common port to send unencrypted req
// amazon.com:80
// :443 uses ssl